import Layout from "@/components/Layout";
import ProjectList from "@/components/projects/ProjectList";
import { TOKEN, PROJECT_DATABASE_ID, POST_DATABASE_ID } from "@/config";
import styled from "@emotion/styled";

const index = ({ projects }) => {
  return (
    <Layout headerTitle="Projects">
      <Title>진행한 프로젝트</Title>
      <ProjectList data={projects} />
    </Layout>
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
