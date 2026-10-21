import React, { useState } from "react";
import { AnodeMobileMenu } from "./AnodeMobileMenu";
import { NAV_LINKS } from "../data";

export function GlobalMobileMenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  const openContact = () => {
    setIsOpen(false);
    window.location.href = "/contact";
  };

  return (
    <>
      <div className="fixed top-3 right-3 z-[9999] md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open mobile menu"
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-black/80 backdrop-blur-md border border-white/25 text-white hover:border-white/50 active:scale-95 transition-all shadow-lg cursor-pointer"
        >
          <div className="flex flex-col gap-1.5 w-4 items-end">
            <span className="w-full h-0.5 bg-white rounded-full" />
            <span className="w-3 h-0.5 bg-white rounded-full" />
          </div>
        </button>
      </div>

      <AnodeMobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        openContact={openContact}
        links={NAV_LINKS}
      />
    </>
  );
}

export default GlobalMobileMenuButton;
