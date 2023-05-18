import React, { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { css } from "@emotion/css";

const Overlay = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dim = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--dim-background);
  backdrop-filter: blur(2px);
`;

const Container = styled.div`
  position: absolute;
  width: 50vw;
  background-color: var(--main-background);
  padding: 2rem;
  height: 50%;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  /*   ${({ position }) =>
    position == "right"
      ? css`
          right: 0;
          height: 100%;
        `
      : css`
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 50%;
        `} */
`;

const Modal = ({ children, onClose, isOpen, selector = "#portal", position }) => {
  const [isCSR, setIsCSR] = useState(false);

  useEffect(() => {
    setIsCSR(true);
  }, []);

  const Portal = (props) => {
    if (typeof window !== "undefined" && isCSR) {
      return createPortal(props?.children, document?.getElementById("portal"));
    }
  };

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <Portal selector={selector}>
        <Overlay>
          <Dim onClick={onClose} />
          <Container
            className="container"
            style={{
              right: position === "right" ? 0 : undefined,
              height: position === "right" ? "100%" : "30%",
              top: position === "center" ? "50%" : undefined,
              left: position === "center" ? "50%" : undefined,
              transform: position === "center" ? "translate(-50%, -50%)" : undefined,
              width: position === "center" ? "80%" : undefined,
            }}
          >
            {children}
          </Container>
        </Overlay>
      </Portal>
    </CSSTransition>
  );
};

export default Modal;
