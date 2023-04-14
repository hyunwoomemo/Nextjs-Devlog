import React from "react";
import styled from "@emotion/styled";

const Markdown2Html = ({ html }) => {
  return (
    <>
      <Base dangerouslySetInnerHTML={{ __html: html }}></Base>
    </>
  );
};

const Base = styled.div`
  padding: 2rem;
  color: var(--post-text);

  .code-lang-tag {
    position: absolute;
    top: 5px;
    left: 10px;
    font-size: 14px;
    color: #fff;
  }

  .code-copy-block {
    position: absolute;
    top: 0;
    right: 1rem;
    width: 30px;
    height: 30px;

    cursor: pointer;

    &:after {
      content: "copy";
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

  p > code {
    padding: 3px 5px;
    background-color: var(--code-bgc);
    color: var(--code-text);
    border-radius: 5px;
  }

  pre {
    padding-top: 4rem;
    position: relative;
    white-space: pre-wrap;

    &:after {
      position: absolute;
      content: "";
      height: 30px;
      top: 0;

      left: 0;
      width: 100%;
      background-color: #525252;
    }
  }

  p {
    padding: 10px 0;
    line-height: 40px;
    font-size: 18px;
  }

  // Adjust Heading Element Style
  h1,
  h2,
  h3 {
    font-weight: 800;
    margin-bottom: 30px;
    text-shadow: 1px 1px 1px #b2b2b2;
  }

  * + h1,
  * + h2,
  * + h3 {
    margin-top: 50px;
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
    font-weight: 800;
    background-color: var(--blockquote-bgc);
    padding: 1rem;
    border-radius: 5px;
  }

  // Adjust List Element Style
  ol,
  ul {
    margin-left: 20px;
    padding: 30px 0;
    list-style: unset;
  }

  li {
    line-height: 30px;
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

  strong {
  }

  img {
    border-radius: 15px;
    max-width: 904px;
    width: 100%;
  }

  details {
    border-radius: 10px;
    margin: 2rem 0;

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
