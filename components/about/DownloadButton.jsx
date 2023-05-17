import { useState } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const PdfExport = async (id) => {
  if (document) {
    html2canvas(document.querySelector(`${id}`)).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const pageHeight = imgWidth * 1.414;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      heightLeft -= pageHeight;

      // eslint-disable-next-line new-cap
      const doc = new jsPDF("p", "mm", "A4");
      let position = 0;
      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

      while (heightLeft >= 20) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save("Reports.pdf");
    });
  }
};

function DownloadButton({ content }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);

    PdfExport(content);

    setIsLoading(false);
  };

  return (
    <button onClick={handleDownload} disabled={isLoading}>
      {isLoading ? "다운로드 중..." : "PDF로 다운로드"}
    </button>
  );
}

export default DownloadButton;
