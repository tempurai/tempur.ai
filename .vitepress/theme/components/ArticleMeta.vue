<template>
  <div class="article-meta">
    <div class="article-meta-left">
      <span class="article-meta-icon">&#9701;</span>
      <span class="article-date">{{ date }}</span>
    </div>
    <div class="article-tags" v-if="tags">
      <span v-for="tag in tagList" :key="tag" class="article-tag">{{ tag }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  date: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    default: ''
  }
})

const tagList = computed(() => {
  return props.tags.split(',').map(t => t.trim()).filter(Boolean)
})
</script>

<style scoped>
.article-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
  padding: 12px 18px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 10px;
  border: 1px solid var(--vp-c-border);
}

.article-meta-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.article-meta-icon {
  font-size: 14px;
  color: var(--vp-c-brand-1);
  opacity: 0.7;
}

.article-date {
  font-size: 13px;
  color: var(--vp-c-text-3);
  font-family: var(--font-mono);
  letter-spacing: 0.02em;
}

.article-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.article-tag {
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 100px;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-family: var(--font-nav);
  letter-spacing: 0.03em;
}
</style>
