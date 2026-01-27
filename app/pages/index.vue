<script setup lang="ts">
  const { data: latestNews } = await useAsyncData('latest-news', () => queryCollection('noticias').order('date', 'DESC').limit(3).all());

  useSeoMeta({
    title: 'Linux News - Tu fuente de noticias sobre Linux y Software Libre',
    description: 'Mantente actualizado con las últimas noticias, actualizaciones y tendencias del mundo Linux y el software libre.',
  });
</script>

<template>
  <UContainer>
    <!-- Hero Section -->
    <section class="py-20 text-center">
      <UBadge color="primary" variant="subtle" size="lg" class="mb-4"> Noticias de Linux </UBadge>
      <h1 class="text-5xl font-black mb-6 bg-linear-to-r from-primary-500 to-blue-500 bg-clip-text text-transparent">
        Tu fuente de noticias sobre Linux
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
        Mantente al día con las últimas noticias, actualizaciones y tendencias del mundo Linux y el software libre.
      </p>
      <div class="flex gap-4 justify-center flex-wrap">
        <UButton to="/noticias" size="xl" icon="i-heroicons-newspaper"> Ver todas las noticias </UButton>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="py-16 border-t border-gray-200 dark:border-gray-800">
      <div class="grid md:grid-cols-3 gap-8">
        <UCard>
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-bolt" class="w-8 h-8 text-yellow-500" />
              <h3 class="text-xl font-bold">Actualizaciones Rápidas</h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-400">Recibe las noticias más recientes del mundo Linux al instante.</p>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-shield-check" class="w-8 h-8 text-green-500" />
              <h3 class="text-xl font-bold">Seguridad</h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-400">Mantente informado sobre las últimas actualizaciones de seguridad.</p>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-users" class="w-8 h-8 text-blue-500" />
              <h3 class="text-xl font-bold">Comunidad</h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-400">Noticias de la comunidad de software libre y código abierto.</p>
        </UCard>
      </div>
    </section>

    <!-- Latest News -->
    <section v-if="latestNews?.length" class="py-16 border-t border-gray-200 dark:border-gray-800">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-black">Últimas Noticias</h2>
        <UButton to="/noticias" trailing-icon="i-heroicons-arrow-right" color="neutral" variant="ghost"> Ver todas </UButton>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <NuxtLink v-for="post in latestNews" :key="post.path" :to="post.path">
          <UCard class="hover:shadow-lg transition-shadow">
            <template #header>
              <div class="flex flex-wrap gap-2 mb-3">
                <UBadge v-for="tag in post.tags?.slice(0, 2)" :key="tag" color="primary" variant="subtle" size="xs">
                  {{ tag }}
                </UBadge>
              </div>
              <h3 class="text-xl font-bold line-clamp-2">{{ post.title }}</h3>
            </template>

            <p class="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
              {{ post.description }}
            </p>

            <template #footer>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>{{ post.author }}</span>
                <span>{{ new Date(post.date).toLocaleDateString('es-ES') }}</span>
              </div>
            </template>
          </UCard>
        </NuxtLink>
      </div>
    </section>
  </UContainer>
</template>
