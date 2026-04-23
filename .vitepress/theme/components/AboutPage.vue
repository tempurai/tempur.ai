<template>
  <div class="about-page">
    <nav class="breadcrumb" aria-label="breadcrumb">
      <a :href="withBase('/')">首页</a>
      <span class="sep">›</span>
      <span class="current">关于</span>
    </nav>

    <h1 class="about-title">About TempraIAI</h1>
    <p class="about-tag">Think Deeply, Build Calmly.</p>

    <p class="about-desc">
      一个关于 AI、系统与工程实践的博客。<br />
      写得慢、读得稳、做得清醒。
    </p>

    <hr class="rule" />

    <section class="block">
      <h2 class="block__label">理念</h2>
      <ul class="principles" role="list">
        <li v-for="p in principles" :key="p.title" class="principle">
          <h3 class="principle__title">{{ p.title }}</h3>
          <p class="principle__desc">{{ p.desc }}</p>
        </li>
      </ul>
    </section>

    <section class="block">
      <h2 class="block__label">关注</h2>
      <p class="focus-line">
        <span v-for="(f, i) in focus" :key="f">
          <span v-if="i > 0" class="focus-sep">·</span>
          {{ f }}
        </span>
      </p>
    </section>

    <section class="block">
      <h2 class="block__label">联系</h2>
      <ul class="contact-list" role="list">
        <li v-for="c in contacts" :key="c.label" class="contact-item">
          <span class="contact-item__label">{{ c.label }}</span>
          <a :href="c.href" :target="c.external ? '_blank' : null" rel="noopener">{{ c.value }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { withBase } from 'vitepress'

const principles = [
  { title: '深度思考', desc: '宁可慢一点，也要把问题想清楚。' },
  { title: '系统构建', desc: '在抽象和具象之间搭桥，让知识可组合。' },
  { title: '简洁克制', desc: '少一点花哨，多一点可读与可维护。' },
  { title: '持续成长', desc: '把每一次返工都当作一次认知升级。' },
]

const focus = ['AI Agent', '系统设计', '技术写作', '独立产品']

const contacts = [
  { label: 'Email', value: 'hello@tempur.ai', href: 'mailto:hello@tempur.ai' },
  { label: 'GitHub', value: 'github.com/tempurai', href: 'https://github.com/tempurai', external: true },
  { label: 'Twitter', value: '@tempur_ai', href: 'https://twitter.com/tempur_ai', external: true },
  { label: 'RSS', value: 'feed.xml', href: '/feed.xml' },
]
</script>

<style scoped>
.about-page h1,
.about-page h2,
.about-page h3,
.about-page p,
.about-page ul,
.about-page li {
  margin: 0;
  padding: 0;
  border: 0;
}
.about-page ul { list-style: none; }
.about-page li + li { margin-top: 0; }

.about-page {
  max-width: 620px;
  margin: 0 auto;
  padding: 72px 32px 80px;
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  color: #3d3834;
}

.breadcrumb {
  font-size: 12.5px;
  color: #6b7385;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.breadcrumb a { color: #6b7385; text-decoration: none; transition: color 0.18s; }
.breadcrumb a:hover { color: #b85a48; }
.breadcrumb .sep { color: #b8b0a0; font-size: 13px; }
.breadcrumb .current { color: #1d3350; }

.about-title {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-size: 42px;
  font-weight: 500;
  color: #1d3350;
  letter-spacing: -0.005em;
  line-height: 1.15;
  margin: 0;
}

.about-tag {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-style: italic;
  font-size: 16px;
  color: #b85a48;
  margin-top: 8px;
  letter-spacing: 0.01em;
}

.about-desc {
  font-size: 14px;
  color: #4a5570;
  line-height: 1.95;
  margin-top: 22px;
}

.rule {
  border: 0;
  border-top: 1px solid #e8dfcf;
  margin: 56px 0;
}

.block {
  margin-bottom: 44px;
}

.block__label {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-size: 12px;
  font-weight: 600;
  color: #b85a48;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin: 0 0 18px 0;
}

/* Principles — single column, clean */
.principles {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.principle {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 20px;
  align-items: baseline;
}

.principle__title {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-size: 14.5px;
  font-weight: 500;
  color: #1d3350;
  margin: 0;
}

.principle__desc {
  font-size: 13.5px;
  color: #5a544d;
  line-height: 1.75;
  margin: 0;
}

/* Focus line */
.focus-line {
  font-size: 14px;
  color: #1d3350;
  letter-spacing: 0.01em;
  margin: 0;
}

.focus-sep {
  color: #b8b0a0;
  margin: 0 10px;
}

/* Contact */
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-item {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 20px;
  align-items: baseline;
}

.contact-item__label {
  font-size: 13px;
  color: #6b7385;
  letter-spacing: 0.02em;
}

.contact-item a {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-size: 14.5px;
  color: #1d3350;
  text-decoration: none;
  transition: color 0.18s;
}

.contact-item a:hover {
  color: #b85a48;
}
</style>
