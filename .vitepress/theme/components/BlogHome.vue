<template>
  <div class="home-grid">
    <!-- Left: 最新文章 -->
    <section class="home-col home-col--main" aria-label="最新文章">
      <header class="home-section-header">
        <h2 class="home-section-title">最新文章</h2>
      </header>

      <ul class="article-cards" role="list">
        <li v-for="post in latestArticles" :key="post.url" class="article-card">
          <a :href="withBase(post.url)" class="article-card__link">
            <div class="article-card__thumb">
              <img :src="withBase(post.cover)" alt="" loading="lazy"/>
            </div>
            <div class="article-card__body">
              <div>
                <h3 class="article-card__title">{{ post.title }}</h3>
                <p class="article-card__excerpt">{{ post.excerpt }}</p>
              </div>
              <div class="article-card__meta">
                <span class="article-card__tags-wrap">
                  <span v-for="tag in post.tags" :key="tag" class="article-card__tag">{{ tag }}</span>
                </span>
                <span class="article-card__meta-right">
                  <time class="article-card__date">{{ formatDate(post.date) }}</time>
                  <span class="article-card__readtime">8 分钟阅读</span>
                </span>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </section>

    <!-- Right: 精选文章 + 标签 -->
    <aside class="home-col home-col--aside" aria-label="侧边栏">
      <section v-if="featuredArticles.length" class="home-panel">
        <header class="home-section-header">
          <h2 class="home-section-title">精选文章</h2>
        </header>
        <ul class="featured-cards" role="list">
          <li v-for="post in featuredArticles" :key="post.url" class="featured-card">
            <a :href="withBase(post.url)" class="featured-card__link">
              <div class="featured-card__thumb">
                <img :src="withBase(post.cover)" alt="" loading="lazy"/>
              </div>
              <h4 class="featured-card__title">{{ post.title }}</h4>
              <div class="featured-card__meta">
                <span>{{ formatDate(post.date) }}</span>
              </div>
            </a>
          </li>
        </ul>
      </section>

      <section class="home-panel tag-panel">
        <header class="home-section-header">
          <h2 class="home-section-title">热门标签</h2>
        </header>
        <ul class="tag-cloud" role="list">
          <li v-for="tag in hotTags" :key="tag.name">
            <a :href="withBase('/tags')" class="tag-cloud__item">
              <span class="tag-name">{{ tag.name }}</span>
              <span class="tag-count">{{ tag.count }}</span>
            </a>
          </li>
        </ul>
      </section>

      <section class="home-panel">
        <header class="home-section-header">
          <h2 class="home-section-title">归档</h2>
        </header>
        <ul class="archive-list" role="list">
          <li v-for="g in archiveGroups" :key="g.label" class="archive-item">
            <a :href="withBase('/tags')" class="archive-item__link">
              <span class="archive-item__label">{{ g.label }}</span>
              <span class="archive-item__count">{{ g.count }} 篇</span>
            </a>
          </li>
        </ul>
      </section>
    </aside>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { theme } = useData()

const allPosts = computed(() => {
  const posts = theme.value?.posts || []
  return posts.map((p) => ({
    title: p.frontMatter.title || p.regularPath,
    date: p.frontMatter.date,
    excerpt: p.frontMatter.description || p.frontMatter.excerpt || '',
    tags: Array.isArray(p.frontMatter.tags) ? p.frontMatter.tags : [],
    url: p.regularPath,
    cover: p.frontMatter.cover,
  }))
})

const latestArticles = computed(() => allPosts.value.slice(0, 3))
const featuredArticles = computed(() => {
  const raw = theme.value?.featured || []
  return raw.map((p) => ({
    title: p.frontMatter.title,
    date: p.frontMatter.date,
    url: p.regularPath,
    cover: p.frontMatter.cover,
  }))
})
const hotTags = computed(() => theme.value?.hotTags || [])
const archiveGroups = computed(() => theme.value?.archive || [])

function formatDate(d) {
  if (!d) return ''
  const parts = String(d).split('T')[0].split('-')
  if (parts.length < 3) return String(d)
  return `${parseInt(parts[1])}月${parseInt(parts[2])}日`
}
</script>

