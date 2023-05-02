import { TOKEN } from "@/config";
import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect } from "react";
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
  console.log(selectedData);
  console.log(selectedData[0].properties.serviceImg.files);

  useEffect(() => {
    if (typeof window !== "object") return;

    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <Container onClick={() => cancel()}></Container>
      <Base>
        <ImageWrapper>
          {selectedData[0].properties?.serviceImg?.files.map((item, i) => {
            return <ImageItem key={i} src={item.file.url} width={300} height={300}></ImageItem>;
          })}
        </ImageWrapper>
      </Base>
      ;
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
  width: 80%;
  height: 50%;
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  border-radius: 15px;
  overflow-x: hidden;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ImageItem = styled(Image)`
  width: 100%;
`;

export default AboutProjectItem;
