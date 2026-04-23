<template>
  <div class="tags-page">
    <!-- Hero band with selected tag -->
    <section class="tags-hero">
      <div class="tags-hero__inner">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <a :href="withBase('/')">首页</a>
          <span class="sep">›</span>
          <a :href="withBase('/tags')">标签</a>
          <span class="sep">›</span>
          <span class="current">{{ selectedTag || '全部' }}</span>
        </nav>
        <h1 class="tags-hero__title">{{ selectedTag || '全部标签' }}</h1>
        <p class="tags-hero__desc">
          关于 {{ selectedTag || '所有主题' }} 的思考、方法与工程化实践。<br />
          从原理到落地，在抽象与具象之间往返。
        </p>
        <p class="tags-hero__count">
          共 <em>{{ filteredPosts.length }}</em> 篇文章
        </p>
      </div>
    </section>

    <div class="tags-grid">
      <!-- Left: article list under the selected tag -->
      <section class="tags-col tags-col--main" aria-label="标签下的文章">
        <header class="section-header">
          <h2 class="section-title">标签下的文章</h2>
        </header>

        <ul v-if="filteredPosts.length" class="tag-article-cards" role="list">
          <li v-for="post in filteredPosts" :key="post.url" class="tag-article-card">
            <a :href="withBase(post.url)" class="tag-article-card__link">
              <div class="tag-article-card__thumb">
                <img :src="withBase(post.cover || '/images/thumbs/fuji-lake.png')" alt="" loading="lazy" />
              </div>
              <div class="tag-article-card__body">
                <div>
                  <h3 class="tag-article-card__title">{{ post.title }}</h3>
                  <p class="tag-article-card__excerpt">{{ post.excerpt }}</p>
                </div>
                <div class="tag-article-card__meta">
                  <span class="meta-tags">
                    <span v-for="t in post.tags.slice(0, 3)" :key="t" class="meta-tag">{{ t }}</span>
                  </span>
                  <span class="meta-right">
                    <time>{{ formatDate(post.date) }}</time>
                    <span class="read">6 分钟阅读</span>
                  </span>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <p v-else class="empty">还没有这个标签下的文章。</p>
      </section>

      <!-- Right: all-tags directory + archive -->
      <aside class="tags-col tags-col--aside" aria-label="标签目录">
        <section class="panel">
          <header class="section-header">
            <h2 class="section-title">标签目录</h2>
          </header>
          <ul class="tag-directory" role="list">
            <li
              v-for="tag in sortedTags"
              :key="tag.name"
              class="tag-directory__item"
              :class="{ 'is-active': tag.name === selectedTag }"
            >
              <button class="tag-directory__link" @click="selectTag(tag.name)">
                <span class="tag-directory__name">{{ tag.name }}</span>
                <span class="tag-directory__count">{{ tag.count }}</span>
              </button>
            </li>
          </ul>
        </section>

        <section class="panel">
          <header class="section-header">
            <h2 class="section-title">归档</h2>
          </header>
          <ul class="archive-list" role="list">
            <li v-for="g in archiveGroups" :key="g.label" class="archive-item">
              <span class="archive-item__label">{{ g.label }}</span>
              <span class="archive-item__count">{{ g.count }} 篇</span>
            </li>
          </ul>
        </section>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useData, withBase } from 'vitepress'

const { theme } = useData()
const selectedTag = ref('')

const posts = computed(() => {
  const raw = theme.value?.posts || []
  return raw
    .filter((p) => !p.regularPath.includes('/index'))
    .map((p) => ({
      title: p.frontMatter.title || p.regularPath,
      date: p.frontMatter.date,
      url: p.regularPath,
      tags: Array.isArray(p.frontMatter.tags) ? p.frontMatter.tags : [],
      cover: p.frontMatter.cover || '',
      excerpt: p.frontMatter.description || p.frontMatter.excerpt || '',
    }))
})

const sortedTags = computed(() => theme.value?.hotTags || [])
const archiveGroups = computed(() => theme.value?.archive || [])

const filteredPosts = computed(() => {
  if (!selectedTag.value) return posts.value
  return posts.value.filter(post => post.tags.includes(selectedTag.value))
})

function selectTag(tag) {
  if (selectedTag.value === tag) return
  selectedTag.value = tag
}

watchEffect(() => {
  if (!selectedTag.value && sortedTags.value.length > 0) {
    selectedTag.value = sortedTags.value[0].name
  }
})

function formatDate(d) {
  if (!d) return ''
  const parts = String(d).split('T')[0].split('-')
  if (parts.length < 3) return String(d)
  return `${parseInt(parts[1])}月${parseInt(parts[2])}日`
}
</script>

<style scoped>
/* Neutralize .vp-doc bleed — reset heads/paras, but leave <li> alone so card spacing survives */
.tags-page h1,
.tags-page h2,
.tags-page h3,
.tags-page h4,
.tags-page p {
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
}
.tags-page ul { list-style: none; padding: 0; margin: 0; }
.tags-page li + li { margin-top: 0; }

