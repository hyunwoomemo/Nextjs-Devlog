import styled from "@emotion/styled";
import dayjs from "dayjs";
import Link from "next/link";

const SeriesItem = ({ series }) => {
  const seriesList = series.map((v) => v.properties.시리즈?.select?.name).filter((v1, i, arr) => arr.indexOf(v1) === i);
  const arr = series.reduce((acc, cur) => {
    acc[cur.properties.시리즈?.select?.name] = (acc[cur.properties.시리즈?.select?.name] || 0) + 1;
    return acc;
  }, {});

  const date = console.log(arr);

  return (
    <Base>
      {seriesList.map((v, i) => {
        const length = arr[v];
        const lastUpdateDate = series
          .filter((v1) => v1.properties.시리즈?.select?.name === v)
          .map((v2) => v2.last_edited_time)
          .sort((a, b) => new Date(b) - new Date(a))[0];
        console.log(lastUpdateDate);
        return (
          <Item key={i} href={`/blog/series/${v}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <Contents>
              <Title>{v}</Title>
              <ItemFooter>
                <Length>{length}개의 포스트</Length>
                <Update>마지막 업데이트: {dayjs(new Date(lastUpdateDate)).format("YYYY-MM-DD")}</Update>
              </ItemFooter>
            </Contents>
          </Item>
        );
      })}
    </Base>
  );
};

const Base = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Item = styled(Link)`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--toc-bgc);
  border-radius: 5px;
  width: 100%;

  @media (min-width: 769px) {
    padding: 2rem;
  }

  > svg {
    width: 50px;
  }
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 16px;

  @media (min-width: 769px) {
    font-size: 18px;
  }
`;

const ItemFooter = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 14px;

  @media (min-width: 769px) {
    font-size: 16px;
  }
  color: gray;
`;

const Length = styled.div``;

const Update = styled.div``;

export default SeriesItem;
