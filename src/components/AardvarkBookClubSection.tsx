import { FlyingBirds } from "./FlyingBirds";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Instagram, Search, Mail, Linkedin, Volume2, VolumeX } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useAardvarkTransition } from "./AardvarkZoomTransition";
import { ScrollSvgTube } from "./AnimatedSnake";
import { UnicefLogo, TvoaLogo, FaweLogo, IrcLogo } from "./PartnerLogos";
import { HangingIdCard } from "./HangingIdCard";
import { AnimatedWaterWaveLine } from "./AnimatedWaterWaveLine";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ==========================================
// ASSET CONSTANTS (Official Aardvark CDN)
// ==========================================
const CDN = "https://cdn.prod.website-files.com/696173cb00865d1b386e4af8";
const CDN_UPLOADS = "https://cdn.prod.website-files.com/69a33078e92fb49d85319481";

const ASSETS = {
  logo: `${CDN}/696d10ebb91f9b8707240373_aardvark-logo.svg`,
  logoCircleBig: `${CDN}/696a402939e1e6124f2c2b39_logo-circle-big.svg`,
  logoCircleSmall: `${CDN}/696a059da09e3c123fba6a5a_logo-circle.svg`,
  boxTitle: `${CDN}/69c6d9f6cb0f4ec3190ce451_box-title.svg`,
  benefitsTitle: `${CDN}/69b2c25bdf51e00864bcf4f1_benefits-text-eng.svg`,
  appStore: `${CDN}/69960373d1c35e0dd8ec560d_button-app-store.svg`,
  googlePlay: `${CDN}/6996037302aa4574b3eecab8_button-google-play.svg`,
  packageVisual: `${CDN}/69b9afc474f523151b7c0941_package-visual.webp`,
  choiceHeart: `${CDN}/69d7c9f6062fc8ef7e014217_choice-heart-illustration.svg`,
  orangeEyecatcher: `${CDN}/69d9056988fcfdf2b0a8bfa2_orange-eyecatcher.svg`,
  reviewStar: `${CDN}/69dfba516e0793fc6d354036_review-star.svg`,
  exclusiveIcon1: `${CDN}/69dfb2530a7e746f9dfb8a6b_exclusive-slider-icon-01.webp`,
  exclusiveIcon2: `${CDN}/69dfb2526ae24d54399a03d8_exclusive-slider-icon-02.webp`,
  exclusiveIcon3: `${CDN}/69dfb2527288cd815f477968_exclusive-slider-icon-03.webp`,

  // Steps
  step1: `${CDN}/69849eba6ebf97ec498a7a57_01_step-illustration.webp`,
  step2: `${CDN}/69849eba1f866c516a514ade_02_step-illustration.webp`,
  step3: `${CDN}/69849ebaea8f91077664d474_03_step-illustration.webp`,
  step4: `${CDN}/6a354b17bd64236c99a93c7e_Step%20Illustration.webp`,

  // Press
  pw: `${CDN}/69b9b566693a6633673acc40_logo-pw.webp`,
  msnbc: `${CDN}/69b9b5b7ac5a698bb7f76e69_logo-msnbc.webp`,
  bookRiot: `${CDN}/69b9b5c57abe05306fcadf78_logo-book-riot.webp`,
  travelLeisure: `${CDN}/69b9b5d24cc9818e2945bf06_logo-travel-leisure.webp`,

  // Monthly Books
  mazywood: `${CDN_UPLOADS}/6a95dd114588ec2d7b5f3852_earlymazywood.png`,
  crone: `${CDN_UPLOADS}/6a95de8306c788ece7de135f_crone.png`,
  secretDinner: `${CDN_UPLOADS}/6a95dfdce3d0286b64aa3e9c_thesecretdinner.png`,
  blacktail: `${CDN_UPLOADS}/6a95e0c52136eec8eecaa113_blacktail.png`,
  scion: `${CDN_UPLOADS}/6a95e174ff580ee462947116_scion.png`,
  fruitFly: `${CDN_UPLOADS}/6a95e206013344d578ec09be_fruitfly.png`,

  // Choice winners
  cryForHelp: `${CDN_UPLOADS}/6a424bd55394074d40414928_6a424662da0a53b9c2c606e3_isthisacryforhelp2.webp`,
  buffaloHunter: `${CDN_UPLOADS}/6a424bd25ff866ea5996cae2_6a42467a5013b8dca5ff09f8_thebuffalohunterhunterspec2.webp`,
  reformatory: `${CDN_UPLOADS}/6a42443a15d2cf609e34a24c_6a423d476a971a161097ff07_thereformatoryv2.webp`,
  chainGang: `${CDN_UPLOADS}/6a4244a6000948e7e39aa56e_6a423da669caf660d2c477bb_chaingangallstarsspecial2.webp`,

  // Exclusive
  oneBadNight: `${CDN_UPLOADS}/6a424be60e9268be5e54b22e_6a4245f0000948e7e39bb2eb_onebadnight2.webp`,

  // Genre covers
  loveByTheBook: `${CDN}/6a31665934faab6442519ffe_lovebythebook.webp`,
  monicaLewinsky: `${CDN}/6a3165c03a6358bb05f283c8_dearmonicalewinsky.webp`,
  girlsGirl: `${CDN}/6a31cc1f142c8b52680233ed_girlsgirlold.webp`,
  julieChan: `${CDN}/6a31b872dbbfe0f82f71d0f3_juliechanisdead-350x538.webp`,
  theHounding: `${CDN}/6a31b882edd02e0ccf6da282_thehounding-350x538.webp`,
  theMadWife: `${CDN}/6a31b8ad3bf21098c4645dc8_themadwife-350x538.webp`,
  definitionOfLove: `${CDN}/6a31cc1fd65f717f3c64816d_theverydefinitionofloveold.webp`,
  tooOldForThis: `${CDN}/6a31b36c6d9062dcc2792c81_toooldforthis-350x538.webp`,
  localHeavens: `${CDN}/6a31b8543837965ccdfd46b3_localheavens-350x538.webp`,
  japaneseGothic: `${CDN}/6a316546fcc3632be3a0f631_japanesegothic.webp`,
  redWinter: `${CDN}/6a3165ee2ca8f8e5f54f8384_theredwinter-350x538.webp`,
  unicornHunters: `${CDN}/6a31cc1f6c096eedfd0eee08_theunicornhuntersold.webp`,
  starshipped: `${CDN}/6a31658aa896f279bb1b1761_starshipped-350x538.webp`,
  adrift: `${CDN}/6a3165abaf88f7e3504d41e2_adrift-350x538.webp`,
};

// ==========================================
// DATA SETS
// ==========================================

interface MonthlyBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  badges: { text: string; bg: string; textCol: string }[];
  image: string;
  blurb: string;
  quote?: string;
  hasEarlyRelease?: boolean;
}

