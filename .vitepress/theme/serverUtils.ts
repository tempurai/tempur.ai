import { globby } from 'globby';
import matter from "gray-matter";
import fs from "fs-extra";

const NEW_COVER_COUNT = 40;
const COVER_POOL_PREFIX = "/images/thumbs/new-";

function _stableHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

function _autoCover(regularPath: string): string {
  const idx = (_stableHash(regularPath) % NEW_COVER_COUNT) + 1;
  return `${COVER_POOL_PREFIX}${String(idx).padStart(2, "0")}.png`;
}

export async function getPosts() {
  const paths = await getPostMDFilePaths();
  const posts = await Promise.all(
    paths.map(async (item) => {
      const content = await fs.readFile(item, "utf-8");
      const { data } = matter(content);
      data.date = _convertDate(data.date);
      const regularPath = `/${item.replace(".md", ".html")}`;
      if (!Array.isArray(data.tags)) {
        data.tags = data.tags
          ? String(data.tags).split(",").map((t: string) => t.trim()).filter(Boolean)
          : [];
      }
      return {
        frontMatter: data,
        regularPath,
        _hasExplicitCover: !!data.cover,
      };
    })
  );
  posts.sort(_compareDate);

  // Deconflict auto-covers: never reuse a cover already assigned (explicit or auto).
  const used = new Set<string>(
    posts.filter((p) => p._hasExplicitCover).map((p) => p.frontMatter.cover as string)
  );
  for (const p of posts) {
    if (p._hasExplicitCover) continue;
    let idx = (_stableHash(p.regularPath) % NEW_COVER_COUNT) + 1;
    for (let attempt = 0; attempt < NEW_COVER_COUNT; attempt++) {
      const candidate = `${COVER_POOL_PREFIX}${String(idx).padStart(2, "0")}.png`;
      if (!used.has(candidate)) {
        p.frontMatter.cover = candidate;
        used.add(candidate);
        break;
      }
      idx = (idx % NEW_COVER_COUNT) + 1;
    }
  }

  return posts.map((p) => ({ frontMatter: p.frontMatter, regularPath: p.regularPath }));
}

// Only returns posts explicitly marked `featured: true`. No fallback — empty means no featured section renders.
export function getFeatured(posts: any[], limit = 4) {
  return posts.filter((p) => p.frontMatter.featured).slice(0, limit);
}

export function getHotTags(posts: any[], limit = 12) {
  const counts: Record<string, number> = {};
  for (const p of posts) {
    for (const t of p.frontMatter.tags || []) {
      counts[t] = (counts[t] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

export function getArchive(posts: any[]) {
  const groups: Record<string, number> = {};
  for (const p of posts) {
    const d = p.frontMatter.date;
    if (!d) continue;
    const [y, m] = d.split("-");
    const label = `${y} · ${parseInt(m)}月`;
    groups[label] = (groups[label] || 0) + 1;
  }
  return Object.entries(groups)
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([label, count]) => ({ label, count }));
}

function _convertDate(date = new Date().toString()) {
  const json_date = new Date(date).toJSON();
  return json_date.split("T")[0];
}

function _compareDate(obj1: any, obj2: any) {
  return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1;
}

async function getPostMDFilePaths() {
  const paths = await globby(["**.md"], {
    ignore: ["node_modules", "README.md"],
  });
  return paths.filter((item) => item.includes("posts/"));
}

export async function getPostLength() {
  return [...(await getPostMDFilePaths())].length;
}
