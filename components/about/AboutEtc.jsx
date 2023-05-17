import styled from "@emotion/styled";

const AboutEtc = ({ data }) => {
  return (
    <Base>
      <EtcWrapper>
        {data.map((v) => {
          const contents = v.properties.이름.title.map((v1) => [v1.plain_text]);
          return <EtcItem key={v.id}>{contents}</EtcItem>;
        })}
      </EtcWrapper>
    </Base>
  );
};

const Base = styled.div``;

const EtcWrapper = styled.ul`
  padding: 1rem;
`;

const EtcItem = styled.li`
  list-style: disc;
  padding: 10px 0;
`;

export default AboutEtc;
