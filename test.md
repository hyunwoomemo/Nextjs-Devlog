
# 우리아가 프로젝트입니다.


## PWA로 만든 육아 기록 웹앱입니다.


```javascript
import React, { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

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
`;

const Container = styled.div`
  position: absolute;
  width: 50vw;
  height: 100%;
  background-color: var(--main-background);
  right: 0;
  padding: 2rem;
`;

const Modal = ({ children, onClose, isOpen, selector = "#portal" }) => {
  const [isCSR, setIsCSR] = useState(false);

  useEffect(() => {
    setIsCSR(true);
  }, []);

  const Portal = (props) => {
    if (typeof window === "object" && isCSR) {
      return createPortal(props.children, document?.getElementById("portal"));
    }
  };

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <Portal selector={selector}>
        <Overlay>
          <Dim onClick={onClose} />
          <Container className="container">{children}</Container>
        </Overlay>
      </Portal>
    </CSSTransition>
  );
};

export default Modal;
```

