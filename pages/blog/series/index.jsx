import SeriesItem from "@/components/blog/SeriesItem";
import Layout from "@/components/common/Layout";
import { POST_DATABASE_ID, TOKEN } from "@/config";
import { NextSeo } from "next-seo";

const index = ({ series }) => {
  console.log(series);
  return (
    <>
      <NextSeo
        title="Posts | Hyunwoomemo"
        description="프론트엔드 개발자의 기술 블로그, 다양한 주제의 글로 새로운 지식을 기록합니다."
        openGraph={{
          type: "website",
          url: "https://hyunwoomemo.vercel.app/",
          title: "Hyunwoomemo's Devlog",
          description: "프론트엔드 개발자의 기술 블로그, 다양한 주제의 글로 새로운 지식을 기록합니다.",
          images: [
            {
              url: "https://user-images.githubusercontent.com/105469077/234896480-32d59948-f5fb-4232-823b-38bb12bb34d6.png",
              width: 800,
              height: 400,
            },
          ],
        }}
      />
      <Layout headerTitle="Series">
        <SeriesItem series={series} />
      </Layout>
    </>
  );
};

export default index;

export async function getStaticProps() {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      sorts: [
        {
          property: "createdDate",
          direction: "descending",
        },
      ],

      page_size: 100,
    }),
  };

  const res = await fetch(`https://api.notion.com/v1/databases/${POST_DATABASE_ID}/query`, options);

  const data = await res.json();

  const posts = data.results;

  const series = posts.filter((v) => v.properties.시리즈?.select?.name);

  return {
    props: {
      series,
    },
  };
}
