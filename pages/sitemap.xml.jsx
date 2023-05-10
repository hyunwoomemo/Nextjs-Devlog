import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const res = await fetch("https://hyunwoomemo.vercel.app/api/posts");
  const posts = await res.json();

  const fields = posts.map((post) => ({
    loc: `https://hyunwoomemo.vercel.app/blog/posts/${post.id}`,
    lastmod: post.updatedAt,
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function SiteMap() {
  // 페이지 내용 없음
  return null;
}
