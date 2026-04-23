<template>
  <footer class="uk-footer">
    <div class="uk-footer__deco uk-footer__deco--left" aria-hidden="true">
      <img src="/images/deco/peonies.png" alt="" />
    </div>
    <div class="uk-footer__deco uk-footer__deco--right" aria-hidden="true">
      <img src="/images/deco/maple-plum.png" alt="" />
    </div>

    <div class="uk-footer__inner">
      <p class="uk-footer__quote">不积跬步，无以至千里。</p>
      <p class="uk-footer__tagline">Think Deeply, Build Calmly.</p>
      <p class="uk-footer__meta">© 2026 Tempur.ai · 由好奇心与慢思考驱动</p>
    </div>
  </footer>
</template>

<style scoped>
.uk-footer {
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  padding: 62px 24px 54px;
  background: #efe6d9;
  overflow: hidden;
  border-top: 1px solid rgba(29, 51, 80, 0.08);
}

.uk-footer__deco {
  position: absolute;
  bottom: 0;
  width: 260px;
  opacity: 0.78;
  pointer-events: none;
  mix-blend-mode: multiply;
}

.uk-footer__deco--left {
  left: -20px;
}

.uk-footer__deco--right {
  right: -20px;
  transform: scaleX(-1);
}

.uk-footer__deco img {
  width: 100%;
  height: auto;
  display: block;
}

.uk-footer__inner {
  position: relative;
  z-index: 2;
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}

.uk-footer__quote {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-size: 17px;
  color: #1d3350;
  letter-spacing: 0.08em;
  margin: 0;
  font-weight: 500;
}

.uk-footer__tagline {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-style: italic;
  font-size: 13px;
  color: #b85a48;
  margin: 6px 0 18px;
  letter-spacing: 0.02em;
}

.uk-footer__meta {
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-size: 11.5px;
  color: #6b7385;
  margin: 0;
  letter-spacing: 0.02em;
}

@media (max-width: 768px) {
  .uk-footer__deco {
    width: 160px;
    opacity: 0.55;
  }
  .uk-footer__quote {
    font-size: 19px;
  }
}
</style>
