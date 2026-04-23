<template>
  <section class="uk-hero">
    <div class="uk-hero__bg" aria-hidden="true">
      <img src="/images/hero/banner.png" alt="" class="uk-hero__wave" />
    </div>

    <div class="uk-hero__content">
      <h1 class="uk-hero__title">TempraIAI</h1>
      <p class="uk-hero__tag">Think Deeply, Build Calmly.</p>
      <p class="uk-hero__desc">
        关注 AI、系统与工程实践，<br />
        记录有价值的思考与可复用的经验。
      </p>
      <div class="uk-hero__actions">
        <a href="/posts/ep001-agent-first-principles" class="uk-btn uk-btn--solid">最新文章</a>
        <a href="/tags" class="uk-btn uk-btn--ghost">浏览标签</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { withBase } from 'vitepress'
</script>

<style scoped>
.uk-hero {
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  padding: 68px 0 48px;
  overflow: hidden;
  background: #f5f0eb;
  isolation: isolate;
}

.uk-hero__bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1440px;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.uk-hero__wave {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right center;
  mix-blend-mode: multiply;
  opacity: 0.92;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.15) 6%, rgba(0, 0, 0, 0.55) 18%, #000 34%, #000 100%);
  mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.15) 6%, rgba(0, 0, 0, 0.55) 18%, #000 34%, #000 100%);
}

.uk-hero__content {
  position: relative;
  z-index: 2;
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 40px;
}

.uk-hero__title {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-size: clamp(62px, 7vw, 96px);
  font-weight: 500;
  color: #1d3350;
  letter-spacing: -0.018em;
  line-height: 1;
  margin: 0;
}

.uk-hero__tag {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-style: italic;
  font-size: 20px;
  color: #b85a48;
  margin: 10px 0 0;
  letter-spacing: 0.005em;
}

.uk-hero__desc {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  color: #4a5570;
  font-size: 13.5px;
  line-height: 1.85;
  margin: 22px 0 28px;
  max-width: 420px;
}

.uk-hero__actions {
  display: flex;
  gap: 14px;
}

.uk-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 18px;
  font-size: 12.5px;
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  border-radius: 3px;
  text-decoration: none;
  transition: background 0.18s ease, color 0.18s ease;
  cursor: pointer;
  border: 1px solid #b85a48;
  letter-spacing: 0.02em;
}

.uk-btn--solid {
  background: #b85a48;
  color: #fff;
}
.uk-btn--solid:hover {
  background: #a24d3c;
  border-color: #a24d3c;
  color: #fff;
}

.uk-btn--ghost {
  background: transparent;
  color: #b85a48;
}
.uk-btn--ghost:hover {
  background: rgba(184, 90, 72, 0.08);
}

@media (max-width: 960px) {
  .uk-hero {
    padding: 76px 0 56px;
  }
  .uk-hero__wave {
    width: 80%;
    opacity: 0.6;
  }
  .uk-hero__desc {
    max-width: 540px;
  }
}
</style>
