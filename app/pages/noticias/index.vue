<script setup lang="ts">
  const { data: posts } = await useAsyncData('noticias-list', () => queryCollection('noticias').order('date', 'DESC').all());

  const selectedTag = ref<string | null>(null);
  const searchQuery = ref('');

  // Obtener todos los tags únicos
  const allTags = computed(() => {
    if (!posts.value) return [];
    const tags = new Set<string>();
    posts.value.forEach((post) => {
      post.tags?.forEach((tag: string) => tags.add(tag));
    });
    return Array.from(tags).sort();
  });

  // Filtrar posts por tag y búsqueda
  const filteredPosts = computed(() => {
    if (!posts.value) return [];

    let filtered = [...posts.value];

    if (selectedTag.value) {
      filtered = filtered.filter((post) => post.tags?.includes(selectedTag.value!));
    }

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter((post) => post.title.toLowerCase().includes(query) || post.description?.toLowerCase().includes(query));
    }

    return filtered;
  });

  useSeoMeta({
    title: 'Noticias - Linux News',
    description: 'Últimas noticias y actualizaciones del mundo Linux y software libre.',
  });
</script>

<template>
  <UContainer>
    <section class="py-10">
      <!-- Header -->
      <div class="mb-10">
        <h1 class="text-4xl font-black mb-4">Todas las Noticias</h1>
        <p class="text-gray-600 dark:text-gray-400 text-lg">Últimas noticias y actualizaciones del mundo Linux y software libre.</p>
      </div>

      <!-- Filters -->
      <div class="mb-8 space-y-4">
        <!-- Search -->
        <UInput v-model="searchQuery" icon="i-heroicons-magnifying-glass" size="lg" placeholder="Buscar noticias...">
          <template #trailing>
            <UButton
              v-show="searchQuery !== ''"
              color="neutral"
              variant="link"
              icon="i-heroicons-x-mark-20-solid"
              :padded="false"
              @click="searchQuery = ''"
            />
          </template>
        </UInput>

        <!-- Tags Filter -->
        <div class="flex flex-wrap gap-2 items-center">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Filtrar por:</span>
          <UButton
            :color="selectedTag === null ? 'primary' : 'neutral'"
            :variant="selectedTag === null ? 'solid' : 'outline'"
            size="xs"
            @click="selectedTag = null"
          >
            Todas
          </UButton>
          <UButton
            v-for="tag in allTags"
            :key="tag"
            :color="selectedTag === tag ? 'primary' : 'neutral'"
            :variant="selectedTag === tag ? 'solid' : 'outline'"
            size="xs"
            @click="selectedTag = tag"
          >
            {{ tag }}
          </UButton>
        </div>
      </div>

      <!-- Results count -->
      <div class="mb-6 text-sm text-gray-600 dark:text-gray-400">
        Mostrando {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'noticia' : 'noticias' }}
      </div>

      <!-- Posts Grid -->
      <div v-if="filteredPosts.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink v-for="post in filteredPosts" :key="post.path" :to="post.path">
          <UCard class="hover:shadow-lg transition-shadow">
            <template #header>
              <div class="flex flex-wrap gap-2 mb-3">
                <UBadge v-for="tag in post.tags" :key="tag" color="primary" variant="subtle" size="xs">
                  {{ tag }}
                </UBadge>
              </div>
              <h2 class="text-xl font-bold line-clamp-2 mb-2">{{ post.title }}</h2>
            </template>

            <p class="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
              {{ post.description }}
            </p>

            <template #footer>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300 font-medium">{{ post.author }}</span>
                <span class="text-gray-500">
                  {{
                    new Date(post.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                </span>
              </div>
            </template>
          </UCard>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <UCard v-else class="text-center py-16">
        <UIcon name="i-heroicons-document-magnifying-glass" class="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 class="text-xl font-bold mb-2">No se encontraron noticias</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">Intenta con otros términos de búsqueda o filtros.</p>
        <UButton
          color="neutral"
          @click="
            searchQuery = '';
            selectedTag = null;
          "
        >
          Limpiar filtros
        </UButton>
      </UCard>
    </section>
  </UContainer>
</template>
color="gray"
