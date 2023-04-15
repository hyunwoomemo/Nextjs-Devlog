import styled from "@emotion/styled";
import Link from "next/link";
import React, { useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";

const Toc = ({ toc }) => {
  return (
    <Base>
      <TocTitle>✍🏻 Table Of Contents</TocTitle>
      <TocWrapper>
        {toc.json.map((t) => {
          return (
            <ScrollLink smooth={true} offset={-70} duration={500} to={`${t.slug}`} key={t.i} style={{ paddingLeft: t.lvl === 1 ? 0 : t.lvl * 10 }}>
              {t.content}
            </ScrollLink>
          );
        })}
      </TocWrapper>
    </Base>
  );
};

const Base = styled.div`
  padding: 2rem;
`;

const TocTitle = styled.h1`
  font-size: 20px;
  padding: 1rem 2rem;
  background-color: var(--toc-title-bgc);
  border-radius: 5px 5px 0 0;
`;

const TocWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem;
  background-color: var(--toc-bgc);
  color: gray;
  border-radius: 0 0 5px 5px;
  font-size: 14px;
`;

export default Toc;
