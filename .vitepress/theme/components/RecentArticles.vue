<template>
  <aside v-if="items.length > 0" class="related-articles" aria-label="相关文章">
    <p class="related-articles__label">相关文章</p>
    <ul class="related-articles__list">
      <li v-for="item in items" :key="item.url" class="related-articles__item">
        <a :href="withBase(item.url)" class="related-articles__link">
          <div class="related-articles__thumb" v-if="item.cover">
            <img :src="withBase(item.cover)" :alt="item.title" loading="lazy"/>
          </div>
          <div class="related-articles__body">
            <h5 class="related-articles__title">{{ item.title }}</h5>
            <p class="related-articles__meta" v-if="item.tag">{{ item.tag }}</p>
          </div>
        </a>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useData, withBase, useRoute } from 'vitepress'

const { theme } = useData()
const route = useRoute()

const items = computed(() => {
  const raw = theme.value.posts || []
  return raw
    .filter((p) => !p.regularPath.includes('/index'))
    .filter((p) => {
      const cleanUrl = p.regularPath.replace('.html', '')
      return route.path !== cleanUrl && route.path !== p.regularPath
    })
    .slice(0, 3)
    .map((p) => {
      const cleanUrl = p.regularPath.replace('.html', '')
      const tags = Array.isArray(p.frontMatter.tags)
        ? p.frontMatter.tags
        : String(p.frontMatter.tags || '').split(',').map(t => t.trim()).filter(Boolean)
      return {
        title: p.frontMatter.title || p.regularPath,
        url: cleanUrl,
        cover: p.frontMatter.cover || '',
        tag: tags[0] || '',
      }
    })
})
</script>

<style scoped>
.related-articles {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e8dfcf;
}

.related-articles__label {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-size: 1rem;
  color: #1d3350;
  margin: 0 0 16px 0;
  font-weight: 500;
  letter-spacing: 0.02em;
  position: relative;
  padding-bottom: 8px;
  display: inline-block;
}

.related-articles__label::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 32px;
  height: 2px;
  background: #1d3350;
  border-radius: 1px;
}

.related-articles__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.related-articles__item {
  margin-bottom: 16px;
}
.related-articles__item:last-child {
  margin-bottom: 0;
}

.related-articles__link {
  display: flex;
  gap: 10px;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s;
}

.related-articles__link:hover {
  opacity: 0.85;
}

.related-articles__thumb {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 3px;
  overflow: hidden;
  background: #ece6da;
}

.related-articles__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: multiply;
}

.related-articles__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.related-articles__title {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-size: 0.82rem;
  font-weight: 500;
  color: #1d3350;
  margin: 0 0 4px 0;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-articles__meta {
  font-size: 0.7rem;
  color: #8a8378;
  margin: 0;
}
</style>
