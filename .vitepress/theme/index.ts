import DefaultTheme from "vitepress/theme";
import MyLayout from "./components/MyLayout.vue";
import RecentArticles from "./components/RecentArticles.vue";
import CustomHero from "./components/CustomHero.vue";
import BlogHome from "./components/BlogHome.vue";
import TagsPage from "./components/TagsPage.vue";
import AboutPage from "./components/AboutPage.vue";
import ArticleMeta from "./components/ArticleMeta.vue";
import SubscribeBar from "./components/SubscribeBar.vue";
import ArticleHeader from "./components/EpisodeHeader.vue";
import Archives from "./components/Archives.vue";
import Tags from "./components/Tags.vue";
import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";
import "@shikijs/vitepress-twoslash/style.css";
import type { EnhanceAppContext } from "vitepress";

import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component("RecentArticles", RecentArticles);
    app.component("BlogHome", BlogHome);
    app.component("CustomHero", CustomHero);
    app.component("TagsPage", TagsPage);
    app.component("AboutPage", AboutPage);
    app.component("ArticleMeta", ArticleMeta);
    app.component("SubscribeBar", SubscribeBar);
    app.component("ArticleHeader", ArticleHeader);
    app.component("Archives", Archives);
    app.component("Tags", Tags);
    app.use(TwoslashFloatingVue);
  },
};