const SEPT_BOOKS: MonthlyBook[] = [
  {
    id: "srhr-ethiopia",
    title: "Adolescent Girls Safe Spaces",
    author: "Yodit Dejene · Project Lead",
    genre: "SRHR / Youth Empowerment",
    hasEarlyRelease: true,
    badges: [
      { text: "FAWE Ethiopia", bg: "#fca311", textCol: "#000000" },
      { text: "12,000+ Girls", bg: "#7b2cbf", textCol: "#ffffff" },
      { text: "UNICEF Partner", bg: "#00adef", textCol: "#ffffff" },
    ],
    image: "/gallery/IMG_20260922_185937_614.jpg",
    quote:
      "Reaching over 12,000 adolescent girls with vital SRHR literacy and safe learning spaces.",
    blurb:
      "Led comprehensive adolescent sexual and reproductive health programs across rural and peri-urban Ethiopian schools. Established confidential peer mentorship hubs, distributed dignity materials, and conducted community dialogues to reduce early marriage and keep girls enrolled in secondary education.",
  },
  {
    id: "tvoa-youth",
    title: "Pan-African Youth Leadership Program",
    author: "Yodit Dejene · Program Officer",
    genre: "Community Training & Advocacy",
    badges: [
      { text: "Voice of Africa", bg: "#2a9d8f", textCol: "#ffffff" },
      { text: "1,500+ Youth", bg: "#e76f51", textCol: "#ffffff" },
      { text: "Regional Policy", bg: "#1a1e4a", textCol: "#ffffff" },
    ],
    image: "/gallery/IMG_20260922_185844_168.jpg",
    quote: "Fostering grassroots civic participation and female leadership across East Africa.",
    blurb:
      "Designed and facilitated high-impact leadership academies for emerging African youth advocates. Streamlined capacity-building curricula spanning human rights monitoring, gender-transformative advocacy, and public accountability frameworks.",
  },
  {
    id: "irc-emergency",
    title: "Refugee Protection & Safeguarding",
    author: "Yodit Dejene · Protection Officer",
    genre: "Protection & Emergency Aid",
    badges: [
      { text: "IRC Ethiopia", bg: "#ffc709", textCol: "#000000" },
      { text: "Assosa / Sherkole", bg: "#e63946", textCol: "#ffffff" },
      { text: "PSEA Protocols", bg: "#7b2cbf", textCol: "#ffffff" },
    ],
    image: "/gallery/IMG_20260922_185916_101.jpg",
    quote: "Delivering life-saving protection services and dignity kits in refugee settlements.",
    blurb:
      "Supervised field-level gender-based violence (GBV) risk mitigation and case management across Assosa and Sherkole refugee settlements. Conducted PSEA compliance assessments, established crisis referral pathways, and distributed targeted non-food dignity supplies.",
  },
  {
    id: "civic-safeguarding",
    title: "Multi-Agency Safeguarding Frameworks",
    author: "Yodit Dejene · Specialist",
    genre: "Policy & Governance",
    badges: [
      { text: "UNHCR Compliant", bg: "#00b4d8", textCol: "#ffffff" },
      { text: "Zero Tolerance", bg: "#d90429", textCol: "#ffffff" },
    ],
    image: "/gallery/IMG_20260922_185846_438.jpg",
    quote: "Establishing rigorous safeguarding and child protection compliance standards.",
    blurb:
      "Trained humanitarian field personnel and community health workers on mandatory PSEA and survivor-centered reporting guidelines. Coordinated inter-agency referral mechanisms to ensure swift, confidential protection.",
  },
  {
    id: "mentorship-circles",
    title: "Peer-to-Peer Mentorship Circles",
    author: "Yodit Dejene · Facilitator",
    genre: "Youth Mentorship",
    badges: [
      { text: "Grassroots", bg: "#ffbe0b", textCol: "#000000" },
      { text: "Life Skills", bg: "#ff006e", textCol: "#ffffff" },
    ],
    image: "/gallery/IMG_20260922_185849_390.jpg",
    quote: "Cultivating agency and self-efficacy among adolescent girls and vulnerable youth.",
    blurb:
      "Structured experiential learning cohorts where young women build life skills, financial literacy, and social-emotional resilience, enabling them to navigate community hurdles and claim equal educational rights.",
  },
  {
    id: "community-resilience",
    title: "Community Health & Resilience Labs",
    author: "Yodit Dejene · Coordinator",
    genre: "Public Health",
    badges: [
      { text: "Field Operations", bg: "#8338ec", textCol: "#ffffff" },
      { text: "Arba Minch", bg: "#2a9d8f", textCol: "#ffffff" },
    ],
    image: "/gallery/123IMG-20260802-WA0004.jpg",
    quote: "Bridging community leaders, elders, and youth around reproductive health awareness.",
    blurb:
      "Mobilized inter-generational consensus to eliminate harmful traditional practices, promoting reproductive rights through culturally responsive community dialogues in Southern Ethiopia.",
  },
];

interface GenreData {
  name: string;
  isScript?: boolean;
  leftBook: { title: string; image: string; tag: string };
  rightBook: { title: string; image: string; tag: string };
}

const GENRES: GenreData[] = [
  {
    name: "Community Training",
    isScript: true,
    leftBook: { title: "Voice of Africa", image: "/gallery/IMG_20260922_185844_168.jpg", tag: "Leadership" },
    rightBook: { title: "Capacity Building", image: "/gallery/IMG_20260922_185849_390.jpg", tag: "Field Modules" },
  },
  {
    name: "Adolescent SRHR",
    leftBook: { title: "FAWE Ethiopia", image: "/gallery/IMG_20260922_185937_614.jpg", tag: "SRHR Advocacy" },
    rightBook: { title: "Peer Education", image: "/gallery/IMG_20260922_185940_986.jpg", tag: "Youth Health" },
  },
  {
    name: "Gender Equity",
    leftBook: { title: "Safe Spaces", image: "/gallery/IMG_20260922_185951_029.jpg", tag: "Inclusion" },
    rightBook: { title: "Mentorship Circles", image: "/gallery/IMG_20260922_185957_259.jpg", tag: "Empowerment" },
  },
  {
    name: "Youth Mentorship",
    isScript: true,
    leftBook: { title: "Life Skills Labs", image: "/gallery/IMG_20260922_185916_101.jpg", tag: "Self-Efficacy" },
    rightBook: { title: "Civic Participation", image: "/gallery/IMG_20260922_190021_344.jpg", tag: "Action" },
  },
  {
    name: "Refugee Protection",
    leftBook: { title: "IRC Assosa", image: "/gallery/222IMG_20260922_185916_033.jpg", tag: "Sherkole Camp" },
    rightBook: { title: "Dignity Kits", image: "/gallery/444IMG_20260922_190002_684.jpg", tag: "Safeguarding" },
  },
  {
    name: "Safeguarding & PSEA",
    leftBook: { title: "UNHCR Protocols", image: "/gallery/56IMG_20260922_190007_832.jpg", tag: "Accountability" },
    rightBook: { title: "Case Management", image: "/gallery/665IMG_20260922_190007_888.jpg", tag: "Referral Pathways" },
  },
  {
    name: "Emergency Response",
    leftBook: { title: "Crisis Intervention", image: "/gallery/123IMG-20260802-WA0004.jpg", tag: "Displacement" },
    rightBook: { title: "Community Resilience", image: "/gallery/IMG_20260922_190021_107.jpg", tag: "Field Ops" },
  },
  {
    name: "Policy & Governance",
    isScript: true,
    leftBook: { title: "Consortia Alignment", image: "/gallery/000IMG_20260922_185937_614.jpg", tag: "Bilateral Policy" },
    rightBook: { title: "Advocacy Action", image: "/gallery/IMG_20260922_185846_438.jpg", tag: "Institutions" },
  },
  {
    name: "and more.",
    isScript: true,
    leftBook: { title: "M&E Systems", image: "/gallery/IMG_20260922_185957_399.jpg", tag: "Impact Metrics" },
    rightBook: { title: "Sustainable Scale", image: "/gallery/IMG_20260922_185844_168.jpg", tag: "Partnerships" },
  },
];

// ==========================================
// MAIN REPLICA COMPONENT
// ==========================================

