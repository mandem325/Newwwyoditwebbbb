import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export function QRCodeFloatingCard() {
  const [url, setUrl] = useState("/Yodit_Resume_Safeguarding_Manager-Ethiopia__1_.pdf");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Generates an absolute URL so the QR code works from any mobile device camera
      setUrl(window.location.origin + "/Yodit_Resume_Safeguarding_Manager-Ethiopia__1_.pdf");
    }
  }, []);

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Explicit programmatic download trigger ensures instant direct download in all browsers
    const link = document.createElement("a");
    link.href = "/Yodit_Resume_Safeguarding_Manager-Ethiopia__1_.pdf";
    link.download = "Yodit_Resume_Safeguarding_Manager-Ethiopia__1_.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <a
      href="/Yodit_Resume_Safeguarding_Manager-Ethiopia__1_.pdf"
      download="Yodit_Resume_Safeguarding_Manager-Ethiopia__1_.pdf"
      onClick={handleDownload}
      aria-label="Scan or click to download CV"
      className="fixed z-[999999] hidden md:flex flex-row items-center
                 bg-transparent
                 hover:-translate-y-1 hover:opacity-75
                 transition-transform duration-300 ease-out cursor-pointer
                 right-4 bottom-4 gap-3
                 md:right-6 md:bottom-6 md:gap-3
                 w-auto
                 mix-blend-difference text-white"
    >
      <div className="shrink-0 flex items-center justify-center">
        <QRCode
          value={url}
          size={52}
          level="M"
          bgColor="transparent"
          fgColor="#FFFFFF"
          className="w-[44px] h-[44px] md:w-[52px] md:h-[52px]"
        />
      </div>

      <div className="flex flex-col justify-center shrink-0">
        <h3 className="font-['Anton',Impact,sans-serif] text-[14px] md:text-[16px] uppercase leading-none tracking-normal mb-1">
          DOWNLOAD CV
        </h3>
        <span className="font-sans text-white/90 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.06em] leading-none mb-1">
          SCAN TO DOWNLOAD
        </span>
        <span className="font-sans text-white/60 text-[9px] md:text-[10px] font-medium leading-none">
          Yodit Dejene &middot; PDF
        </span>
      </div>
    </a>
  );
}
