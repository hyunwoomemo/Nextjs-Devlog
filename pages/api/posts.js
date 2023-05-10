import { POST_DATABASE_ID, TOKEN } from "@/config";

export default async function handler(req, res) {
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
  try {


    const response = await fetch(`https://api.notion.com/v1/databases/${POST_DATABASE_ID}/query`, options);

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message })
  }
}