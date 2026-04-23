import { getPosts, getPostLength, getFeatured, getHotTags, getArchive } from "./theme/serverUtils";
import { buildBlogRSS } from "./theme/rss";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import mathjax3 from "markdown-it-mathjax3";

async function config() {
  const posts = await getPosts();
  return {
    lang: "en-US",
    title: "Tempur.ai",
    description: "2 Cents of tempurai",
    head: [
      [
        "link",
        {
          rel: "icon",
          type: "image/svg",
          href: "/horse.svg",
        },
      ],
      [
        "meta",
        {
          name: "author",
          content: "Tempurai",
        },
      ],
      [
        "meta",
        {
          property: "og:title",
          content: "Home",
        },
      ],
      [
        "meta",
        {
          property: "og:description",
          content: "2 Cents of tempurai",
        },
      ],
    ],
    // cleanUrls: "with-subfolders",
    lastUpdated: false,
    themeConfig: {
      // repo: "clark-cui/homeSite",
      logo: "/horse.svg",
      avator: "/avator.png",
      search: {
        provider: "local",
      },
      docsDir: "/",
      // docsBranch: "master",
      posts,
      featured: getFeatured(posts, 4),
      hotTags: getHotTags(posts, 12),
      archive: getArchive(posts),
      pageSize: 5,
      postLength: await getPostLength(),
      outline: [2, 3],
      outlineTitle: "文章目录",
      nav: [
        {
          text: "Blog",
          link: "/",
        },
        {
          text: "Tags",
          link: "/tags",
        },
        {
          text: "About",
          link: "/about",
        },
        {
          text: "RSS",
          link: "https://2cents.tempur.ai/feed.xml",
        },
      ],
      socialLinks: [
        { icon: "github", link: "https://github.com/tempurai" },
        { icon: "twitter", link: "https://twitter.com/tempur_ai" },
      ],
      aside: true,
      // blogs page show firewokrs animation
      showFireworksAnimation: false,
    },
    buildEnd: buildBlogRSS,
    markdown: {
      theme: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
      codeTransformers: [transformerTwoslash()],
      config: (md: any) => {
        md.use(mathjax3);
      },
    },
    // vite: {
    //   ssr: {
    //     noExternal: ["vitepress-plugin-twoslash"],
    //   },
    // },
  };
}
export default config();
