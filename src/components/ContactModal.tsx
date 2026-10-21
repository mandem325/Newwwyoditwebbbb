import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Mail, Phone, MapPin, Copy, Check, X, ExternalLink } from "lucide-react";
import heroPortrait from "@/assets/hero-portrait.jpg";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("juididejene869@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactItems = [
    {
      icon: <Mail className="w-5 h-5 text-lime" />,
      label: "Email Address",
      value: "juididejene869@gmail.com",
      href: "mailto:juididejene869@gmail.com",
      action: {
        label: copied ? "Copied" : "Copy",
        icon: copied ? (
          <Check className="w-3.5 h-3.5 text-lime" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-muted-foreground" />
        ),
        onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          handleCopyEmail();
        },
      },
    },
    {
      icon: <Phone className="w-5 h-5 text-ochre" />,
      label: "Phone Number",
      value: "+251 98 980 8538",
      href: "tel:+251989808538",
    },
    {
      icon: <Linkedin className="w-5 h-5 text-lime" />,
      label: "LinkedIn Profile",
      value: "linkedin.com/in/yodit-dejene",
      href: "https://www.linkedin.com/in/yodit-dejene",
      external: true,
    },
    {
      icon: <MapPin className="w-5 h-5 text-lime" />,
      label: "Primary Location",
      value: "Addis Ababa, Ethiopia",
      href: "https://maps.google.com/?q=Addis+Ababa,+Ethiopia",
      external: true,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            data-lenis-prevent
            className="relative w-full max-w-4xl bg-white/95 backdrop-blur-xl border border-stone-200/80 shadow-2xl rounded-[2.5rem] overflow-hidden z-10 flex flex-col md:flex-row max-h-[92vh] md:max-h-[85vh] min-h-0"
          >
            {/* Left side: Portrait */}
            <div className="md:w-2/5 shrink-0 flex flex-col border-b md:border-b-0 md:border-r border-stone-200/50 bg-stone-50/50">
              <div className="relative w-full h-32 sm:h-40 md:h-64 shrink-0 overflow-hidden">
                <img
                  src={heroPortrait}
                  alt="Yodit Dejene Portrait"
                  className="w-full h-full object-cover object-top filter contrast-105 brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />

                {/* Badge Overlay */}
                <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 z-20 flex flex-col text-left">
                  <span className="text-[8px] md:text-[9px] font-mono tracking-widest text-[#c15c3d] uppercase bg-white/65 backdrop-blur-sm px-2 py-0.5 rounded-full border border-stone-200/85 w-fit shadow-sm">
                    CONTACT CARD
                  </span>
                </div>
              </div>

              {/* Bio details below the image */}
              <div className="p-4 sm:p-5 md:p-6 text-left space-y-2 flex-grow flex flex-col justify-center bg-stone-100/40">
                <span className="text-[8px] md:text-[9px] font-mono tracking-widest text-lime uppercase block">
                  Availability & Scope
                </span>
                <p className="text-xs text-muted-foreground/90 leading-relaxed border-l-2 border-ochre/30 pl-3 py-0.5">
                  Available for strategic advising, consortium coordination, community training, and
                  gender-transformative program design. Connect via the channels below.
                </p>
              </div>
            </div>

            {/* Right side: Contact Details */}
            <div
              data-lenis-prevent
              className="flex-1 min-h-0 p-5 sm:p-6 md:p-10 flex flex-col justify-between overflow-y-auto scrollbar-thin scrollbar-thumb-border/20 scrollbar-track-transparent text-stone-900"
            >
              <div>
                {/* Header Row with Close Button */}
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div>
                    <span className="font-mono text-[9px] sm:text-[10px] text-lime tracking-widest uppercase font-semibold">
                      LET'S COLLABORATE
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-light text-stone-900 mt-0.5 sm:mt-1 tracking-tight uppercase">
                      Yodit Dejene
                    </h2>
                    <p className="text-[10px] sm:text-xs font-mono text-muted-foreground mt-0.5 sm:mt-1 uppercase tracking-wider">
                      SRHR Program Lead & Advisor
                    </p>
                  </div>

                  {/* Elegant Close Button */}
                  <button
                    onClick={onClose}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-stone-200 bg-white/80 hover:bg-white backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-stone-900 hover:border-stone-400 transition-all duration-300 shrink-0 shadow-sm"
                    aria-label="Close contact details"
                  >
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Contact List */}
                <div className="space-y-2.5 sm:space-y-4">
                  {contactItems.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-[#c15c3d]/5 hover:border-[#c15c3d]/20 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform backdrop-blur-sm">
                        {React.cloneElement(item.icon, {
                          className: "w-4 h-4 sm:w-5 sm:h-5 text-current",
                        })}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-muted-foreground uppercase block">
                          {item.label}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-stone-900 mt-0.5 block truncate group-hover:text-lime transition-colors">
                          {item.value}
                        </span>
                      </div>

                      {/* Action Button (like Copy) or External Arrow */}
                      <div className="shrink-0 flex items-center gap-1.5 pl-1 sm:pl-2">
                        {item.action ? (
                          <button
                            onClick={item.action.onClick}
                            className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-stone-100 hover:bg-stone-200 border border-stone-200 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase transition-colors shadow-sm"
                          >
                            {item.action.icon}
                            <span
                              className={
                                copied && item.label.includes("Email")
                                  ? "text-lime"
                                  : "text-muted-foreground"
                              }
                            >
                              {item.action.label}
                            </span>
                          </button>
                        ) : (
                          item.href !== "#" && (
                            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground/50 group-hover:text-lime group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                          )
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Status footer inside popup */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-stone-200 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
                <span>Addis Ababa, Ethiopia</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                  Available Q1 2026
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
