<script setup lang="ts">
  const route = useRoute();
  // Path is defined in front matter as /noticias/<slug>
  const path = `/noticias/${(route.params.slug as string[]).join('/')}`;

  const { data: story } = await useAsyncData(`noticias-${path}`, () => queryCollection('noticias').path(path).first());

  // Obtener noticias relacionadas (misma categoría/tags)
  const { data: relatedNews } = await useAsyncData(`related-news-${path}`, async () => {
    if (!story.value?.tags?.length) return [];

    const all = await queryCollection('noticias').order('date', 'DESC').limit(4).all();

    return all
      .filter((post) => post.path !== story.value?.path && post.tags?.some((tag: string) => story.value?.tags?.includes(tag)))
      .slice(0, 3);
  });

  useSeoMeta({
    title: story.value?.title ?? 'Noticias',
    description: story.value?.description ?? 'Entérate de las últimas noticias y actualizaciones sobre Linux',
  });
</script>

<template>
  <UContainer>
    <section class="py-10">
      <article v-if="story">
        <!-- Breadcrumb -->
        <nav class="mb-6">
          <UBreadcrumb :links="[{ label: 'Inicio', to: '/' }, { label: 'Noticias', to: '/noticias' }, { label: story.title }]" />
        </nav>

        <!-- Article Header -->
        <header class="mb-8">
          <div class="flex flex-wrap gap-2 mb-4">
            <UBadge v-for="tag in story.tags" :key="tag" color="primary" variant="subtle">
              {{ tag }}
            </UBadge>
          </div>

          <h1 class="text-4xl md:text-5xl font-black mb-4">{{ story.title }}</h1>

          <p v-if="story.description" class="text-xl text-gray-600 dark:text-gray-400 mb-6">
            {{ story.description }}
          </p>

          <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-user" />
              <span class="font-medium">{{ story.author }}</span>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-calendar" />
              <time :datetime="story.date">
                {{
                  new Date(story.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                }}
              </time>
            </div>
          </div>
        </header>

        <!-- Article Content -->
        <div class="prose prose-lg dark:prose-invert max-w-none mb-12">
          <ContentRenderer :value="story" />
        </div>

        <!-- Related Articles -->
        <section v-if="relatedNews?.length" class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 class="text-2xl font-black mb-6">Noticias Relacionadas</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <NuxtLink v-for="post in relatedNews" :key="post.path" :to="post.path">
              <UCard class="hover:shadow-lg transition-shadow">
                <template #header>
                  <h3 class="text-lg font-bold line-clamp-2">{{ post.title }}</h3>
                </template>

                <p class="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm">
                  {{ post.description }}
                </p>

                <template #footer>
                  <div class="text-xs text-gray-500">
                    {{ new Date(post.date).toLocaleDateString('es-ES') }}
                  </div>
                </template>
              </UCard>
            </NuxtLink>
          </div>
        </section>

        <!-- Back to News -->
        <div class="mt-12 text-center">
          <UButton to="/noticias" color="neutral" variant="outline" leading-icon="i-heroicons-arrow-left"> Volver a Noticias </UButton>
        </div>
      </article>

      <UCard v-else class="text-center py-16">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 class="text-2xl font-bold mb-2">Noticia no encontrada</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">La noticia que buscas no existe o ha sido eliminada.</p>
        <UButton to="/noticias" icon="i-heroicons-arrow-left"> Volver a Noticias </UButton>
      </UCard>
    </section>
  </UContainer>
</template>
