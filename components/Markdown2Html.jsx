import React from "react";
import styled from "@emotion/styled";

const Markdown2Html = ({ html }) => {
  return <Base dangerouslySetInnerHTML={{ __html: html }}></Base>;
};

const Base = styled.div`
  .code-lang-tag {
    position: absolute;
    top: 1rem;
    left: 1rem;
    border-radius: 5px;
    padding: 5px;
    background-color: #9f9f9f;
    color: #fff;
  }

  .code-copy-block {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 30px;
    height: 30px;
    cursor: pointer;
    /* background-image: url("https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1580049395/noticon/mpvpeudrt9udql1rtjav.jpg");
    background-position: center center;
    background-size: cover; */

    &:after {
      content: "Copy";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
    }

    &:hover:after {
      color: yellowgreen;
    }
  }

  pre {
    padding-top: 4rem;
  }

  padding: 2rem;
  p {
    padding: 3px 0;
  }

  // Adjust Heading Element Style
  h1,
  h2,
  h3 {
    font-weight: 800;
    margin-bottom: 30px;
  }

  * + h1,
  * + h2,
  * + h3 {
    margin-top: 80px;
  }

  hr + h1,
  hr + h2,
  hr + h3 {
    margin-top: 0;
  }

  h1 {
    font-size: 30px;
  }

  h2 {
    font-size: 25px;
  }

  h3 {
    font-size: 20px;
  }

  // Adjust Quotation Element Style
  blockquote {
    margin: 30px 0;
    padding: 0 15px;
    font-weight: 800;
    border-left: 3px solid var(--basic-text-color);
  }

  // Adjust List Element Style
  ol,
  ul {
    margin-left: 20px;
    padding: 30px 0;
    list-style: unset;
  }

  // Adjust Horizontal Rule style
  hr {
    border: 1px solid #000000;
    margin: 100px 0;
  }

  // Adjust Link Element Style
  a {
    color: #4263eb;
    text-decoration: underline;
  }

  // Adjust Code Style
  /* pre[class*="language-"] {
    margin: 30px 0;
    padding: 15px;
    font-size: 15px;

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.5);
      border-radius: 3px;
    }
  } */

  strong {
    color: tomato;
  }

  /* code[class*="language-"],
  pre[class*="language-"] {
    tab-size: 2;
  }

  code {
    padding: 3px 5px;
    background-color: var(--code-bgc);
    border-radius: 5px;
    font-weight: bold;
    font-family: "LINESeedKR-Bd";
  } */

  img {
    border-radius: 15px;
    max-width: 904px;
    width: 100%;
  }

  details {
    border-radius: 10px;
    margin: 2rem 0;
    /*     color: #fff; */

    &[open] {
      summary {
        background-color: #c45c4a;

        &:after {
          content: "Click 🔼";
        }
      }
    }
  }

  summary {
    background-color: #4c61b6;
    padding: 10px 6px;
    border-radius: 10px;
    position: relative;
    display: flex;
    align-items: center;
    color: #fff;

    cursor: pointer;
    &::marker {
      color: transparent;
    }

    &:before {
      content: "📝 ";
    }

    &:hover:after {
      opacity: 1;
    }

    &:after {
      transition: all 0.3s;
      content: "Click 🔽";
      position: absolute;
      right: 10px;
      opacity: 0;
    }
  }

  hr {
    border-color: var(--basic-text-color);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 60px 20px;
    line-height: 1.6;
    font-size: 14px;

    h1 {
      font-size: 23px;
    }

    h2 {
      font-size: 20px;
    }

    h3 {
      font-size: 17px;
    }

    img {
      width: 100%;
    }

    hr {
      margin: 50px 0;
    }
  }

  table {
    margin: 1rem 0;
    background-color: var(--table-bgc);

    th {
      background-color: var(--th-bgc);
      font-weight: bold;
      color: var(--table-th-color);
    }
    td {
      background-color: var(--td-bgc);
      text-align: center;
      color: var(--table-td-color);
    }
  }
`;

export default Markdown2Html;
