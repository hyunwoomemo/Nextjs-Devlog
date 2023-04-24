import ThemeContext from "@/context/ThemeContext";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";

export default function Footer() {
  const router = useRouter();
  const { themeMode, setThemeMode } = useContext(ThemeContext);
  const [currentTheme, setCurrentTheme] = useState("");

  useEffect(() => {
    if (typeof window !== "object") return;
    setCurrentTheme(window.localStorage.getItem("theme"));
    document.body.dataset.theme = window.localStorage.getItem("theme");
  }, [themeMode]);

  const handleTheme = () => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
    window.localStorage.setItem("theme", window.localStorage.getItem("theme") === "dark" ? "light" : "dark");
    console.log("click");
  };
  return (
    <Base display={router.pathname === "/"}>
      <Wrapper className="mx-auto flex items-center sm:flex-row flex-col">
        <Link href="/" className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="ml-3 text-xl">Hyunwoomemo&apos;s Devlog</span>
        </Link>
        <ToggleBtn dark={currentTheme === "dark"} onClick={handleTheme}>
          {currentTheme === "dark" ? <BsMoonFill /> : <BsFillSunFill />}
        </ToggleBtn>
      </Wrapper>
    </Base>
  );
}

const Base = styled.footer`
  align-items: center;
  background-color: var(--footer-background);
  margin-top: auto;
  display: ${({ display }) => (display ? "block" : "none")};
`;

const Wrapper = styled.div`
  display: flex;
  padding: 2rem;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const LinkWrapper = styled.ul`
  display: flex;
  height: 100%;
  color: black;
  width: 100%;
`;

const ToggleBtn = styled.div`
  cursor: pointer;
  @media (max-width: 768px) {
    display: none;
  }
  margin-left: auto;

  color: ${({ dark }) => (dark ? "yellow" : "orange")};
  display: ${({ isCSR }) => (isCSR ? "flex" : "none")};

  font-size: 24px;

  padding: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--main-background);
  border-radius: 5px;
`;