export function AardvarkBookClubSection() {
  const { triggerZoomTransition, triggerOpeningAnimation, isTransitioning } =
    useAardvarkTransition();
  const [activeTab, setActiveTab] = useState<"home" | "all-books">("home");
  const [selectedGenreIndex, setSelectedGenreIndex] = useState(0);
  const [isMascotOpen, setIsMascotOpen] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState("");
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState("All");
  const [isGiftingVideoMuted, setIsGiftingVideoMuted] = useState(true);
  const giftingVideoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const overlapCardRef = useRef<HTMLDivElement>(null);
  const giftSectionRef = useRef<HTMLDivElement>(null);
  const whiteZoneRef = useRef<HTMLDivElement>(null);
  const taglineTextPathRef = useRef<SVGTextPathElement>(null);

  useEffect(() => {
    const video = giftingVideoRef.current;
    if (!video) return;
    const handleExtMuted = () => {
      setIsGiftingVideoMuted(true);
    };
    video.addEventListener("media-externally-muted", handleExtMuted);
    return () => {
      video.removeEventListener("media-externally-muted", handleExtMuted);
    };
  }, []);

  // Multi-plane parallax references for painterly artwork
  const parallaxBgRef = useRef<SVGGElement>(null);
  const parallaxL1Ref = useRef<SVGGElement>(null);
  const parallaxL2Ref = useRef<SVGGElement>(null);
  const parallaxL3Ref = useRef<SVGGElement>(null);
  const parallaxL4Ref = useRef<SVGGElement>(null);
  const parallaxL5Ref = useRef<SVGGElement>(null);

  const quickBgX = useRef<((v: number) => void) | null>(null);
  const quickBgY = useRef<((v: number) => void) | null>(null);
  const quickL1X = useRef<((v: number) => void) | null>(null);
  const quickL1Y = useRef<((v: number) => void) | null>(null);
  const quickL2X = useRef<((v: number) => void) | null>(null);
  const quickL2Y = useRef<((v: number) => void) | null>(null);
  const quickL3X = useRef<((v: number) => void) | null>(null);
  const quickL3Y = useRef<((v: number) => void) | null>(null);
  const quickL4X = useRef<((v: number) => void) | null>(null);
  const quickL4Y = useRef<((v: number) => void) | null>(null);
  const quickL5X = useRef<((v: number) => void) | null>(null);
  const quickL5Y = useRef<((v: number) => void) | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 320px)", () => {
        // Direct GPU-accelerated textPath startOffset animation with ZERO React re-renders
        if (taglineTextPathRef.current && giftSectionRef.current) {
          gsap.fromTo(
            taglineTextPathRef.current,
            { attr: { startOffset: "52%" } },
            {
              attr: { startOffset: "-18%" },
              ease: "none",
              scrollTrigger: {
                trigger: giftSectionRef.current,
                start: "top 95%",
                end: "bottom 10%",
                scrub: true,
              },
            },
          );
        }
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const [selectedGiftMonths, setSelectedGiftMonths] = useState(3);
  const [selectedModalBook, setSelectedModalBook] = useState<MonthlyBook | null>(null);
  const [boxCount, setBoxCount] = useState(1);

  const activeGenre = GENRES[selectedGenreIndex];

  // All books aggregated for catalog
  const ALL_CATALOG_BOOKS: MonthlyBook[] = [
    ...SEPT_BOOKS,
    {
      id: "reformatory",
      title: "The Reformatory",
      author: "Tananarive Due",
      genre: "Horror / Supernatural",
      badges: [{ text: "Supernatural", bg: "#7b2cbf", textCol: "#ffffff" }],
      image: "/gallery/IMG_20260922_185937_614.jpg",
      quote: "Chilling and deeply moving supernatural masterpiece.",
      blurb:
        "A haunting tale set in Jim Crow-era Florida about a boy who can see the spirits of youth trapped in a notorious reform school.",
    },
    {
      id: "chain-gang",
      title: "Chain-Gang All-Stars",
      author: "Nana Kwame Adjei-Brenyah",
      genre: "Dystopian / Sci-Fi",
      badges: [{ text: "Special Edition", bg: "#f39c12", textCol: "#000000" }],
      image: "/gallery/IMG_20260922_185846_438.jpg",
      quote: "National Book Award Finalist and instant modern classic.",
      blurb:
        "Two top women gladiators in a privatized prison program fight for their freedom and for each other in this blistering satire.",
    },
    {
      id: "buffalo-hunter",
      title: "The Buffalo Hunter Hunter",
      author: "Stephen Graham Jones",
      genre: "Western Noir / Fiction",
      badges: [{ text: "Western Noir", bg: "#2a9d8f", textCol: "#ffffff" }],
      image: "/gallery/IMG_20260922_185916_101.jpg",
      quote: "Fierce, gripping frontier revenge thriller.",
      blurb:
        "A relentless hunt across the frontier where old debts are settled in blood and bullets.",
    },
    {
      id: "cry-for-help",
      title: "Is This a Cry for Help?",
      author: "Mateo Askaripour",
      genre: "Memoir / Humor",
      badges: [{ text: "Memoir", bg: "#ff006e", textCol: "#ffffff" }],
      image: "/gallery/IMG_20260922_185849_390.jpg",
      quote: "Hilarious, vulnerable and deeply honest.",
      blurb: "A poignant exploration of mental health, creativity, and finding meaning in chaos.",
    },
    {
      id: "starshipped",
      title: "Starshipped",
      author: "K.A. Doore",
      genre: "Science Fiction",
      badges: [{ text: "Space Opera", bg: "#00b4d8", textCol: "#ffffff" }],
      image: "/gallery/IMG_20260922_190021_344.jpg",
      quote: "An exhilarating interstellar adventure with high stakes.",
      blurb:
        "Crew members navigate treacherous wormholes and deep-space diplomacy aboard a rogue vessel.",
    },
    {
      id: "love-by-the-book",
      title: "Love by the Book",
      author: "Melissa Pimentel",
      genre: "Romance",
      badges: [{ text: "Rom-Com", bg: "#ff4d6d", textCol: "#ffffff" }],
      image: "/gallery/IMG_20260922_185951_029.jpg",
      quote: "A witty, delightful rom-com about reading between the lines.",
      blurb:
        "A book editor decides to apply 19th-century dating rules to modern London, with hilarious consequences.",
    },
  ];

  const categories = [
    "All",
    "Horror",
    "Science Fiction",
    "Romance",
    "Thriller",
    "Literary Fiction",
    "Fantasy",
    "Historical",
  ];

  const filteredCatalogBooks = ALL_CATALOG_BOOKS.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      b.author.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      b.genre.toLowerCase().includes(catalogSearch.toLowerCase());
    const matchesCategory =
      selectedCatalogCategory === "All" ||
      b.genre.toLowerCase().includes(selectedCatalogCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Handle 1:1 Replica Navigation with Purple Zoom Opening Transition
  const handleGoHome = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    triggerZoomTransition(undefined, () => {
      setActiveTab("home");
      document
        .getElementById("aardvark-book-club-replica")
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    });
  };

  const handleGoAllBooks = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    triggerZoomTransition(undefined, () => {
      setActiveTab("all-books");
      document
        .getElementById("aardvark-book-club-replica")
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    });
  };

  const handleGoGifting = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    triggerZoomTransition(undefined, () => {
      setActiveTab("home");
      setTimeout(() => {
        document.getElementById("gifting")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  };

  return (
    <section
      ref={sectionRef}
      id="aardvark-book-club-replica"
      data-custom-scroll="true"
      className="relative w-full select-none z-30 overflow-visible bg-transparent"
      style={{
        fontFamily: "'Degular', 'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      {/* ========================================================================= */}
      {/* VIEW: "EXPLORE OUR SELECTIONS" (ALL BOOKS PAGE - 1:1 REPLICA FROM VIDEO) */}
      {/* ========================================================================= */}
      {activeTab === "all-books" ? (
        <div
          ref={
            activeTab === "all-books"
              ? (overlapCardRef as React.RefObject<HTMLDivElement>)
              : undefined
          }
          className="relative w-full min-h-screen bg-[#d8cefa] text-black pt-8 sm:pt-10 pb-24 px-4 sm:px-8 md:px-12 transition-colors duration-500 rounded-t-[36px] sm:rounded-t-[48px] md:rounded-t-[64px] shadow-[0_-30px_80px_rgba(0,0,0,0.75)] border-t border-white/25 overflow-hidden"
        >
          {/* Header Bar */}
          <header className="relative z-30 max-w-6xl mx-auto flex items-center justify-between py-3 mb-10 md:mb-16">
            {/* Left: Brand Logo (Clicking triggers opening zoom back to Home) */}
            <button
              onClick={handleGoHome}
              className="flex items-center gap-2.5 group cursor-pointer"
              title="Return to Overview"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#8b1856] text-white flex items-center justify-center font-serif font-black text-lg tracking-wider shadow-md transition-transform group-hover:scale-105">
                YD
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif font-black text-lg sm:text-xl tracking-tight leading-none text-[#202022]">
                  YODIT DEJENE
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-widest uppercase text-[#8b1856]">
                  Advocacy & Impact
                </span>
              </div>
            </button>

            {/* Center: Nav Pill */}
            <nav className="hidden md:flex items-center bg-white/70 backdrop-blur-md rounded-full px-5 py-2 border border-black/10 shadow-lg space-x-7 text-[15px] font-medium tracking-wide text-black">
              <button
                onClick={handleGoAllBooks}
                className="font-bold text-[#8b1856] underline underline-offset-4 cursor-pointer"
              >
                Initiatives
              </button>
              <button
                onClick={handleGoGifting}
                className="text-black/70 hover:text-black transition-colors cursor-pointer"
              >
                Impact
              </button>
              <button
                onClick={handleGoHome}
                className="text-black/70 hover:text-black transition-colors cursor-pointer"
              >
                Overview
              </button>
              <a
                href="mailto:abiydejene343445@gmail.com"
                className="bg-[#eb6f28] hover:bg-[#ff7b32] text-white rounded-full px-4 py-1.5 flex items-center gap-1.5 transition-all transform hover:scale-105 active:scale-95 shadow-md font-semibold text-sm"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </nav>

            {/* Right: Socials & Mobile Actions */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/yodit-dejene-3b6807185"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 flex items-center justify-center transition-transform hover:scale-110"
              >
                <Linkedin className="w-4 h-4 text-black" />
              </a>
              <a
                href="mailto:abiydejene343445@gmail.com"
                aria-label="Email"
                className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 flex items-center justify-center transition-transform hover:scale-110"
              >
                <Mail className="w-4 h-4 text-black" />
              </a>
              <button
                onClick={handleGoHome}
                className="md:hidden bg-black text-white text-xs font-bold px-3.5 py-2 rounded-full"
              >
                Overview
              </button>
            </div>
          </header>

          {/* Explore Hero Title & Search */}
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center pt-4 pb-12">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-black mb-4"
              style={{ fontFamily: "'Champ', Georgia, serif" }}
            >
              Explore Core Initiatives
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-black/80 max-w-2xl mb-8">
              Proven frameworks across adolescent health, life skills education, and multi-sectoral
              community safeguarding.
            </p>

            {/* Search Input Bar with Pink Button */}
            <div className="w-full max-w-xl relative flex items-center bg-white rounded-full p-2 pl-6 shadow-xl border border-black/10 mb-8">
              <Search className="w-5 h-5 text-black/40 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Search by title, author, or genre..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                className="w-full bg-transparent text-black placeholder-black/40 outline-none text-base font-medium"
              />
              <button className="bg-[#ea2a8a] hover:bg-[#d81b7a] text-white px-6 py-2.5 rounded-full font-bold text-sm shrink-0 transition-transform active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer">
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCatalogCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedCatalogCategory === cat
                      ? "bg-black text-white shadow-md scale-105"
                      : "bg-white/70 text-black/80 hover:bg-white border border-black/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
            {filteredCatalogBooks.map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setSelectedModalBook(book)}
                className="bg-[#1c1214] rounded-2xl p-5 shadow-lg border border-white/5 flex flex-col justify-between cursor-pointer group"
              >
                <div className="relative aspect-[1/1.4] w-full rounded-xl overflow-hidden mb-4 bg-white/5 flex items-center justify-center">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {book.badges && book.badges[0] && (
                    <span
                      className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md"
                      style={{
                        backgroundColor: book.badges[0].bg,
                        color: book.badges[0].textCol,
                      }}
                    >
                      {book.badges[0].text}
                    </span>
                  )}
                </div>

                <div>
                  <h3
                    className="text-xl font-bold text-white group-hover:text-[#ea2a8a] transition-colors line-clamp-1"
                    style={{ fontFamily: "'Champ', Georgia, serif" }}
                  >
                    {book.title}
                  </h3>
                  <p className="text-xs text-white/60 font-medium mb-3">{book.author}</p>
                  <p className="text-xs text-white/75 line-clamp-2 leading-relaxed mb-4">
                    {book.blurb}
                  </p>

                  <div className="w-full flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-[11px] font-bold text-[#ea2a8a] uppercase tracking-wider">
                      Read Preview
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#ea2a8a]/20 text-[#ea2a8a] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Return to Home Banner */}
          <div className="max-w-4xl mx-auto mt-20 text-center bg-black text-white rounded-3xl p-8 sm:p-12 shadow-2xl">
            <h2
              className="text-3xl sm:text-4xl font-black mb-4"
              style={{ fontFamily: "'Champ', Georgia, serif" }}
            >
              Ready to unbox stories?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8 text-base sm:text-lg">
              Return to the club home or subscribe today to receive up to 3 hardcover picks every
              month.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleGoHome}
                className="bg-[#fed648] hover:bg-[#ffe270] text-black font-bold px-8 py-3.5 rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Back to Club Home</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* VIEW: HOME VIEW ("Unbox stories worth talking about") */
        /* ========================================================================= */
        <div className="relative w-full text-black overflow-visible bg-transparent">
          {/* ========================================================================= */}
          {/* COMBINED HERO & CHOOSE FROM CANVAS WITH RICH DARKENED MULTI-COLOR BRUSHSTROKES */}
          {/* Tone-adjusted for crystal-clear typography legibility & deep atmospheric contrast: */}
          {/* Midnight Indigo, Deep Emerald, Burnt Amber, Ruby Wine, Deep Plum, & Marine Teal */}
          {/* Every color connects seamlessly with NO straight border line visible */}
          {/* ========================================================================= */}
          <div
            ref={overlapCardRef}
            className="relative w-full bg-[#dfad22] text-black overflow-hidden rounded-t-[36px] sm:rounded-t-[48px] md:rounded-t-[64px] shadow-[0_-35px_50px_-15px_rgba(0,0,0,0.85)] border-t border-white/25 border-b-0 border-b-transparent"
            style={{ borderBottom: "none" }}
          >
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 rounded-t-[36px] sm:rounded-t-[48px] md:rounded-t-[64px]">
              <svg
                className="w-full h-full"
                viewBox="0 0 1600 1800"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 1. Base Golden Ochre Canvas */}
                <rect width="1600" height="1800" fill="#dfad22" />

                {/* LAYER BG: Deep Velvet Midnight Plum Masses (Parallax Level 0 - Deepest Foundation) */}
                <g ref={parallaxBgRef} className="parallax-float-bg">
                  {/* 2. Deep Velvet Midnight Plum Organic Mass (#2d0836) */}
                  <path
                    d="M -120, 720
                       C 180, 640 440, 780 640, 920
                       C 860, 1060 1140, 1020 1360, 900
                       C 1500, 820 1620, 860 1740, 940
                       L 1740, 1850
                       L -120, 1850
                       Z"
                    fill="#2d0836"
                  />

                  {/* 3. Deep Plum Fluid Lobe (#22052b) */}
                  <path
                    d="M -120, 920
                       C 120, 940 320, 1080 420, 1260
                       C 500, 1420 440, 1600 280, 1720
                       C 160, 1800 20, 1820 -120, 1820
                       Z"
                    fill="#22052b"
                  />
                </g>

                {/* =================================================================== */}
                {/* THICK PAINTERLY BRUSH STROKES - RICH, DARKENED PALETTE */}
                {/* =================================================================== */}

                {/* LAYER 1: Deep Plum Spine & Midnight Indigo (Parallax Level 1) */}
                <g ref={parallaxL1Ref} className="parallax-float-l1">
                  {/* BRUSH 1: Deep Plum / Midnight Violet - Thick Continuous Spine */}
                  <path
                    d="M -120, 680
                         C 160, 580 440, 720 600, 920
                         C 760, 1120 860, 1340 1060, 1480
                         C 1260, 1620 1500, 1580 1680, 1420
                         C 1760, 1340 1820, 1200 1840, 1060"
                    stroke="#220427"
                    strokeWidth="240"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* BRUSH 2: Deep Midnight Indigo / Cobalt Navy */}
                  <path
                    d="M 1740, 60
                         C 1500, 40 1300, 180 1220, 380
                         C 1140, 600 1280, 820 1420, 980
                         C 1540, 1120 1560, 1300 1460, 1460
                         C 1360, 1620 1140, 1700 920, 1660
                         C 700, 1620 520, 1480 340, 1380
                         C 160, 1280 -20, 1320 -120, 1380"
                    stroke="#100e47"
                    strokeWidth="250"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Secondary Indigo Bristle Layer */}
                  <path
                    d="M 1750, 160
                         C 1520, 140 1340, 280 1270, 480
                         C 1200, 700 1320, 900 1440, 1060
                         C 1540, 1200 1540, 1360 1420, 1500
                         C 1300, 1640 1080, 1700 860, 1660
                         C 660, 1620 480, 1480 300, 1360"
                    stroke="#181559"
                    strokeWidth="130"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* LAYER 2: Deep Forest Jade & Pine Green (Parallax Level 2) */}
                <g ref={parallaxL2Ref} className="parallax-float-l2">
                  <path
                    d="M 1720, 320
                         C 1520, 360 1400, 520 1350, 720
                         C 1300, 920 1360, 1100 1300, 1280
                         C 1240, 1460 1060, 1580 860, 1590
                         C 660, 1600 480, 1500 320, 1360
                         C 180, 1220 80, 1080 -100, 1020"
                    stroke="#064036"
                    strokeWidth="200"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Pine Green Bristle */}
                  <path
                    d="M 1740, 380
                         C 1550, 420 1440, 580 1390, 770
                         C 1340, 960 1380, 1140 1310, 1310
                         C 1240, 1480 1060, 1600 840, 1600
                         C 640, 1600 470, 1490 320, 1350"
                    stroke="#042d25"
                    strokeWidth="100"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* LAYER 3: Deep Burnt Terracotta & Ruby Wine (Parallax Level 3) */}
                <g ref={parallaxL3Ref} className="parallax-float-l3">
                  <path
                    d="M 1740, 540
                         C 1560, 580 1460, 750 1420, 940
                         C 1380, 1130 1440, 1280 1360, 1430
                         C 1280, 1580 1100, 1670 900, 1650
                         C 700, 1630 540, 1510 380, 1360
                         C 220, 1200 120, 1020 -60, 940"
                    stroke="#852d09"
                    strokeWidth="210"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Burnt Amber Bristle */}
                  <path
                    d="M 1750, 600
                         C 1580, 640 1490, 810 1450, 990
                         C 1410, 1170 1450, 1310 1360, 1450
                         C 1270, 1590 1080, 1670 880, 1650"
                    stroke="#9a3412"
                    strokeWidth="110"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* BRUSH 5: Deep Crimson & Ruby Wine */}
                  <path
                    d="M 1740, 760
                         C 1540, 800 1410, 980 1360, 1170
                         C 1310, 1360 1330, 1520 1210, 1630
                         C 1090, 1740 880, 1760 680, 1680
                         C 480, 1600 340, 1440 180, 1300
                         C 40, 1160 -40, 1080 -120, 1060"
                    stroke="#6b0e22"
                    strokeWidth="180"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Ruby Bristle */}
                  <path
                    d="M 1750, 810
                         C 1560, 850 1440, 1020 1390, 1200
                         C 1340, 1380 1330, 1530 1190, 1640"
                    stroke="#7f122c"
                    strokeWidth="80"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* LAYER 4: Deep Ocean Teal & Imperial Violet (Parallax Level 4) */}
                <g ref={parallaxL4Ref} className="parallax-float-l4">
                  {/* BRUSH 6: Deep Ocean Teal & Marine Navy */}
                  <path
                    d="M -100, 1280
                         C 140, 1190 360, 1300 530, 1450
                         C 700, 1600 930, 1660 1160, 1610
                         C 1390, 1560 1560, 1380 1640, 1160
                         C 1720, 940 1690, 700 1760, 520"
                    stroke="#074e70"
                    strokeWidth="170"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Marine Navy Bristle */}
                  <path
                    d="M -90, 1330
                         C 150, 1240 370, 1350 540, 1490
                         C 710, 1630 940, 1680 1170, 1620"
                    stroke="#093c54"
                    strokeWidth="75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* BRUSH 7: Deep Imperial Violet & Midnight Purple */}
                  <path
                    d="M -90, 900
                         C 140, 860 360, 990 480, 1160
                         C 600, 1330 710, 1540 900, 1620
                         C 1090, 1700 1320, 1630 1460, 1480
                         C 1600, 1330 1640, 1120 1740, 980"
                    stroke="#280a3c"
                    strokeWidth="200"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Deep Royal Purple Bristle */}
                  <path
                    d="M -80, 950
                         C 150, 910 370, 1040 490, 1200
                         C 610, 1360 710, 1560 900, 1630
                         C 1080, 1700 1300, 1640 1440, 1500"
                    stroke="#360e52"
                    strokeWidth="95"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* LAYER 5: Suspended Painterly Droplets (Parallax Level 5 - Forefront Float) */}
                <g ref={parallaxL5Ref} className="parallax-float-l5">
                  <circle cx="1520" cy="460" r="22" fill="#100e47" opacity="0.9" />
                  <circle cx="1570" cy="510" r="14" fill="#064036" opacity="0.9" />
                  <circle cx="1480" cy="550" r="10" fill="#852d09" opacity="0.9" />
                  <circle cx="1410" cy="1120" r="26" fill="#6b0e22" opacity="0.95" />
                  <circle cx="1470" cy="1180" r="15" fill="#9a3412" opacity="0.9" />
                  <circle cx="1370" cy="1240" r="12" fill="#280a3c" opacity="0.95" />
                  <circle cx="560" cy="1380" r="22" fill="#074e70" opacity="0.9" />
                  <circle cx="500" cy="1440" r="13" fill="#093c54" opacity="0.85" />
                  <circle cx="280" cy="1220" r="20" fill="#220427" opacity="0.95" />
                  <circle cx="330" cy="1270" r="12" fill="#852d09" opacity="0.9" />
                  <circle cx="940" cy="1680" r="24" fill="#100e47" opacity="0.95" />
                  <circle cx="1010" cy="1720" r="14" fill="#064036" opacity="0.9" />
                </g>

                {/* Ambient Soft Darkening Overlay to ensure perfect contrast and zero glare */}
                <rect width="1600" height="1800" fill="#000000" opacity="0.15" />
              </svg>
            </div>

            {/* ========================================================================= */}
            {/* SECTION 1: HERO ("Unbox stories worth talking about") */}
            {/* ========================================================================= */}
            <div className="relative z-10 w-full pt-14 sm:pt-18 md:pt-22 pb-20 md:pb-28 px-4 sm:px-8 md:px-12 overflow-visible border-none outline-none bg-transparent rounded-t-[36px] sm:rounded-t-[48px] md:rounded-t-[64px]">
              {/* --- STICKY / FLOATING HEADER PILL BAR --- */}
              <header className="relative z-30 max-w-6xl mx-auto flex items-center justify-between py-3 mb-12 md:mb-18">
                {/* Left: Brand Logo (Clicking triggers opening zoom) */}
                <button
                  onClick={handleGoHome}
                  className="flex items-center gap-2.5 group cursor-pointer"
                  title="Return to Overview"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#8b1856] text-white flex items-center justify-center font-serif font-black text-lg tracking-wider shadow-md transition-transform group-hover:scale-105">
                    YD
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-serif font-black text-lg sm:text-xl tracking-tight leading-none text-[#202022]">
                      YODIT DEJENE
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-widest uppercase text-[#8b1856]">
                      Advocacy & Impact
                    </span>
                  </div>
                </button>

                {/* Right: Socials */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/yodit-dejene-3b6807185"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-full bg-black hover:bg-black/80 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:abiydejene343445@gmail.com"
                    aria-label="Email"
                    className="w-10 h-10 rounded-full bg-black hover:bg-black/80 text-white flex items-center justify-center transition-transform hover:scale-110 text-xs font-bold shadow-md"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </header>

              {/* --- HERO MAIN GRID --- */}
              <div className="relative z-20 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Headlines */}
                <div className="lg:col-span-7 flex flex-col items-start text-left">
                  <h1
                    className="text-[13vw] sm:text-[9vw] lg:text-[76px] xl:text-[84px] font-black leading-[0.92] tracking-[-0.03em] text-black mb-6"
                    style={{ fontFamily: "'Champ', Georgia, serif" }}
                  >
                    Empowering youth
                    <br />
                    to lead with
                    <br />
                    purpose
                  </h1>

                  <p className="text-[17px] sm:text-[19px] md:text-[21px] text-black/90 leading-relaxed max-w-xl mb-10 font-medium">
                    More than six years championing SRHR, adolescent empowerment, and gender equity across
                    Ethiopia and Africa. Building inclusive spaces where young women and
                    marginalized communities thrive.
                  </p>

                  {/* Handwritten script note */}
                  <div
                    className="text-black/85 text-[20px] sm:text-[24px] flex items-center gap-3 mb-6 font-semibold"
                    style={{ fontFamily: "'Hello Organichand', cursive" }}
                  >
                    <span>Bridging policy with grassroots community action</span>
                    <svg
                      className="w-8 h-8 text-black/80 stroke-current fill-none -rotate-12"
                      viewBox="0 0 32 32"
                    >
                      <path d="M4,16 C12,8 24,12 28,24" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M22,24 L28,24 L28,18" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Right Column: Hanging ID Card Badge with Lanyard Rope & Physics Pendulum Dangle */}
                <div className="lg:col-span-5 relative flex flex-col items-center justify-center mt-2 lg:mt-0 overflow-visible">
                  <HangingIdCard
                    imageSrc="/lv_0_20261002185044.jpg"
                    onCardClick={() => setSelectedModalBook(SEPT_BOOKS[0])}
                    onMonogramClick={handleGoHome}
                  />
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SECTION 5: "Choose from" */}
            {/* ========================================================================= */}
            <div
              id="genres"
              className="relative z-10 w-full pt-20 sm:pt-28 pb-0 px-0 text-center text-white border-0 border-none outline-none shadow-none bg-transparent"
              style={{ border: "none", outline: "none", boxShadow: "none" }}
            >
              {/* Handwritten subtitle note */}
              <p
                className="relative z-20 text-[#fce7f3] text-2xl sm:text-3xl md:text-4xl mb-6 px-4"
                style={{ fontFamily: "'Hello Organichand', cursive" }}
              >
                Tailored interventions for every community context
              </p>

              <h2
                className="relative z-20 text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-14 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] px-4"
                style={{ fontFamily: "'Champ', Georgia, serif" }}
              >
                Core Domains
              </h2>

              {/* 3-Column Layout: Left Flanking Book -> Center Stack -> Right Flanking Book */}
              <div className="relative z-20 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-4 sm:px-8 md:px-12">
                {/* Left Flanking Book Mockup */}
                <div className="hidden lg:flex lg:col-span-3 flex-col items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeGenre.leftBook.title}
                      data-butterfly-perch="true"
                      initial={{ opacity: 0, x: -30, rotate: -12 }}
                      animate={{ opacity: 1, x: 0, rotate: -6 }}
                      exit={{ opacity: 0, x: -30, rotate: -12 }}
                      transition={{ duration: 0.35 }}
                      className="relative w-[210px] aspect-[1/1.5] rounded-r-lg shadow-[0_25px_50px_rgba(0,0,0,0.5)] overflow-hidden bg-white/10 border-l-4 border-white/30 cursor-pointer"
                      onClick={() => setSelectedModalBook(SEPT_BOOKS[0])}
                    >
                      <img
                        src={activeGenre.leftBook.image}
                        alt={activeGenre.leftBook.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-md text-white text-[11px] px-2.5 py-0.5 rounded-full font-medium">
                        {activeGenre.leftBook.tag}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                  <p className="text-white/90 text-sm mt-3 font-semibold drop-shadow-md">
                    {activeGenre.leftBook.title}
                  </p>
                </div>

                {/* Center Column: Interactive Genre Stack */}
                <div className="lg:col-span-6 flex flex-col items-center space-y-3 sm:space-y-4">
                  {GENRES.map((genre, idx) => {
                    const isSelected = selectedGenreIndex === idx;
                    return (
                      <motion.button
                        key={genre.name}
                        onMouseEnter={() => setSelectedGenreIndex(idx)}
                        onClick={() => setSelectedGenreIndex(idx)}
                        className={`transition-colors cursor-pointer block ${
                          isSelected
                            ? "text-[#fed648] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
                            : "text-white/90 hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
                        }`}
                      >
                        <span
                          className={
                            genre.isScript
                              ? "text-3xl sm:text-4xl md:text-5xl font-normal leading-tight"
                              : "text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight"
                          }
                          style={{
                            fontFamily: genre.isScript
                              ? "'Hello Organichand', cursive"
                              : "'Champ', Georgia, serif",
                          }}
                        >
                          {genre.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Right Flanking Book Mockup */}
                <div className="hidden lg:flex lg:col-span-3 flex-col items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeGenre.rightBook.title}
                      data-butterfly-perch="true"
                      initial={{ opacity: 0, x: 30, rotate: 12 }}
                      animate={{ opacity: 1, x: 0, rotate: 6 }}
                      exit={{ opacity: 0, x: 30, rotate: 12 }}
                      transition={{ duration: 0.35 }}
                      className="relative w-[210px] aspect-[1/1.5] rounded-r-lg shadow-[0_25px_50px_rgba(0,0,0,0.5)] overflow-hidden bg-white/10 border-l-4 border-white/30 cursor-pointer"
                      onClick={() => setSelectedModalBook(SEPT_BOOKS[1])}
                    >
                      <img
                        src={activeGenre.rightBook.image}
                        alt={activeGenre.rightBook.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-md text-white text-[11px] px-2.5 py-0.5 rounded-full font-medium">
                        {activeGenre.rightBook.tag}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                  <p className="text-white/90 text-sm mt-3 font-semibold drop-shadow-md">
                    {activeGenre.rightBook.title}
                  </p>
                </div>
              </div>

              {/* Organic Bottom Fluid Moving Water Wave Transition with Centered Mascot Badge */}
              <AnimatedWaterWaveLine
                className="mt-8 sm:mt-12 z-20"
                heightClass="h-28 sm:h-32 md:h-36"
                fillColor="#ffffff"
              >
                {/* Central Monogram Badge Button positioned in the middle of the moving water wave */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex justify-center">
                  <motion.div
                    data-butterfly-perch="true"
                    whileHover={{ rotate: 180, scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center shadow-[0_12px_36px_rgba(0,0,0,0.18)] cursor-pointer p-3.5 sm:p-4 border border-black/5"
                    title="Yodit Dejene — Overview"
                    onClick={handleGoHome}
                  >
                    <div className="w-full h-full rounded-full border-2 border-dashed border-[#8b1856]/40 flex items-center justify-center bg-[#8b1856]/5">
                      <span className="font-serif font-black text-xl sm:text-2xl text-[#8b1856]">
                        YD
                      </span>
                    </div>
                  </motion.div>
                </div>
              </AnimatedWaterWaveLine>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 6: "Why Aardvark?" (CHARTREUSE CANVAS & TILTED STICKER BADGES) */}
          {/* ========================================================================= */}
          <div
            className="relative z-20 w-full bg-white pt-12 sm:pt-16 pb-4 sm:pb-6 px-4 sm:px-8 md:px-12 shadow-none border-0 border-none outline-none -mt-[2px]"
            style={{ border: "none", outline: "none", boxShadow: "none" }}
          >
            {/* Selected Black Section with Exact Stepped Notch Silhouette Border Style (1:1 from attachment) */}
            <div className="relative w-full max-w-6xl mx-auto flex flex-col select-none">
              {/* Top Shoulders & Center Notch Layer */}
              <div className="relative flex w-full z-10 h-10 sm:h-12 md:h-14">
                <div
                  className="flex-1 bg-[#121815] rounded-tl-[24px] sm:rounded-tl-[36px] md:rounded-tl-[48px] rounded-tr-[12px] sm:rounded-tr-[16px] md:rounded-tr-[24px] border-t border-l border-white/15 flex items-start pt-2.5 sm:pt-3 pl-4 sm:pl-6 md:pl-8 overflow-hidden"
                  style={{ marginLeft: "0px", marginTop: "0px", marginRight: "-2px" }}
                />

                {/* Center Notch Cutout */}
                <div
                  className="w-[60%] md:w-[65%] lg:w-[70%] max-w-[850px] shrink-0 relative flex items-end"
                  style={{
                    marginLeft: "-3px",
                    paddingBottom: "15px",
                    paddingTop: "0px",
                    marginBottom: "5px",
                    paddingLeft: "0px",
                    marginRight: "-4px",
                  }}
                >
                  {/* Black filler for the bottom padding area */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-[15px] bg-[#121815]"
                    style={{
                      marginTop: "0px",
                      marginBottom: "-6px",
                      paddingBottom: "7px",
                      paddingTop: "15px",
                    }}
                  />

                  {/* Left Scoop */}
                  <div className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 text-[#121815] fill-current shrink-0 relative">
                    <svg
                      viewBox="0 0 32 32"
                      className="absolute bottom-0 left-0 w-full h-full overflow-visible"
                      style={{
                        marginTop: "-12px",
                        marginLeft: "-2px",
                        marginBottom: "-6px",
                        paddingBottom: "7px",
                      }}
                    >
                      <path d="M 0 0 C 0 17.673 14.327 32 32 32 L 0 32 Z" />
                      <path
                        d="M 0 0 C 0 17.673 14.327 32 32 32"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.15)"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>

                  {/* Notch Floor */}
                  <div
                    className="flex-1 border-b border-white/15 h-5 sm:h-6 md:h-8 relative overflow-hidden flex items-end pb-0 sm:pb-0.5 z-50"
                    style={{ marginLeft: "-17px", marginRight: "-15px" }}
                  >
                    <motion.div
                      className="flex whitespace-nowrap text-[#121815] font-mono text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold w-max"
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{ ease: "linear", duration: 15, repeat: Infinity }}
                    >
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center shrink-0 opacity-80">
                          <span className="mx-4">STRATEGIC PARTNERSHIPS</span>
                          <span className="mx-4 text-[#ea2a8a]">✦</span>
                          <span className="mx-4">GLOBAL ADVOCACY</span>
                          <span className="mx-4 text-[#ea2a8a]">✦</span>
                          <span className="mx-4">SUSTAINABLE IMPACT</span>
                          <span className="mx-4 text-[#ea2a8a]">✦</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Right Scoop */}
                  <div
                    className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 text-[#121815] fill-current shrink-0 relative"
                    style={{ transform: "scaleX(-1)" }}
                  >
                    <svg
                      viewBox="0 0 32 32"
                      className="absolute bottom-0 left-0 w-full h-full overflow-visible"
                      style={{
                        marginLeft: "4px",
                        marginRight: "6px",
                        marginBottom: "-3px",
                        marginTop: "-8px",
                        paddingBottom: "-13px",
                        paddingTop: "-18px",
                        paddingLeft: "-6px",
                        paddingRight: "8px",
                      }}
                    >
                      <path d="M 0 0 C 0 17.673 14.327 32 32 32 L 0 32 Z" />
                      <path
                        d="M 0 0 C 0 17.673 14.327 32 32 32"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.15)"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                </div>

                {/* Right Shoulder */}
                <div
                  className="flex-1 bg-[#121815] rounded-tr-[24px] sm:rounded-tr-[36px] md:rounded-tr-[48px] rounded-tl-[12px] sm:rounded-tl-[16px] md:rounded-tl-[24px] border-t border-r border-white/15 flex items-start justify-end pt-2.5 sm:pt-3 pr-4 sm:pr-6 md:pr-8 overflow-hidden"
                  style={{ marginLeft: "-3px" }}
                />
              </div>

              {/* Main Dark Obsidian Bento Section (Continuous border & elevation shadow) */}
              <div className="relative w-full rounded-b-[24px] sm:rounded-b-[36px] md:rounded-b-[56px] bg-[#121815] text-[#fdf6e7] pb-20 sm:pb-28 pt-12 sm:pt-16 md:pt-20 px-4 sm:px-8 md:px-12 flex flex-col items-center justify-center overflow-hidden text-center border-b border-l border-r border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]">
                {/* Giant Watermark Monogram Silhouette */}
                <div className="absolute inset-0 m-auto w-[65vw] max-w-[600px] aspect-square opacity-10 pointer-events-none flex items-center justify-center">
                  <svg
                    viewBox="0 0 400 400"
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="200"
                      cy="200"
                      r="180"
                      stroke="#fdf6e7"
                      strokeWidth="6"
                      strokeDasharray="14 10"
                    />
                    <circle cx="200" cy="200" r="140" stroke="#fdf6e7" strokeWidth="4" />
                    <text
                      x="200"
                      y="245"
                      textAnchor="middle"
                      fill="#fdf6e7"
                      fontFamily="Georgia, serif"
                      fontSize="130"
                      fontWeight="900"
                    >
                      YD
                    </text>
                  </svg>
                </div>

                {/* Strategic Leadership Title Heading */}
                <div className="relative z-10 w-full max-w-2xl mb-12 flex flex-col items-center">
                  <span
                    className="text-[#8d921b] text-2xl sm:text-3xl md:text-4xl mb-2 tracking-wide drop-shadow-sm transform -rotate-1"
                    style={{ fontFamily: "'Hello Organichand', cursive" }}
                  >
                    Strategic Leadership & Field Experience
                  </span>
                  <h2
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#fdf6e7] leading-[0.95] drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
                    style={{ fontFamily: "'Champ', Georgia, serif" }}
                  >
                    Why Yodit Dejene?
                  </h2>
                </div>

                {/* 5 Tilted Sticker Badges with Interactive Spring Hover */}
                <div className="relative z-10 max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                  <motion.div
                    data-butterfly-perch="true"
                    whileHover={{ scale: 1.15, rotate: -12 }}
                    className="bg-[#ea2a8a] text-white px-7 py-3.5 rounded-full text-xl sm:text-2xl font-black uppercase tracking-wide shadow-xl transform -rotate-6 cursor-pointer"
                    style={{ fontFamily: "'Champ', Georgia, serif" }}
                  >
                    Community Training
                  </motion.div>

                  <motion.div
                    data-butterfly-perch="true"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className="bg-[#f47820] text-white px-7 py-3.5 rounded-full text-xl sm:text-2xl font-black uppercase tracking-wide shadow-xl transform rotate-6 cursor-pointer"
                    style={{ fontFamily: "'Champ', Georgia, serif" }}
                  >
                    Youth Engagement
                  </motion.div>

                  <motion.div
                    data-butterfly-perch="true"
                    whileHover={{ scale: 1.15, rotate: -8 }}
                    className="bg-[#1a1e4a] text-white px-7 py-3.5 rounded-full text-xl sm:text-2xl font-black uppercase tracking-wide shadow-xl transform -rotate-3 cursor-pointer"
                    style={{ fontFamily: "'Champ', Georgia, serif" }}
                  >
                    SRHR Advocacy
                  </motion.div>

                  <motion.div
                    data-butterfly-perch="true"
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    className="bg-[#0ed1cb] text-[#05322c] px-7 py-3.5 rounded-full text-xl sm:text-2xl font-black uppercase tracking-wide shadow-xl transform rotate-4 cursor-pointer"
                    style={{ fontFamily: "'Champ', Georgia, serif" }}
                  >
                    Refugee Protection
                  </motion.div>

                  <motion.div
                    data-butterfly-perch="true"
                    whileHover={{ scale: 1.15, rotate: -6 }}
                    className="bg-[#fdf6e7] text-[#1a1e4a] px-7 py-3.5 rounded-full text-xl sm:text-2xl font-black uppercase tracking-wide shadow-xl transform -rotate-4 cursor-pointer"
                    style={{ fontFamily: "'Champ', Georgia, serif" }}
                  >
                    Impact Monitoring
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* UNIFIED CONTINUOUS WHITE CANVAS FLOW (SECTIONS 8, 9 & 10) */}
          {/* One seamless white background and continuous 3D tube propagating across all sections */}
          {/* ========================================================================= */}
          <div
            ref={whiteZoneRef}
            className="relative w-full bg-white overflow-hidden border-0 border-none outline-none shadow-none z-10 -mt-[1px]"
            style={{ border: "none", outline: "none", boxShadow: "none" }}
          >
            <FlyingBirds />
            {/* Continuous Multi-Section Moving 3D SVG Tube (Lusion.co replica) */}
            <ScrollSvgTube
              containerRef={whiteZoneRef}
              pathPreset="multi-section-flow"
              variant="blue"
            />

            {/* ========================================================================= */}
            {/* SECTION 8: "A gift outside of the box" (1:1 REPLICA FROM VIDEO) */}
            {/* ========================================================================= */}
            <div
              id="gifting"
              ref={giftSectionRef}
              className="relative w-full bg-transparent text-black pt-16 sm:pt-24 md:pt-32 pb-24 md:pb-36 px-4 sm:px-8 md:px-12 overflow-visible z-10"
            >
              {/* Animated Curved SVG Tagline ("A gift outside of the box") */}
              <div className="w-full overflow-visible mb-6 sm:mb-10 pointer-events-none select-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -100 1920 450"
                  fill="none"
                  className="w-full h-auto overflow-visible"
                >
                  <path
                    id="taglineCurvePath"
                    d="M-165.5 320 C33.686 215 810 90 1304 90 C1797.99 90 2262.5 215 2741.5 305"
                    stroke="none"
                    fill="none"
                  />
                  <text
                    fill="#202022"
                    fontFamily="'Champ', Georgia, serif"
                    fontWeight="900"
                    fontSize="145"
                    letterSpacing="-0.02em"
                  >
                    <textPath
                      ref={taglineTextPathRef}
                      href="#taglineCurvePath"
                      startOffset="52%"
                      textAnchor="start"
                    >
                      Impact outside of boundaries
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Content Main Grid */}
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-8 sm:pt-14">
                {/* Left Column: Body Paragraph, Shop gifts! Button, Mentioned by, Press Logos */}
                <div className="w-full lg:col-span-6 flex flex-col items-start text-left z-20">
                  <p
                    className="text-black text-xl sm:text-2xl font-normal leading-relaxed max-w-lg mb-8"
                    style={{ fontFamily: "'Degular', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    Spearheading multi-sectoral programs that strengthen community capacity from
                    grassroots youth to policy consortia. Delivering measurable, dignified change
                    through SRHR education, GBV safeguarding, and institutional partnerships.
                  </p>

                  {/* Partner Networks & Consortia Logos */}
                  <div className="flex flex-col items-start gap-4">
                    <span
                      className="text-2xl sm:text-3xl text-[#9982de] transform -rotate-3"
                      style={{ fontFamily: "'Hello Organichand', cursive" }}
                    >
                      Partner Networks & Consortia
                    </span>

                    <div className="flex flex-wrap items-center gap-6 sm:gap-8 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-black/5 shadow-sm">
                      <UnicefLogo className="h-7 sm:h-9 w-auto hover:scale-105 transition-transform" />
                      <TvoaLogo className="h-7 sm:h-9 w-auto hover:scale-105 transition-transform" />
                      <FaweLogo className="h-8 sm:h-10 w-auto hover:scale-105 transition-transform" />
                      <IrcLogo className="h-8 sm:h-10 w-auto hover:scale-105 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Right Column: Featured Video chroma-keyed-video (2).webm - visible on all views */}
                <div className="w-full lg:col-span-6 flex justify-center items-center z-10 pt-4 lg:pt-0">
                  <motion.div
                    data-butterfly-perch="true"
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    whileInView={{ scale: 1, opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      type: "spring",
                      stiffness: 110,
                      damping: 16,
                      mass: 0.9,
                    }}
                    className="relative w-full max-w-[560px] sm:max-w-[620px] lg:max-w-[680px] origin-center filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] group rounded-2xl sm:rounded-3xl overflow-visible bg-transparent flex justify-center items-center"
                  >
                    <video
                      key="/chroma-keyed-video (2).webm"
                      ref={giftingVideoRef}
                      src="/chroma-keyed-video (2).webm"
                      autoPlay
                      loop
                      muted={isGiftingVideoMuted}
                      playsInline
                      className="w-full h-auto aspect-video object-contain block cursor-pointer transition-transform duration-700 group-hover:scale-[1.02] bg-transparent"
                      onClick={() => {
                        if (giftingVideoRef.current) {
                          if (giftingVideoRef.current.paused) {
                            giftingVideoRef.current.play();
                          } else {
                            giftingVideoRef.current.pause();
                          }
                        }
                      }}
                    >
                      <source src="/chroma-keyed-video (2).webm" type="video/webm" />
                      <source src="/chroma-keyed-video-2.webm" type="video/webm" />
                      <source src="/chroma-keyed-video.webm" type="video/webm" />
                      <source src="/chroma-keyed-video (2).mp4" type="video/mp4" />
                      <source src="/37941ad376044336ac87a388ee8c822a.webm" type="video/webm" />
                    </video>

                    {/* Sound toggle button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsGiftingVideoMuted((prev) => !prev);
                      }}
                      aria-label={isGiftingVideoMuted ? "Unmute video" : "Mute video"}
                      className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
                    >
                      {isGiftingVideoMuted ? (
                        <VolumeX className="w-4 h-4 text-white/90" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SECTION 9: DIAGONAL TICKER BANNERS */}
            {/* ========================================================================= */}
            <div className="relative w-full bg-transparent py-16 overflow-visible border-0 border-none outline-none shadow-none z-10">
              {/* Top Slanted Ribbon (Pink, -4deg) */}
              <div className="w-[120vw] -ml-[10vw] bg-[#ea2a8a] text-white py-3.5 transform -rotate-3 shadow-xl overflow-hidden mb-4">
                <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] font-black text-xl uppercase tracking-wider space-x-8">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="flex items-center gap-4">
                      <span>
                        ✦ COMMUNITY TRAINING & EMPOWERMENT ✦ GENDER EQUALITY ADVOCACY ✦ REFUGEE
                        PROTECTION
                      </span>
                      <span>✦</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Slanted Ribbon (Cyan, +3deg) */}
              <div className="w-[120vw] -ml-[10vw] bg-[#00dfc4] text-[#05322c] py-3.5 transform rotate-2 shadow-xl overflow-hidden">
                <div className="flex whitespace-nowrap animate-[marquee_22s_linear_infinite_reverse] font-black text-xl uppercase tracking-wider space-x-8">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="flex items-center gap-4">
                      <span>
                        ★ 6+ YEARS PROGRAM LEADERSHIP ★ FAWE ETHIOPIA ★ VOICE OF AFRICA ★ UNHCR
                        PSEA ★
                      </span>
                      <span>★</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SECTION 10: "a PROCESS BUILT for PERFECTION" / "so THAT YOU BECOME ART" */}
            {/* Exact match to Frame 00:12 - 00:14 in reference video, with NO BORDER LINE */}
            {/* ========================================================================= */}
            <div
              className="relative w-full bg-transparent text-[#181615] pt-28 sm:pt-36 md:pt-44 pb-32 sm:pb-40 md:pb-52 px-6 md:px-12 flex flex-col items-center justify-center text-center select-none border-0 border-none outline-none overflow-visible z-10"
              style={{
                border: "none",
                outline: "none",
                boxShadow: "none",
                fontFamily: "'Louize Display', Georgia, serif",
              }}
            >
              {/* Eyebrow: a FRAMEWORK BUILT for RESILIENCE */}
              <p className="relative z-10 text-[14px] sm:text-[15px] md:text-[16px] tracking-[0.2em] text-[#181615] uppercase font-normal mb-8 sm:mb-12 md:mb-16">
                <span
                  className="mr-1.5 font-normal"
                  style={{
                    fontFamily: "'Louize Display', Georgia, serif",
                    fontStyle: "italic",
                    textTransform: "none",
                  }}
                >
                  a
                </span>
                <span className="tracking-[0.14em]">FRAMEWORK BUILT</span>
                <span
                  className="mx-1.5 font-normal"
                  style={{
                    fontFamily: "'Louize Display', Georgia, serif",
                    fontStyle: "italic",
                    textTransform: "none",
                  }}
                >
                  for
                </span>
                <span className="tracking-[0.18em]">RESILIENCE</span>
              </p>

              {/* Main Display Headline: so THAT COMMUNITIES BECOME EMPOWERED */}
              <h2
                className="relative z-10 text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[88px] font-normal leading-[0.98] tracking-[-0.02em] max-w-5xl"
                style={{ fontFamily: "'Louize Display', Georgia, serif" }}
              >
                <span
                  className="mr-3 sm:mr-5 md:mr-6 font-normal"
                  style={{
                    fontFamily: "'Louize Display', Georgia, serif",
                    fontStyle: "italic",
                    textTransform: "none",
                  }}
                >
                  so
                </span>
                <span className="uppercase tracking-tight">THAT COMMUNITIES</span>
                <br />
                <span className="uppercase tracking-tight">BECOME EMPOWERED</span>
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BOOK DETAILS MODAL POPUP */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedModalBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#0e2118] text-white rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedModalBook(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-transform hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 flex justify-center">
                  <div className="w-[180px] aspect-[1/1.5] rounded-r-lg shadow-2xl overflow-hidden">
                    <img
                      src={selectedModalBook.image}
                      alt={selectedModalBook.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="sm:col-span-7 flex flex-col items-start text-left">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {selectedModalBook.badges.map((b, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                        style={{ backgroundColor: b.bg, color: b.textCol }}
                      >
                        {b.text}
                      </span>
                    ))}
                  </div>

                  <h3
                    className="text-2xl sm:text-3xl font-black text-white"
                    style={{ fontFamily: "'Champ', Georgia, serif" }}
                  >
                    {selectedModalBook.title}
                  </h3>
                  <p className="text-sm text-[#fed648] font-medium mb-3">
                    by {selectedModalBook.author}
                  </p>

                  <p className="text-xs text-white/80 leading-relaxed mb-6">
                    {selectedModalBook.blurb}
                  </p>

                  <div className="flex items-center gap-3 w-full">
                    <button
                      onClick={() => {
                        setBoxCount((prev) => Math.min(3, prev + 1));
                        setSelectedModalBook(null);
                      }}
                      className="flex-1 bg-[#eb6f28] hover:bg-[#ff7e35] text-white py-2.5 rounded-full text-sm font-bold shadow-md transition-colors text-center"
                    >
                      Add to Box ({boxCount}/3)
                    </button>
                    <button
                      onClick={() => setSelectedModalBook(null)}
                      className="border border-white/20 hover:border-white/50 text-white px-4 py-2.5 rounded-full text-xs font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
