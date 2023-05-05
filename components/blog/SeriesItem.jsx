import styled from "@emotion/styled";
import dayjs from "dayjs";

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
          <Item key={i}>
            <Title>{v}</Title>
            <ItemFooter>
              <Length>{length}개의 포스트</Length>
              <Update>마지막 업데이트: {dayjs(new Date(lastUpdateDate)).format("YYYY-MM-DD")}</Update>
            </ItemFooter>
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

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--toc-bgc);
  border-radius: 5px;
  width: 100%;

  @media (min-width: 769px) {
    padding: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 16px;

  @media (min-width: 769px) {
    font-size: 18px;
  }
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 14px;

  @media (min-width: 769px) {
    font-size: 16px;
  }
  color: gray;
`;

const Length = styled.div``;

const Update = styled.div``;

export default SeriesItem;
