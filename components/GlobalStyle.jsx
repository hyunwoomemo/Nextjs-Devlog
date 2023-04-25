import React, { useContext } from "react";
import { Global, css } from "@emotion/react";

const defaultStyle = css`
  @font-face {
    font-family: "TheJamsil5Bold";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2") format("woff2");
    font-weight: 700;
    font-style: normal;
  }

  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

  :root {
    body {
      --text-color: #000;
      --main-background: #f9f9f9;
      --footer-background: #e6e5e5;
      --dim-background: rgba(0, 0, 0, 0.5);
      --project-item-background: #ececec;
      --tag-background: #ddddd1;
      --code-bgc: #ececec;
      --code-text: tomato;
      --blockquote-bgc: #dddddd;
      --post-text: #111111;
      --toc-title-bgc: #cacaca;
      --toc-bgc: #eeeeee;
      --categoryItem-bgc: #eee;
      --purple-color: #7c7cff;
      --choiceCategory-bgc: #fff;
      --project-post-bgc: #eeeeee;
    }
    body[data-theme="dark"] {
      --text-color: #f9f9f9;
      --main-background: #1b1b1b;
      --footer-background: #16202b;
      --dim-background: rgba(255, 255, 255, 0.2);
      --project-item-background: #272626;
      --tag-background: #585853;
      --code-bgc: #2b2b2b;
      --code-text: tomato;
      --blockquote-bgc: #1a1b17;
      --post-text: #e7e7e7;
      --toc-title-bgc: #0a0c0d;
      --toc-bgc: #1d2125;
      --categoryItem-bgc: #1d2125;
      --purple-color: #7c7cff;
      --choiceCategory-bgc: #1d2125;
      --project-post-bgc: #262626;
    }
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html,
  body,
  #___gatsby,
  #gatsby-focus-wrapper {
    min-height: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
      -webkit-appearance: none;
      width: 0;
      height: 0;
    }
  }

  /* *,
  html {
    scroll-behavior: smooth !important;
  } */

  body {
    font-family: "TheJamsil5Bold", Apple SD Gothic Neo, Roboto, Arial Helvetica, sans-serif;
    background-color: var(--main-background);
    -webkit-font-smoothing: antialiased;
    overflow-x: auto;
    color: var(--text-color);

    * {
      box-sizing: border-box;
      outline: none;
    }
  }

  * {
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  :lang(ko) {
    word-break: keep-all;
  }

  ul,
  ol,
  li,
  dl,
  dt,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hgroup,
  p,
  blockquote,
  figure,
  form,
  fieldset,
  input,
  legend,
  pre,
  abbr,
  button {
    margin: 0;
    padding: 0;
  }

  h1 a,
  li a {
    text-decoration: none;
  }

  a {
    color: var(--basic-text-color);
    text-decoration: none;
  }
`;

const GlobalStyle = function () {
  return <Global styles={defaultStyle} />;
};

export default GlobalStyle;
