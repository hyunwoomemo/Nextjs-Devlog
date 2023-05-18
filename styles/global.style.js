import { createGlobalStyle } from 'styled-components';

export const SSRGlobalStyle = createGlobalStyle`
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
      --primary-color: #f1c959;
      --main-text-color: #fff;
      --text-color: #ababab;
      --main-background: #232323;
      --footer-background: #2a2a2a;
      --dim-background: rgba(255, 255, 255, 0.2);
      --project-item-background: #272626;
      --tag-background: #2a2a2a;
      --code-bgc: #2b2b2b;
      --code-text: tomato;
      --blockquote-bgc: #272825;
      --post-text: #e7e7e7;
      --toc-title-bgc: #0a0c0d;
      --toc-bgc: #1d2125;
      --categoryItem-bgc: #1d2125;
      --purple-color: #7c7cff;
      --choiceCategory-bgc: #1d2125;
      --project-post-bgc: #262626;
      --border-bottom-color: rgba(255, 255, 255, 0.2);
      --post-bgc: #2b2b2b95;
      --about-bgc: #1b1b1b;
      --about-color: #fff;
      --box-bgc: #363636;
    }
    body[data-theme="light"] {
      --primary-color: #347cc4;
      --main-text-color: #000;
      --text-color: #212529;
      --main-background: #f3f3f3;
      --footer-background: #f2f2f2;
      --dim-background: rgba(0, 0, 0, 0.5);
      --project-item-background: #ececec;
      --tag-background: #f2f2f2;
      --code-bgc: #ececec;
      --code-text: tomato;
      --blockquote-bgc: #dddddd;
      --post-text: #111111;
      --toc-title-bgc: #cacaca;
      --toc-bgc: #eeeeee;
      --categoryItem-bgc: #eee;
      --purple-color: #7c7cff;
      --choiceCategory-bgc: #fff;
      --project-post-bgc: #ffffff;
      --border-bottom-color: rgba(0, 0, 0, 0.2);
      --post-bgc: #f4f4f4;
      --about-bgc: #fff;
      --about-color: #000;
      --box-bgc: #dddddd;
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
  body {
    width: 100%;
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

  body {
    font-family: "Jua", sans-serif;
    background-color: var(--main-background);
    -webkit-font-smoothing: antialiased;
    overflow-x: auto;
    color: var(--text-color);
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }

    * {
      box-sizing: border-box;
      outline: none;
    }

    opacity: 0;
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

  svg {
    width: 30px;
    height: 30px;
  }
`