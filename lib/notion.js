const fs = require('fs');
const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");

async function awesomeFunction() {
  const token = 'secret_mBan6g6aSZcNPk2r54gwYutTE8QgoxC7mJTC7zcGNXk'
  console.log(token)

  const notion = new Client({
    auth: token,
    notionVersion: '2022-06-28'
  });

  const n2m = new NotionToMarkdown({ notionClient: notion });

  (async () => {
    const mdblocks = await n2m.pageToMarkdown("bdc01b60-28cb-429c-a521-ca65d806ba1c");
    const mdString = n2m.toMarkdownString(mdblocks);

    //writing to file
    fs.writeFile("test.md", mdString, (err) => {
    });
  })();

  // 이후 notion 객체를 활용해서 api를 사용합시다.
  const databaseId = '09707d503c6c481bb94a98d60e3abaac';
  const dbObjects = await notion.databases.retrieve({ database_id: databaseId });
  const dbQueryData = await notion.databases.query({ database_id: databaseId });
  const blockId = databaseId; // page_id, database_id, block object의 id 다 가능합니다.
  const pageId = databaseId;
  // # 1. child_page에 해당하는 block 데이터를 가져옵니다. has_children은 true입니다.
  const blockData = await notion.blocks.retrieve({ block_id: pageId });
  /*   // # 2. child_page의 children list를 가져옵니다.
    // [child database block(정책 DB), paragraph block(텍스트입니다)]를 results로 받습니다.
    const blockChildData = await notion.blocks.children.list({ block_id: pageId });
    // # 3. paragraph의 children paragraph block을 가져옵니다.
    // [paragraph block(들여쓰기 한 텍스트입니다.)]를 results로 받습니다.
    const blockChild2DepthData = await notion.blocks.children.list({
      block_id: blockChildData?.results[1]?.id,
    }); */
  console.log(dbQueryData)
}


awesomeFunction()