<template>
  <DefaultTheme.Layout>
    <template #aside-outline-after>
      <RecentArticles />
    </template>
    <template #layout-bottom>
      <PageFooterDeco />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import RecentArticles from './RecentArticles.vue'
import PageFooterDeco from './PageFooterDeco.vue'
</script>
