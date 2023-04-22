import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  return (
    <Base display={router.pathname === "/"}>
      <Wrapper className="mx-auto flex items-center sm:flex-row flex-col">
        <Link href="/" className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="ml-3 text-xl">Hyunwoomemo&apos;s Blog</span>
        </Link>
        <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
          © 2020 Tailblocks —
          <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">
            @knyttneve
          </a>
        </p>
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
