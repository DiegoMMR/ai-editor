<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui';

  const route = useRoute();

  const items = computed<NavigationMenuItem[]>(() => [
    {
      label: 'Noticias',
      to: '/noticias',
      active: route.path.startsWith('/noticias'),
    },
  ]);
</script>

<template>
  <UHeader>
    <template #title>
      <div>Linux News</div>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
      :ui="{
        linkLabel: 'text-base group-data-[active]:font-bold',
      }"
    />

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        :ui="{
          linkLabel: 'text-base group-data-[active]:font-bold',
        }"
      />
    </template>
  </UHeader>
</template>
