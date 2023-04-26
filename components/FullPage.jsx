import styled from "@emotion/styled";

const FullPage = ({ children }) => {
  console.log(children);
  return (
    <Base>
      {children.map((child, idx) => {
        return <PageItem key={idx}>{child}</PageItem>;
      })}
    </Base>
  );
};

const Base = styled.div``;

const PageItem = styled.div`
  height: 100vh;
`;

export default FullPage;
