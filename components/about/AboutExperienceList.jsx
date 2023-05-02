import styled from "@emotion/styled";
import dayjs from "dayjs";

// Experience 날짜
const date = (start, end) => {
  const startDate = dayjs(new Date(start));
  const endDate = dayjs(new Date(end));

  if (startDate.format("YYYY-MM") === endDate.format("YYYY-MM")) {
    return `${startDate.format("YYYY-MM-DD")} ~ ${endDate.format("YYYY-MM-DD")}`;
  } else {
    return `${startDate.format("YYYY-MM")} ~ ${endDate.format("YYYY-MM")}`;
  }
};

const getKeywords = (data) => {
  return (
    <KeywordsWrapper>
      {data.map((v, i) => {
        return <Keywords key={i}>{v.name}</Keywords>;
      })}
    </KeywordsWrapper>
  );
};

const AboutExperienceList = ({ data }) => {
  console.log(data);
  return (
    <Base>
      <ExperienceWrapper>
        {data.map((v) => {
          const title = v.properties.이름.title[0].plain_text;
          const start = v.properties.날짜.date.start;
          const end = v.properties.날짜.date.end;
          const team = v.properties.팀.rich_text[0].plain_text;
          const description = v.properties.직무.rich_text[0].plain_text;
          const keywords = v.properties.keywords.multi_select;
          const position = v.properties.직급?.rich_text[0]?.plain_text;
          return (
            <ExperienceItem key={v.id}>
              <Title>{title}</Title>
              <DateItem>{`${date(start, end)} / ${team} ${position ? `/ ${position}` : ""}`}</DateItem>
              <Description>{description}</Description>
              {getKeywords(keywords)}
            </ExperienceItem>
          );
        })}
      </ExperienceWrapper>
    </Base>
  );
};

const Base = styled.div`
  padding: 1rem;
`;

const ExperienceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ExperienceItem = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  font-size: 18px;
  line-height: 24px;
  word-break: keep-all;

  /* &::first-letter {
    color: var(--primary-color);
    font-weight: bold;
    font-size: 24px;
  } */
`;

const Description = styled.div`
  line-height: 18px;
  padding: 1rem 0;
`;

const Team = styled.div``;

const DateItem = styled.div`
  word-wrap: normal;
  width: 100%;
  color: gray;
  font-size: 14px;
`;

const KeywordsWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: auto;
`;

const Keywords = styled.div`
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 5px;
  color: #ffffff;
  white-space: nowrap;
  background-color: gray;

  @media (max-width: 768px) {
  }
`;

export default AboutExperienceList;
