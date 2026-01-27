import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';
import matter from 'gray-matter';
import fetch from 'node-fetch';

const DRAFTS_DIR = './content/borradores';
const POSTS_DIR = './content/IA-editados';

// --------- IA helpers ---------

async function callAI(prompt) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

async function correctText(text) {
  const prompt = `
Corrige errores ortográficos y gramaticales del siguiente texto.
No cambies el significado ni el estilo.

Texto:
${text}
`;
  return callAI(prompt);
}

async function generateTLDR(text) {
  const prompt = `
Genera un TL;DR del siguiente texto.
Máximo 3 puntos.
Formato en lista.
Lenguaje claro y conciso.

Texto:
${text}
`;
  const result = await callAI(prompt);
  return result.split('\n').filter(Boolean);
}

async function generateTags(text) {
  const prompt = `
Analiza el siguiente texto y genera una lista de etiquetas relevantes.

REGLAS:
- Máximo 5 etiquetas
- Solo una palabra o palabras compuestas con guiones
- Todo en minúsculas
- Sin acentos
- No inventes temas que no aparezcan en el texto
- Responde SOLO en formato JSON

FORMATO DE RESPUESTA:
{
  "tags": ["tag1", "tag2", "tag3"]
}

Texto:
${text}
`;
  const result = await callAI(prompt);
  return JSON.parse(result).tags;
}

// --------- Main logic ---------

async function processDraft(filePath) {
  const raw = await fs.readFile(filePath, 'utf-8');
  const { data, content } = matter(raw);

  if (!content || content.length < 200) {
    console.log(`⏭️  Saltado (contenido muy corto): ${filePath}`);
    return;
  }

  console.log(`✏️  Procesando: ${filePath}`);

  const correctedContent = await correctText(content);
  const tldr = await generateTLDR(correctedContent);
  const tags = await generateTags(correctedContent);

  const finalMarkdown = matter.stringify(correctedContent, {
    ...data,
    tldr,
    tags,
  });

  const fileName = path.basename(filePath);
  const outputPath = path.join(POSTS_DIR, fileName);

  await fs.writeFile(outputPath, finalMarkdown);
  console.log(`✅ Publicado: ${outputPath}`);
}

async function run() {
  // Crear directorio de salida si no existe
  await fs.mkdir(POSTS_DIR, { recursive: true });

  const files = await fg(`${DRAFTS_DIR}/*.md`);

  for (const file of files) {
    await processDraft(file);
  }

  console.log('🎉 Proceso finalizado');
}

run();
