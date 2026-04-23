<template>
  <div class="subscribe-bar" role="group" aria-label="订阅渠道">
    <span class="subscribe-bar__label">Listen on</span>

    <a class="subscribe-chip" href="https://podcasts.apple.com" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path fill="currentColor" d="M12 2a10 10 0 0 0-1 19.95V19a2 2 0 0 1 1-1.73V17a1 1 0 1 1 0-2 1 1 0 1 1 0-2v-.27A2 2 0 0 1 11 11V8a1 1 0 0 1 2 0v3a2 2 0 0 1-1 1.73V13a1 1 0 1 1 0 2 1 1 0 1 1 0 2v.27a2 2 0 0 1 1 1.73v2.95A10 10 0 0 0 12 2z"/>
      </svg>
      Apple Podcasts
    </a>

    <a class="subscribe-chip" href="https://open.spotify.com" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.6"/>
        <path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M7 9.5c3-1 7-1 10 .6M7.5 12.8c2.4-.8 5.6-.7 8 .5M8 16c1.8-.6 4-.6 5.8.3"/>
      </svg>
      Spotify
    </a>

    <a class="subscribe-chip" href="https://www.xiaoyuzhoufm.com" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/>
        <path fill="currentColor" d="M10 8.5v7l6-3.5z"/>
      </svg>
      小宇宙
    </a>

    <a class="subscribe-chip" href="/feed.xml" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M5 19a14 14 0 0 1 14-14M5 13a8 8 0 0 1 8 8"/>
        <circle cx="6" cy="18" r="1.5" fill="currentColor"/>
      </svg>
      RSS
    </a>
  </div>
</template>
