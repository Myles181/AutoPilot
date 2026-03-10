"use client";

import React from 'react';
import { Sparkles, Layers, ChevronRight, PlayCircle, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

// Sections
import ProblemSolutionSection from './components/ProblemSolutionSection';
import GrowthEnginesSection from './components/GrowthEnginesSection';
import CoreFeaturesSection from './components/CoreFeaturesSection';
import TechStackPlanSection from './components/TechStackPlanSection';
import SpaceBackground from './components/SpaceBackground';

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-white font-sans selection:bg-[#0071e3] selection:text-white relative z-0">

      <SpaceBackground />

      {/* Premium Apple-style Nav */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 h-14 bg-[#1d1d1f]/80 backdrop-blur-xl z-[100] border-b border-white/[0.08] flex items-center justify-center px-4 md:px-8"
      >
        <div className="w-full max-w-[1024px] flex items-center justify-between text-[11px] font-semibold text-gray-300 tracking-wide uppercase">
          <div className="flex items-center gap-2 text-white hover:text-white/80 transition-colors cursor-pointer mr-6">
            <Layers className="w-4 h-4" />
            <span className="hidden sm:block text-xs normal-case font-bold tracking-tight">AutoPilot</span>
          </div>
          <div className="hidden md:flex items-center justify-between flex-1 max-w-[600px] mr-6">
            <span className="hover:text-white transition-colors cursor-pointer">Concept</span>
            <span className="hover:text-white transition-colors cursor-pointer">Problem</span>
            <span className="hover:text-white transition-colors cursor-pointer">Engines</span>
            <span className="hover:text-white transition-colors cursor-pointer">Features</span>
            <span className="hover:text-white transition-colors cursor-pointer">Infrastructure</span>
            <span className="hover:text-white transition-colors cursor-pointer">Support</span>
          </div>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest border border-white/10 transition-colors hidden sm:block">
            Connect Wallet
          </button>
        </div>
      </motion.nav>

      {/* Ribbon Banner */}


      {/* Hero Section */}
      <main className="pt-24 pb-32 flex flex-col items-center justify-center text-center px-4 relative z-0 overflow-hidden text-white">

        <div className="relative z-10 w-full flex flex-col items-center justify-center">

          {/* Small Pre-Headline Badge */}


          {/* Massive Apple Headline */}
          <h1 className="text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] font-bold tracking-tighter leading-[0.9] mb-8 max-w-[1200px] flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-transparent bg-clip-text bg-gradient-to-br from-[#ffffff] to-[#a1a1a6]"
            >
              Pro. Beyond.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40, filter: "blur(12px)", scale: 0.95 }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                scale: 1,
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                opacity: { duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
                filter: { duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
                backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" }
              }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-[length:200%_auto] pb-2 sm:pb-4 mt-2"
            >
              Money grows while you sleep.
            </motion.span>
          </h1>

          {/* Clean Subtitle */}
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl lg:text-3xl text-[#a1a1a6] font-medium max-w-3xl mx-auto mb-12 leading-relaxed tracking-tight"
          >
            No crypto knowledge required. Autonomously manage your idle cUSD with agentic lending and arbitrage directly on Celo.
          </motion.p>

          {/* Pricing / CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6 mb-24 z-20 relative"
          >
            <button className="bg-[#f5f5f7] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Start Growing
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-full text-lg font-medium text-white border border-white/20 hover:bg-white/10 transition group backdrop-blur-md">
              Watch the film <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>

          {/* Ultra-Premium Hero Graphic Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[1100px] mt-10 perspective-[2000px] z-10"
          >
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-gradient-to-br from-[#1a1a1f] to-[#0d0d0f] border border-white/10 rounded-[2rem] md:rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden flex flex-col md:flex-row items-center justify-center p-8 md:p-12 group hover:border-white/20 transition-colors duration-500 transform rotate-x-2 rotate-y-[-2deg]">

              {/* Top glass reflection */}
              <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

              <div className="flex-1 w-full flex flex-col justify-center relative z-10 text-left pr-0 md:pr-12 mb-8 md:mb-0">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-6 text-emerald-400 text-xs font-bold tracking-widest uppercase self-start shadow-sm">
                  <Activity className="w-3 h-3 mr-1" />
                  Agent Active
                </div>
                <div className="text-3xl md:text-4xl text-white font-serif mb-4 leading-snug">
                  "Save $20 a month, grow the rest, never let my balance drop below $5."
                </div>
                <p className="text-gray-400 font-medium text-sm md:text-base">
                  Your plain-language goal has been parsed and set on-chain via LLM Intent Translation.
                </p>
              </div>

              <div className="w-full md:w-[450px] space-y-4 relative z-10 shrink-0">
                {/* UI Mockup Block 1 */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group/card hover:bg-black/60 transition-colors cursor-default">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-bold flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Safety Floor</span>
                    <span className="text-gray-500 text-xs font-bold tracking-wider">LOCKED</span>
                  </div>
                  <div className="text-gray-400 text-sm">Base balance of $5 is protected by smart contracts and cannot be withdrawn.</div>
                </div>

                {/* UI Mockup Block 2 */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group/card hover:bg-black/60 transition-colors cursor-default">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#FF5C38] shadow-[0_0_10px_#FF5C38]"></div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-bold flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#FF5C38]" /> Growth Pool</span>
                    <span className="text-[#FF5C38] text-xs font-bold tracking-wider flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FF5C38] animate-pulse"></span>ACTIVE</span>
                  </div>
                  <div className="text-gray-400 text-sm">Remaining cUSD actively routed through Lending and Arbitrage engines.</div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </main>

      {/* New Landing Page Sections */}
      <ProblemSolutionSection />
      <GrowthEnginesSection />
      <CoreFeaturesSection />
      <TechStackPlanSection />

      {/* Footer Logos Area */}
      <footer className="w-full max-w-[1024px] mx-auto px-6 py-12 border-t border-white/10 text-xs text-gray-400 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="font-semibold">
          AutoPilot Wallet is an AI agent for the Celo ecosystem.
        </div>
        <div className="flex items-center gap-6 font-medium">
          <span className="hover:text-white transition-colors cursor-pointer">MiniPay</span>
          <span className="hover:text-white transition-colors cursor-pointer">Ubeswap</span>
          <span className="hover:text-white transition-colors cursor-pointer">Moola Market</span>
          <span className="hover:text-white transition-colors cursor-pointer">WalletConnect</span>
        </div>
      </footer>

    </div>
  );
}
