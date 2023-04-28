import Layout from "@/components/common/Layout";
import ProjectList from "@/components/projects/ProjectList";
import { TOKEN, PROJECT_DATABASE_ID, POST_DATABASE_ID } from "@/config";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";

const index = ({ projects }) => {
  return (
    <>
      <NextSeo
        title="Project | Hyunwoomemo"
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
      <Layout headerTitle="Projects">
        <Title>진행한 프로젝트</Title>
        <ProjectList data={projects} />
      </Layout>
    </>
  );
};

export default index;

const Title = styled.h1`
  padding: 2rem;
`;

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
          property: "Name",
          direction: "ascending",
        },
      ],
      page_size: 100,
    }),
  };

  const res = await fetch(`https://api.notion.com/v1/databases/${PROJECT_DATABASE_ID}/query`, options);

  const projects = await res.json();

  return {
    props: { projects },
  };
}