<style scoped>
.home-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 80px;
  max-width: 1152px;
  margin: 0 auto;
  padding: 60px 40px;
  background: transparent;
}

/* Neutralize VitePress .vp-doc defaults for THIS subtree only.
   .vp-doc applies: li+li {margin-top:8px}, h2 {margin:48px 0 16px; border-top; padding-top},
   ul {padding-left:1.25rem; list-style:disc}. We want a clean slate for the grid UI. */
.home-grid h2,
.home-grid h3,
.home-grid h4 {
  border: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
}
.home-grid ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.home-grid li + li {
  margin-top: 0;
}

@media (max-width: 960px) {
  .home-grid {
    grid-template-columns: 1fr;
    gap: 60px;
  }
}

.home-section-header {
  padding: 0;
  margin: 0 0 22px 0;
  display: flex;
  align-items: baseline;
}

.home-section-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: #1d3350;
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.02em;
  position: relative;
  padding-bottom: 10px;
  display: inline-block;
}

.home-section-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 42px;
  height: 2px;
  background: #1d3350;
  border-radius: 1px;
}

.article-cards {
  list-style: none;
  padding: 0;
  margin: 0;
}

.article-card {
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #e8dfcf;
}
.article-card:last-child { border-bottom: none; }

.article-card__link {
  display: flex;
  align-items: flex-start;
  gap: 26px;
  text-decoration: none;
  color: inherit;
}

.article-card__thumb {
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  background: var(--wc-surface-2);
}

.article-card__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.95;
  mix-blend-mode: multiply;
  transition: transform 0.4s ease;
}

.article-card__link:hover .article-card__thumb img {
  transform: scale(1.03);
}

.article-card__body {
  flex-grow: 1;
  min-width: 0;
}

.article-card__title {
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.45;
  margin: 0 0 8px 0;
  font-family: var(--font-display);
  color: #1d3350;
}

.article-card__excerpt {
  font-size: 0.85rem;
  color: #5a544d;
  margin: 0 0 14px 0;
  line-height: 1.65;
}

.article-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
}

.article-card__tags-wrap {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.article-card__tag {
  background: #e8e2d7;
  padding: 3px 10px;
  border-radius: 3px;
  font-size: 0.74rem;
  color: #5a544d;
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
}

.article-card__meta-right {
  display: flex;
  flex-direction: column;
  text-align: right;
  gap: 2px;
  color: #8a8378;
  font-size: 0.78rem;
}
.article-card__readtime { font-size: 0.72rem; }

/* Right column panels */
.home-panel {
  margin-bottom: 60px;
}

.featured-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.featured-card__link {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-decoration: none;
  color: inherit;
}

.featured-card__thumb {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 4px;
  overflow: hidden;
  background: var(--wc-surface-2);
}

.featured-card__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: multiply;
  transition: transform 0.4s ease;
}

.featured-card__title {
  font-size: 0.88rem;
  font-weight: 500;
  margin: 0;
  font-family: var(--font-display);
  color: #1d3350;
  line-height: 1.45;
}

.featured-card__meta {
  font-size: 0.72rem;
  color: #8a8378;
  margin-top: 2px;
}

/* Tag Cloud matches exact style from image 2 bottom */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.tag-cloud__item {
  display: inline-flex;
  align-items: center;
  border: 1px solid #d6cdbb;
  background: transparent;
  border-radius: 3px;
  padding: 2px 8px;
  text-decoration: none;
  font-size: 0.7rem;
  color: #2d2926;
  transition: all 0.18s ease;
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  line-height: 1.6;
}

.tag-cloud__item:hover {
  border-color: #b85a48;
  color: #b85a48;
}

.tag-count {
  color: #8a8378;
  margin-left: 5px;
  font-size: 0.64rem;
}

/* Archive list */
.archive-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.archive-item__link {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 7px 2px;
  border-bottom: 1px dashed rgba(29, 51, 80, 0.08);
  text-decoration: none;
  color: inherit;
  transition: color 0.18s ease;
}

.archive-item:last-child .archive-item__link {
  border-bottom: none;
}

.archive-item__link:hover {
  color: #b85a48;
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
</style>
