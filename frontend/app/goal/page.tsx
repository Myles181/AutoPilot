"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, Activity, ShieldCheck, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import SpaceBackground from '../components/SpaceBackground';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function GoalPage() {
    const [intent, setIntent] = useState("");
    const [isConfirming, setIsConfirming] = useState(false);
    const router = useRouter();

    const handleNext = () => {
        if (!intent.trim()) return;
        setIsConfirming(true);
    };

    const handleConfirm = () => {
        router.push('/dashboard');
    };

    return (
        <div className="min-h-[100dvh] bg-black text-white font-sans selection:bg-emerald-500 selection:text-white relative flex flex-col items-center justify-center p-4 overflow-hidden">
            <SpaceBackground />

            {/* Top Nav (simplified for sub-pages) */}
            <div className="absolute top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-auto w-full max-w-[800px] h-12 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full flex items-center px-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] justify-between"
                >
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-1 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
                    </Link>
                    <div className="mx-auto text-white/50 text-[11px] font-bold tracking-widest uppercase">
                        Intent Setup
                    </div>
                    <div className="w-[52px]"></div> {/* Spacer to keep title centered */}
                </motion.div>
            </div>

            <AnimatePresence mode="wait">
                {!isConfirming ? (
                    <motion.div
                        key="input-step"
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-[500px] relative z-10 mt-12"
                    >
                        <div className="text-left md:text-center mb-8 px-2">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
                                What's your goal?
                            </h1>
                            <p className="text-gray-400 font-medium text-lg leading-relaxed">
                                Tell AutoPilot how you want to manage your cUSD. Use plain English.
                            </p>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 rounded-[2rem] blur opacity-30 group-focus-within:opacity-100 group-focus-within:duration-200 transition duration-500"></div>
                            <div className="relative bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-5 shadow-2xl overflow-hidden focus-within:border-emerald-500/50 transition-colors">

                                <textarea
                                    value={intent}
                                    onChange={(e) => setIntent(e.target.value)}
                                    placeholder="e.g. Save $20 a month, grow the rest, never let my balance drop below $5."
                                    className="w-full bg-transparent text-white text-xl md:text-2xl font-serif placeholder:text-gray-700 outline-none resize-none h-32 md:h-40 leading-relaxed custom-scrollbar"
                                    autoFocus
                                />

                                <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-4">
                                    <div className="text-xs text-emerald-500/70 font-bold tracking-wider uppercase flex items-center gap-1.5">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        AI parsing
                                    </div>
                                    <button
                                        onClick={handleNext}
                                        disabled={!intent.trim()}
                                        className="bg-white disabled:bg-white/10 disabled:text-gray-500 text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:pointer-events-none disabled:shadow-none"
                                    >
                                        Review <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-8 justify-start md:justify-center px-2">
                            {[
                                "Save $20 a month, grow the rest.",
                                "Keep $10 minimum, max yield.",
                                "Conservative growth only."
                            ].map((suggestion) => (
                                <button
                                    key={suggestion}
                                    onClick={() => setIntent(suggestion)}
                                    className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-300 text-xs font-medium px-4 py-2 rounded-full transition-all active:scale-95"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>

                    </motion.div>
                ) : (
                    <motion.div
                        key="confirm-step"
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-[500px] relative z-10 mt-12"
                    >
                        <div className="text-center mb-10">
                            <div className="mx-auto w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tighter mb-3 text-white">
                                Intent Parsed
                            </h1>
                            <p className="text-gray-400 text-lg">
                                Here is how AutoPilot will manage your cUSD.
                            </p>
                        </div>

                        <div className="space-y-4 mb-10">
                            {/* Parsed Rule 1 */}
                            <div className="bg-[#0a0a0c]/80 bg-gradient-to-br from-emerald-500/10 to-transparent backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-lg relative overflow-hidden">
                                <div className="flex items-start gap-5">
                                    <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-400 shrink-0">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1 tracking-tight">Safety Floor: $5.00</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Your base balance is protected by smart contracts and cannot be withdrawn or traded.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Parsed Rule 2 */}
                            <div className="bg-[#0a0a0c]/80 bg-gradient-to-br from-[#FF5C38]/10 to-transparent backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-lg relative overflow-hidden">
                                <div className="flex items-start gap-5">
                                    <div className="bg-[#FF5C38]/10 p-3 rounded-2xl text-[#FF5C38] shrink-0">
                                        <Activity className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1 tracking-tight">Strategy: Active Yield</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">All idle balance above $5 will be actively routed to Moola Market and Ubeswap for yield and arbitrage.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleConfirm}
                                className="w-full bg-white text-black px-6 py-4 rounded-full font-black text-lg hover:bg-gray-200 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] flex justify-center items-center gap-2"
                            >
                                Deploy AutoPilot <ChevronRight className="w-5 h-5 ml-1" />
                            </button>
                            <button
                                onClick={() => setIsConfirming(false)}
                                className="w-full bg-transparent text-gray-500 hover:text-white px-6 py-3 rounded-full font-bold text-sm transition-colors"
                            >
                                Cancel
                            </button>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