.tags-page {
  background: #f5f0eb;
  min-height: 100vh;
}

/* Hero */
.tags-hero {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  padding: 72px 0 48px;
  background: #f5f0eb;
  border-bottom: 1px solid #e8dfcf;
}

.tags-hero__inner {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 40px;
}

.breadcrumb {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-size: 12.5px;
  color: #6b7385;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumb a {
  color: #6b7385;
  text-decoration: none;
  transition: color 0.18s;
}

.breadcrumb a:hover {
  color: #b85a48;
}

.breadcrumb .sep {
  color: #b8b0a0;
  font-size: 13px;
}

.breadcrumb .current {
  color: #1d3350;
}

.tags-hero__title {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-size: clamp(48px, 5.8vw, 76px);
  font-weight: 500;
  color: #1d3350;
  letter-spacing: -0.01em;
  line-height: 1.02;
  margin: 0;
}

.tags-hero__desc {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  color: #4a5570;
  font-size: 13.5px;
  line-height: 1.85;
  margin: 14px 0 0;
  max-width: 540px;
}

.tags-hero__count {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-style: italic;
  font-size: 14px;
  color: #b85a48;
  margin-top: 14px;
  letter-spacing: 0.02em;
}

.tags-hero__count em {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
}

/* Grid */
.tags-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 80px;
  max-width: 1152px;
  margin: 0 auto;
  padding: 60px 40px;
}

@media (max-width: 960px) {
  .tags-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

/* Section header (consistent with BlogHome) */
.section-header {
  margin: 0 0 22px 0;
  display: flex;
  align-items: baseline;
}

.section-title {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-size: 1.1rem;
  color: #1d3350;
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.02em;
  position: relative;
  padding-bottom: 10px;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 42px;
  height: 2px;
  background: #1d3350;
  border-radius: 1px;
}

/* Article cards */
.tag-article-cards {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tag-article-card {
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #e8dfcf;
}
.tag-article-card:last-child {
  border-bottom: none;
}

.tag-article-card__link {
  display: flex;
  align-items: flex-start;
  gap: 26px;
  text-decoration: none;
  color: inherit;
}

.tag-article-card__thumb {
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  background: #ece6da;
}

.tag-article-card__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: multiply;
  transition: transform 0.4s ease;
}

.tag-article-card__link:hover .tag-article-card__thumb img {
  transform: scale(1.03);
}

.tag-article-card__body {
  flex-grow: 1;
  min-width: 0;
}

.tag-article-card__title {
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.45;
  margin: 0 0 8px 0;
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  color: #1d3350;
}

.tag-article-card__excerpt {
  font-size: 0.85rem;
  color: #5a544d;
  margin: 0 0 14px 0;
  line-height: 1.65;
}

.tag-article-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
}

.meta-tags { display: flex; gap: 8px; flex-wrap: wrap; }

.meta-tag {
  background: #e8e2d7;
  padding: 3px 10px;
  border-radius: 3px;
  font-size: 0.74rem;
  color: #5a544d;
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
}

.meta-right {
  display: flex;
  flex-direction: column;
  text-align: right;
  gap: 2px;
  color: #8a8378;
  font-size: 0.78rem;
}

.read { font-size: 0.72rem; }

/* Panels */
.panel {
  margin-bottom: 48px;
}

/* Tag directory */
.tag-directory {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tag-directory__link {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  padding: 8px 10px 8px 12px;
  background: none;
  border: none;
  border-left: 2px solid transparent;
  border-bottom: 1px dashed rgba(29, 51, 80, 0.1);
  cursor: pointer;
  color: #2d2926;
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  transition: all 0.18s ease;
  text-align: left;
  margin-left: -12px;
}

.tag-directory__item:last-child .tag-directory__link {
  border-bottom: none;
}

.tag-directory__link:hover {
  color: #b85a48;
  background: rgba(184, 90, 72, 0.04);
}

.tag-directory__item.is-active .tag-directory__link {
  color: #b85a48;
  font-weight: 500;
  background: rgba(184, 90, 72, 0.06);
  border-left-color: #b85a48;
}

.tag-directory__name {
  font-size: 0.9rem;
}

.tag-directory__count {
  color: #8a8378;
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
}

.tag-directory__item.is-active .tag-directory__count {
  color: #b85a48;
}

/* Archive list */
.archive-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.archive-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 7px 2px;
  border-bottom: 1px dashed rgba(29, 51, 80, 0.08);
}

.archive-list li:last-child {
  border-bottom: none;
}

.archive-item__label {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-size: 0.82rem;
  color: #2d2926;
}

.archive-item__count {
  font-size: 0.72rem;
  color: #8a8378;
  font-variant-numeric: tabular-nums;
}

.empty {
  color: #8a8378;
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-size: 0.9rem;
}
</style>
