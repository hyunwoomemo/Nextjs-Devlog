import { useState } from "react";
import html2pdf from "html2pdf.js";

function DownloadButton({ content }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);

    const options = {
      margin: 1,
      filename: "mypage.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    const element = document.createElement("div");
    element.innerHTML = content;
    html2pdf(element, options);

    setIsLoading(false);
  };

  return (
    <button onClick={handleDownload} disabled={isLoading}>
      {isLoading ? "다운로드 중..." : "PDF로 다운로드"}
    </button>
  );
}

export default DownloadButton;
