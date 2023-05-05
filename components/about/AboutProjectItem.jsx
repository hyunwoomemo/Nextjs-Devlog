import { TOKEN } from "@/config";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const getImg = (data) => {
  data[0].properties?.serviceImg?.files.map((item, i) => {
    return <ImageItem key={i} src={item.file.url} width={300} height={300}></ImageItem>;
  });
};

const AboutProjectItem = ({ cancel, data }) => {
  const { projectId } = useSelector((state) => state.AboutSlice);
  console.log(projectId);
  const selectedData = data.results.filter((v) => v.id === projectId);
  const imgLength = selectedData[0].properties.serviceImg.files.length;
  console.log(selectedData);
  console.log(selectedData[0].properties.serviceImg.files);

  useEffect(() => {
    if (typeof window !== "object") return;

    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const [number, setNumber] = useState(0);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const title = selectedData[0].properties.serviceImg.files[number].name;

  useEffect(() => {
    if (typeof window !== "object") return;

    setWrapperWidth(document.querySelector("#wrapper").clientWidth);
    console.log(wrapperWidth);
  });

  const handleLeft = () => {
    if (number !== 0) {
      setNumber((prev) => prev - 1);
    }
  };

  const handleRight = () => {
    if (number !== imgLength - 1) {
      setNumber((prev) => prev + 1);
    }
  };

  return (
    <>
      <Container onClick={() => cancel()}></Container>
      <Base>
        <Header>{`${number + 1} / ${imgLength}`}</Header>
        <ImageWrapper number={number} id="wrapper" wrapperWidth={wrapperWidth}>
          {selectedData[0].properties?.serviceImg?.files.map((item, i) => {
            return (
              <Box key={i}>
                <ImageItem src={item.file.url} width={500} height={700}></ImageItem>
              </Box>
            );
          })}
        </ImageWrapper>
        <Footer>
          <LeftArrow onClick={handleLeft}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </LeftArrow>
          {title.slice(0, title.indexOf("."))}
          <RightArrow onClick={handleRight}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </RightArrow>
        </Footer>
      </Base>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #808080b0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Base = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 1100px;
  width: 300px;
  @media (min-width: 768px) {
    width: 360px;
  }
  height: 70%;
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  border-radius: 15px;
  overflow-x: hidden;
  flex-wrap: wrap;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  transition: all 0.3s;

  ${({ number, wrapperWidth }) =>
    number && wrapperWidth
      ? css`
          transform: translateX(-${number * wrapperWidth}px);
        `
      : css``}
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
`;

const ImageItem = styled(Image)`
  width: 360px;
  height: 360px;

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
`;

const LeftArrow = styled.div`
  width: 30px;
  height: 30px;
  bottom: 15px;
  left: 15px;
  z-index: 999;
`;

const RightArrow = styled.div`
  width: 30px;
  height: 30px;
  right: 15px;
  bottom: 15px;
  z-index: 999;
`;

export default AboutProjectItem;
