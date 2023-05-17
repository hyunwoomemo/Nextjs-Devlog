import { changeStatus } from "@/slices/ProjectSlice";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProjectListHeader = () => {
  const { displayStatus } = useSelector((state) => state.ProjectSlice);
  const dispatch = useDispatch();

  const [active, setActive] = useState(1);

  const status = [
    {
      text: "all",
    },
    {
      text: "not started",
    },
    {
      text: "in progress",
    },
    {
      text: "done",
    },
  ];

  const handleStatus = (e, i) => {
    const text = e.target.innerText;
    setActive(i + 1);
    dispatch(changeStatus(text));
  };

  // 언마운트시 displayStatus 값을 초기화
  useEffect(() => {
    return () => {
      dispatch(changeStatus("all"));
    };
  }, [dispatch]);

  return (
    <Base>
      <StatusWrapper id="container" active={active}>
        {status.map((v, i) => {
          return (
            <StatusItem key={i} onClick={(e) => handleStatus(e, i)}>
              {v.text}
            </StatusItem>
          );
        })}
      </StatusWrapper>
    </Base>
  );
};

const Base = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const StatusWrapper = styled.div`
  display: flex;
  gap: 1rem;

  ${({ active }) =>
    active
      ? css`
          div:nth-of-type(${active}) {
            background-color: var(--primary-color);
            color: #fff;
          }
        `
      : css``}
`;

const StatusItem = styled.div`
  @media (max-width: 768px) {
    font-size: 14px;
  }
  padding: 7px 10px;
  border-radius: 5px;
`;

export default ProjectListHeader;
