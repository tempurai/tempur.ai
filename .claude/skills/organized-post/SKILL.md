---
name: organized-post
description: Use when writing a new blog post for the tempur.ai site. Establishes the minimal frontmatter contract and the auto-generation pipeline so authors don't hand-wire covers, featured lists, tag counts, or archive groupings.
---

# Organized Post — tempur.ai writing convention

This blog is a VitePress site with a custom theme. **All UI sections except the post body are auto-populated from posts' frontmatter** — you do not manually edit `BlogHome.vue` / `TagsPage.vue` / sidebars to add a post. Write the markdown, save, and the whole site updates.

## Where posts go

- All posts live in **`/posts/`** at repo root.
- Filename convention: `ep<NNN>-<slug>.md` (e.g. `ep005-why-we-ship-ugly.md`). The `ep` prefix + number keeps chronological sorting intuitive even when dates collide.
- Do NOT put posts anywhere else. `serverUtils.ts` only scans files matching `posts/`.

## Minimum required frontmatter

```yaml
---
title: 文章标题
date: 2026-04-24
tags: ["AI Agent", "架构"]
description: 一句话摘要，会出现在列表和精选卡片里。
---
```

That's it. Four fields: `title`, `date`, `tags`, `description`. Everything else is optional.

## Body template

```markdown
---
title: ...
date: ...
tags: [...]
description: ...
---

<ArticleHeader />

正文第一段……

## 一级章节

内容……

## 另一章节

> 引用句会自动套上赤陶左边框。

- 列表也可以用。
```

`<ArticleHeader />` is a global component that renders the title, meta row (date / tags / read time), and a short accent line. **Do not write an `# h1 heading`** — the component handles it.

## Optional frontmatter fields

### `cover: /images/thumbs/xxx.png`
- **If omitted**: the build auto-assigns a cover from the 40-image pool at `public/images/thumbs/new-01.png … new-40.png` using a stable hash of the post's path, with deconfliction against covers already claimed by other posts. Same post always gets the same cover across rebuilds.
- **When to set it manually**: only when you have a strong semantic match in mind. Omit by default — the pool is curated to match the site's ink-wash aesthetic.
- Explicit covers always win over auto-assignment.

### `featured: true`
- Adds the post to the 精选文章 sidebar card grid (up to 4).
- **No fallback**: if zero posts have `featured: true`, the entire 精选文章 section hides. There is no "show 4 most recent if nothing is featured" logic.
- Mark 2–4 posts as featured at any given time. Rotate as new work lands.

### `excerpt: ...`
- Only needed if you want something different from `description` on the list cards. 99% of the time just use `description`.

## What gets auto-generated (do not hardcode these)

| UI element | Source | File |
|---|---|---|
| 最新文章 list | First 3 posts sorted by `date` desc | `BlogHome.vue` reads `theme.posts` |
| 精选文章 sidebar | Posts with `featured: true` | `BlogHome.vue` reads `theme.featured` |
| 热门标签 cloud | Tag frequency across all posts, desc | `BlogHome.vue` reads `theme.hotTags` |
| 归档 | `YYYY · M月` grouped counts | `BlogHome.vue` reads `theme.archive` |
| Tags page article list | All posts filtered by selected tag | `TagsPage.vue` reads `theme.posts` |
| Tags page tag directory | Same as hotTags (full list, not just 12) | `TagsPage.vue` reads `theme.hotTags` |
| Cover image on every card | `frontMatter.cover` (auto-filled if missing) | built in `serverUtils.getPosts()` |
| RSS feed | All posts | `theme/rss.ts` |

**If you find yourself opening `BlogHome.vue` or `TagsPage.vue` to add a post — STOP.** Add frontmatter instead.

## Pipeline internals (for debugging)

1. `config.ts` (top-level) calls `getPosts()` → reads all `posts/**.md`, parses frontmatter via `gray-matter`, sorts by date, deconflicts auto-covers.
2. Derived helpers (`getFeatured`, `getHotTags`, `getArchive`) run against the posts list.
3. Results are attached to `themeConfig` as `posts`, `featured`, `hotTags`, `archive`.
4. Vue components consume via `useData().theme.value.<key>`.

### Why the dev server sometimes shows stale data
`serverUtils.ts` is imported at the top of `config.ts`, and VitePress dev caches that module. Editing `serverUtils.ts` requires **restarting `npm run dev`** (Ctrl-C, rerun). Touching `config.ts` alone does NOT force a re-import of its cached dependencies. Editing frontmatter in a `.md` does require `touch .vitepress/config.ts` to re-read the posts list, but serverUtils logic changes still need a full restart.

Production (`npm run build`) is not affected — it always reads fresh.

## The 40-image cover pool

Located at `public/images/thumbs/new-01.png … new-40.png`. Curated ink-wash / Chinese classical illustrations matching the site aesthetic (literati scenes, armillary spheres, mountains, florals, immortals, oracle bones, etc.). Also retains older decorative pieces (`fuji-lake.png`, `bridge.png`, `camellia.png`, `lotus.png`, `lantern.png`, `plum-snow.png`, `bird-cherry.png`, `sparrows.png`) — these can still be referenced explicitly if needed.

When adding more images to the pool:
1. Drop PNGs into `public/images/thumbs/` following the `new-NN.png` pattern.
2. Update `NEW_COVER_COUNT` in `.vitepress/theme/serverUtils.ts` to the new total.
3. Restart `npm run dev`.

## Checklist when writing a new post

- [ ] File at `/posts/ep<NNN>-<slug>.md`
- [ ] Frontmatter has `title`, `date` (ISO `YYYY-MM-DD`), `tags` (array), `description` (one sentence)
- [ ] `<ArticleHeader />` component is the first thing after the frontmatter fence
- [ ] Body uses `##` for sections (not `#` — the title comes from frontmatter via the header component)
- [ ] If the post is a current highlight: add `featured: true`
- [ ] If a cover from the pool feels wrong: set `cover: /images/thumbs/xxx.png` explicitly
- [ ] Run `npm run dev` and verify the post appears on `/` (最新文章), `/tags?tag=<one-of-its-tags>`, and renders correctly at its URL
