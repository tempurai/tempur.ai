<template>
  <header class="article-header">
    <nav class="article-breadcrumb" aria-label="breadcrumb">
      <a :href="withBase('/')">首页</a>
      <span class="sep">›</span>
      <a :href="withBase('/')">文章</a>
      <span class="sep">›</span>
      <span class="current">{{ title }}</span>
    </nav>

    <h1 class="article-header__title">{{ title }}</h1>

    <div class="article-header__meta">
      <span v-for="tag in tagList" :key="tag" class="article-header__tag">{{ tag }}</span>
      <span v-if="date" class="article-header__date">{{ dateStr }}</span>
      <span class="article-header__read">6 分钟阅读</span>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { frontmatter } = useData()

const title = computed(() => frontmatter.value.title || '')
const date = computed(() => frontmatter.value.date)

const tagList = computed(() => {
  const raw = frontmatter.value.tags
  if (!raw) return []
  if (Array.isArray(raw)) return raw
  return String(raw).split(',').map(t => t.trim()).filter(Boolean)
})

const MONTHS_CN = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
const dateStr = computed(() => {
  if (!date.value) return ''
  const parts = String(date.value).split('-')
  if (parts.length < 3) return String(date.value)
  return `${parts[0]} · ${MONTHS_CN[parseInt(parts[1], 10) - 1]}${parseInt(parts[2], 10)}日`
})
</script>

<style scoped>
.article-header {
  margin-bottom: 32px;
}

.article-breadcrumb {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-size: 12.5px;
  color: #6b7385;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.article-breadcrumb a {
  color: #6b7385;
  text-decoration: none;
  transition: color 0.18s;
}

.article-breadcrumb a:hover {
  color: #b85a48;
}

.article-breadcrumb .sep {
  color: #b8b0a0;
  font-size: 13px;
}

.article-breadcrumb .current {
  color: #1d3350;
  max-width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.article-header__title {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-size: 2rem !important;
  font-weight: 500;
  color: #1d3350;
  margin: 0 0 16px 0 !important;
  line-height: 1.25;
  letter-spacing: -0.005em;
  border: 0 !important;
  padding: 0 !important;
}

.article-header__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
}

.article-header__tag {
  background: #e8e2d7;
  padding: 3px 10px;
  border-radius: 3px;
  font-size: 0.74rem;
  color: #5a544d;
}

.article-header__date {
  font-size: 0.8rem;
  color: #6b7385;
}

.article-header__date::before {
  content: '·';
  margin-right: 10px;
  color: #b8b0a0;
}

.article-header__read {
  font-size: 0.8rem;
  color: #6b7385;
}

.article-header__read::before {
  content: '·';
  margin-right: 10px;
  color: #b8b0a0;
}
</style>
