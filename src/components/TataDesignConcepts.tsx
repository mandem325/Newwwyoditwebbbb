import React from "react";
import {
  ArrowUpRight,
  Menu,
  MessageCircle,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";

export function TataDesignConcepts() {
  return (
    <section className="w-full bg-[#e3e6e1] flex flex-col gap-32 py-32 px-4 md:px-12 text-black font-sans relative z-10 border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter mb-4 text-[#1a2118]">
          Design Concept Explorations
        </h2>
        <p className="text-lg text-black/60 font-medium">
          A showcase of various high-fidelity layout replicas integrated directly into the Tata
          Interactive flow.
        </p>
      </div>

      {/* Concept 1: SOERA */}
      <div className="max-w-[1200px] w-full mx-auto bg-[#fdfaf6] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col border border-black/5">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-4 bg-[#f5f5f5] border-b border-black/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-black uppercase tracking-wide">
                Ikbal Mahmud
              </span>
              <span className="text-xs text-black/50 font-medium">ui/ux Designer</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-sm font-bold text-black">Contact</span>
              <span className="text-xs text-black/50">+880 1798449510</span>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className="flex items-center justify-between px-8 py-6 relative z-10">
          <div className="flex items-center gap-8">
            <h2 className="text-2xl font-black text-black tracking-tighter">SOERA.</h2>
            <div className="hidden md:flex items-center gap-6 text-[10px] font-bold tracking-widest uppercase text-black/60">
              <span className="text-black hover:text-[#ff5744] cursor-pointer transition-colors">
                About Us
              </span>
              <span className="hover:text-[#ff5744] cursor-pointer transition-colors">
                Our Value
              </span>
              <span className="hover:text-[#ff5744] cursor-pointer transition-colors">
                Our Services
              </span>
              <span className="hover:text-[#ff5744] cursor-pointer transition-colors">Works</span>
            </div>
          </div>
          <Menu className="w-6 h-6 text-black cursor-pointer" />
        </div>

        {/* Hero */}
        <div className="relative w-full h-[600px] px-8 flex">
          {/* Background Image Container */}
          <div className="absolute top-0 right-32 bottom-0 left-32 overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953eb1b5a4?auto=format&fit=crop&q=80"
              alt="Creative"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Huge Vertical Texts */}
          <div className="relative z-10 h-full flex items-end pb-12 gap-4">
            <div
              className="bg-[#fdfaf6] p-4 text-[#ff5744] font-black text-8xl md:text-[120px] leading-none"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              SOERA
            </div>
            <div
              className="bg-[#ff5744] p-4 text-[#fdfaf6] font-black text-8xl md:text-[120px] leading-none mb-24"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              CREATIVE
            </div>
            <div
              className="bg-[#fdfaf6] p-4 text-[#ff5744] font-black text-8xl md:text-[120px] leading-none"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              STUDIO.
            </div>
          </div>

          {/* Right Side Vertical Tags */}
          <div className="absolute right-8 top-12 flex gap-2">
            <div
              className="bg-[#ff5744]/10 text-[#ff5744] font-bold text-lg px-2 py-6 uppercase tracking-widest"
              style={{ writingMode: "vertical-rl" }}
            >
              Objective
            </div>
            <div
              className="bg-[#ff5744]/5 text-black/40 font-bold text-lg px-2 py-6 uppercase tracking-widest"
              style={{ writingMode: "vertical-rl" }}
            >
              Cool
            </div>
            <div
              className="bg-[#ff5744]/10 text-[#ff5744] font-bold text-lg px-2 py-6 uppercase tracking-widest"
              style={{ writingMode: "vertical-rl" }}
            >
              Fast
            </div>
          </div>

          {/* Contact Me Button on Image */}
          <div className="absolute bottom-12 right-[45%] flex items-center bg-[#ff5744] text-white hover:bg-black transition-colors cursor-pointer group">
            <span className="px-6 py-4 text-xs font-bold uppercase tracking-widest">
              Contact me
            </span>
            <div className="border-l border-white/20 h-full px-4 flex flex-col justify-center gap-1 opacity-80">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-12 p-12 bg-[#f4e9de]">
          <div className="font-bold text-sm tracking-widest uppercase">About Us</div>
          <div className="flex flex-col gap-12">
            <h3 className="text-3xl md:text-5xl lg:text-[40px] font-black uppercase text-black/20 leading-[1.1]">
              <span className="text-black bg-white px-2 mb-2 inline-block">
                The Leading Creative
              </span>
              <br />
              Agency Builds Brand and Digital Strategies Focused On Engaging Customers And Shifting
              Modern Perceptions
            </h3>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="h-48 w-full lg:w-72 bg-gray-300 rounded-lg overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                  alt="Team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1">
                  ROLSUL.IO
                </div>
              </div>
              <div className="grid grid-cols-3 flex-1 gap-4">
                <div className="bg-white/50 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-4xl font-black">
                    120 <span className="text-[#ff5744]">K</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/50 mt-2">
                    Project Done
                  </span>
                </div>
                <div className="bg-white/50 p-6 flex flex-col justify-center items-center text-center border-x border-black/5">
                  <span className="text-4xl font-black">4.9</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/50 mt-2">
                    Client Rating
                  </span>
                </div>
                <div className="bg-white p-6 flex flex-col justify-center items-center text-center shadow-lg">
                  <span className="text-4xl font-black">
                    18 <span className="text-[#ff5744]">+</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/50 mt-2">
                    Total Client
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Concept 2: Biova */}
      <div className="max-w-[1200px] w-full mx-auto bg-[#edf4ff] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-4 bg-white/50 border-b border-black/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-black uppercase tracking-wide">
                Ikbal Mahmud
              </span>
              <span className="text-xs text-black/50 font-medium">ui/ux Designer</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-sm font-bold text-black">Contact</span>
              <span className="text-xs text-black/50">+880 1798449510</span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="relative w-full h-auto lg:h-[800px] flex flex-col lg:flex-row">
          {/* Left Image Split */}
          <div className="w-full lg:w-[50%] h-[400px] lg:h-full relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb046eb9?auto=format&fit=crop&q=80"
              alt="Woman drinking water"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#edf4ff] opacity-100" />

            {/* Left floating vertical text */}
            <div
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md rounded-full px-3 py-12 text-xs font-bold tracking-widest uppercase text-black/60 hidden lg:block"
              style={{ writingMode: "vertical-rl", transform: "scale(-1)" }}
            >
              Explore the Collection
            </div>

            {/* Floating Glass Widget */}
            <div className="absolute right-12 top-24 w-72 bg-black/30 backdrop-blur-xl rounded-3xl p-6 text-white border border-white/20 shadow-2xl hidden md:block">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                  Daily Energy
                </span>
                <Search className="w-4 h-4 opacity-50" />
              </div>
              <div className="flex justify-between mb-8">
                <div>
                  <div className="text-4xl font-light">
                    78 <span className="text-sm opacity-50">/100</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-widest opacity-60 mt-1">
                    Current Energy
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-light">
                    82 <span className="text-sm opacity-50">/100</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-widest opacity-60 mt-1">
                    Peak Energy
                  </div>
                </div>
              </div>
              {/* Fake Chart */}
              <div className="h-24 w-full border-t border-white/10 relative overflow-hidden">
                <svg
                  viewBox="0 0 100 40"
                  className="w-full h-full stroke-white/50 fill-none mt-2"
                  strokeWidth="1"
                >
                  <path d="M0,20 Q25,0 50,20 T100,20" />
                  <path
                    d="M0,30 Q25,10 50,30 T100,30"
                    strokeDasharray="2 2"
                    className="stroke-[#ccff00]"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[50%] h-full flex flex-col justify-between py-16 px-8 lg:pr-16 relative">
            {/* Nav Grids */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              <div className="flex flex-col gap-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                  Shop
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">
                  Terrain
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">
                  All products
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">
                  Bundles
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">
                  Subscribe & save
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">
                  Gift card
                </span>
              </div>
              <div className="flex flex-col gap-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                  Learn
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">
                  How it works
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">
                  Ingredients
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">
                  Research
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">
                  Journal
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">FAQ</span>
              </div>
              <div className="flex flex-col gap-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                  Support
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">
                  Track order
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">
                  Shipping & returns
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">
                  Contact
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">
                  Wholesale
                </span>
              </div>
              <div className="flex flex-col gap-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                  Company
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">
                  About
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">
                  Sustainability
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">
                  Careers
                </span>
                <span className="text-sm font-medium hover:text-[#0055ff] cursor-pointer">
                  Stockists
                </span>
              </div>
            </div>

            {/* Bottom Footer & Logo */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-16 md:mt-0 relative z-10">
              <div className="flex flex-col gap-6">
                <div className="text-6xl font-serif italic text-black/80 font-medium tracking-tight">
                  biova
                </div>
                <p className="text-sm text-black/60 max-w-[200px]">
                  Jl. Jenderal Sudirman No. 52 Jakarta Selatan 12190, Indonesia
                </p>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-[10px] font-bold uppercase tracking-widest text-black/40 mt-8 md:mt-12">
                  <span>All Rights Reserved ©Biova 2026</span>
                  <span className="hidden md:inline">•</span>
                  <span>Terms of service • Privacy Policy</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-black/30 mt-8 md:mt-0">
                <Twitter className="w-5 h-5 hover:text-[#0055ff] cursor-pointer transition-colors" />
                <Facebook className="w-5 h-5 hover:text-[#0055ff] cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 hover:text-[#0055ff] cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 hover:text-[#0055ff] cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Huge faded biova text on right edge */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[150px] lg:text-[200px] font-black text-[#cde0ff] pointer-events-none opacity-50 lg:opacity-100"
              style={{ writingMode: "vertical-rl", transform: "scale(-1)" }}
            >
              biova
            </div>
          </div>
        </div>
      </div>

      {/* Concept 3: Plerouse */}
      <div className="max-w-[1200px] w-full mx-auto bg-[#f8f9f5] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col border border-black/5">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-4 bg-[#eceeeb] border-b border-black/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-black uppercase tracking-wide">
                Ikbal Mahmud
              </span>
              <span className="text-xs text-black/50 font-medium">ui/ux Designer</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-sm font-bold text-black">Contact</span>
              <span className="text-xs text-black/50">+880 1798449510</span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row min-h-[750px]">
          {/* Left Sidebar */}
          <div className="w-full lg:w-32 border-r border-black/5 flex flex-row lg:flex-col items-center py-6 lg:py-12 px-6 justify-between bg-white relative z-20">
            <div
              className="text-2xl lg:text-3xl font-black text-black tracking-tight lg:-rotate-180"
              style={{ writingMode: "vertical-rl" }}
            >
              Plerouse
            </div>
            <div className="flex flex-row lg:flex-col gap-6 lg:gap-12 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-black/60 items-center overflow-x-auto lg:overflow-visible">
              <span
                className="lg:-rotate-180 whitespace-nowrap"
                style={{ writingMode: "vertical-rl" }}
              >
                Personal
              </span>
              <span
                className="lg:-rotate-180 whitespace-nowrap"
                style={{ writingMode: "vertical-rl" }}
              >
                Features
              </span>
              <span
                className="lg:-rotate-180 whitespace-nowrap"
                style={{ writingMode: "vertical-rl" }}
              >
                Cards
              </span>
              <span
                className="lg:-rotate-180 whitespace-nowrap"
                style={{ writingMode: "vertical-rl" }}
              >
                Wealth
              </span>
              <div className="bg-black text-white px-6 py-2 lg:px-3 lg:py-6 rounded-full flex items-center justify-center lg:mt-4 whitespace-nowrap">
                <span className="lg:-rotate-180" style={{ writingMode: "vertical-rl" }}>
                  Open Account
                </span>
              </div>
            </div>
          </div>

          {/* Center Content */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center relative bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
              <div className="max-w-2xl mx-auto flex flex-col gap-6 relative z-10 w-full">
                <div className="bg-[#f0f0eb] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest w-max mb-2">
                  Smart Banking
                </div>
                <h2 className="text-5xl md:text-7xl lg:text-[80px] font-light leading-[0.9] tracking-tight text-black">
                  Can one smarter bank <br />
                  <span className="inline-flex items-center gap-2 align-middle bg-[#d1f73b] px-4 py-2 rounded-full mx-2 -my-2 lg:-my-4 relative -top-2">
                    <span className="w-2.5 h-2.5 bg-black rounded-full" />
                    <span className="w-2.5 h-2.5 bg-black rounded-full" />
                    <span className="w-2.5 h-2.5 bg-black rounded-full" />
                  </span>{" "}
                  change <br />
                  how you{" "}
                  <span className="inline-flex -space-x-3 lg:-space-x-4 mx-2 align-middle relative -top-2">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
                      className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border-[3px] lg:border-4 border-white"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
                      className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border-[3px] lg:border-4 border-white"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                      className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border-[3px] lg:border-4 border-white"
                    />
                  </span>{" "}
                  manage money?
                </h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-12 mt-8">
                  <p className="max-w-[280px] text-xs lg:text-sm text-black/60 font-medium leading-relaxed">
                    Spend, save, transfer, and track your money with clarity — all from one secure
                    digital account.
                  </p>
                  <div className="bg-[#ffccdf] px-4 py-2 rounded-full text-[#ea2a8a] text-[10px] font-bold uppercase tracking-widest shrink-0">
                    Instant transfer
                  </div>
                </div>
              </div>

              {/* Floating Red Card */}
              <div className="relative mt-12 lg:mt-0 lg:absolute lg:right-12 xl:right-24 lg:top-1/2 lg:-translate-y-1/2 w-full max-w-[320px] mx-auto h-80 bg-[#d82a17] rounded-3xl shadow-2xl overflow-hidden p-6 flex flex-col justify-between text-white border-[6px] border-black rotate-0 lg:rotate-2 hover:rotate-0 transition-transform cursor-pointer z-20">
                <div className="w-full h-40 bg-black rounded-2xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80"
                    className="w-full h-full object-cover mix-blend-luminosity opacity-80"
                  />
                  <div className="absolute top-4 left-4 w-8 h-8 border-[3px] border-white rounded-full flex items-center justify-center font-bold text-sm">
                    C
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-xs font-medium w-24 leading-tight">
                    Your money, clearly organized.
                  </span>
                  <button className="bg-[#ffccdf] text-[#d82a17] px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
                    Open Account
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Dark Section */}
            <div className="py-12 lg:h-64 bg-[#0d1610] flex flex-col lg:flex-row items-start lg:items-center justify-between px-8 lg:px-16 border-t-[16px] border-white gap-8 lg:gap-0">
              <div className="flex flex-col gap-8 lg:gap-12">
                <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-[#ff5744] text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-white">Secure Banking</span> ✦
                  <span className="text-white">Instant Transfers</span> ✦
                  <span className="text-white">Smart Savings</span> ✦
                  <span className="text-white">Virtual Cards</span> ✦
                  <span className="text-white">AI Money Insights</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-8 lg:gap-24 text-white/50 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                  <span>
                    Built for clarity, control,
                    <br />
                    and everyday banking
                  </span>
                  <span>
                    Can one smart account
                    <br />
                    simplify your financial life?
                  </span>
                </div>
              </div>
              <div
                className="text-[#1a2b20] font-black text-6xl lg:text-8xl hidden lg:block -rotate-180"
                style={{ writingMode: "vertical-rl" }}
              >
                Banking <span className="text-3xl text-white/20 ml-2">01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
