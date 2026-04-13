# AI Editor - Portal de Noticias Linux

> Sistema de edición y publicación de noticias sobre Linux potenciado por Inteligencia Artificial

Un portal de noticias desarrollado con Nuxt.js que utiliza IA para automatizar la corrección gramatical, generación de resúmenes (TL;DR) y etiquetado de artículos sobre Linux y software libre.

## Características

- **Editor potenciado por IA**: Corrección automática de gramática y ortografía usando Groq AI
- **Generación automática de TL;DR**: Resúmenes concisos de 3 puntos para cada artículo
- **Etiquetado inteligente**: Generación automática de tags relevantes
- **Sistema de borradores**: Flujo de trabajo desde borrador → IA → publicación
- **Diseño moderno**: UI responsiva con Nuxt UI y Tailwind CSS
- **Modo oscuro**: Interfaz adaptable para mejor legibilidad
- **Gestión de contenido**: Sistema basado en Markdown con Nuxt Content

## Estructura del Proyecto

```
ai-editor/
├── app/
│   ├── pages/
│   │   ├── index.vue              # Página principal
│   │   └── noticias/
│   │       ├── index.vue          # Lista de noticias
│   │       └── [...slug].vue      # Artículo individual
│   └── components/                # Componentes Vue reutilizables
├── content/
│   ├── borradores/                # Borradores sin procesar
│   ├── ia-editados/               # Artículos procesados por IA
│   └── noticias/                  # Artículos publicados
├── scripts/
│   └── generate-posts.js          # Script de procesamiento IA
└── public/                        # Activos estáticos
```

## Tecnologías

- **Framework**: [Nuxt 4](https://nuxt.com/)
- **CMS**: [Nuxt Content](https://content.nuxt.com/)
- **UI**: [Nuxt UI](https://ui.nuxt.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **IA**: [Groq API](https://groq.com/) con Llama 3.1
- **Gestor de paquetes**: pnpm

## Instalación

1. **Instalar dependencias**
   ```bash
   pnpm install
   ```

2. **Configurar variables de entorno**
   
   Crea un archivo `.env` en la raíz del proyecto:
   ```env
   GROQ_API_KEY=tu_api_key_aqui
   ```
   
   Obtén tu API key en [console.groq.com](https://console.groq.com)

## Uso

### Servidor de Desarrollo

Inicia el servidor de desarrollo en `http://localhost:3000`:

```bash
pnpm dev
```

### Procesamiento de Artículos con IA

1. Coloca tus borradores en formato Markdown en `content/borradores/`
2. Ejecuta el script de procesamiento:
   ```bash
   pnpm ai:generate-posts
   ```
3. Los artículos procesados se guardarán en `content/IA-editados/`
4. Revisa y mueve los artículos aprobados a `content/noticias/`

### Producción

Construir la aplicación para producción en modo ssr:

```bash
pnpm build
```

Para construir la aplicación para producción en modo estatico:

```bash
pnpm generate
```

Previsualizar el build de producción:

```bash
pnpm preview
```

## Formato de Artículos

Los artículos deben tener el siguiente formato en Markdown:

```markdown
---
title: "Título del artículo"
description: "Breve descripción"
date: 2026-04-13
author: "Nombre del autor"
cover: "https://ejemplo.com/imagen.jpg"
tags: []  # Generados automáticamente por iA
tldr: []  # Generado automáticamente por iA
---

Contenido del artículo en Markdown...
```

## Funcionalidades de IA

El script `generate-posts.js` proporciona las siguientes capacidades:

- **Corrección de texto**: Corrige errores ortográficos y gramaticales manteniendo el estilo original
- **Generación de TL;DR**: Crea resúmenes de 3 puntos clave
- **Etiquetado automático**: Extrae hasta 5 tags relevantes del contenido
- **Registro de cambios**: Documenta todas las correcciones realizadas