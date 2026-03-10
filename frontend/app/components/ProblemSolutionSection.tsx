"use client";

import React from 'react';
import { Target, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProblemSolutionSection() {
    return (
        <section className="w-full max-w-[1200px] mx-auto sm:px-6 py-16 md:py-24 font-sans text-white">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-24 max-w-4xl mx-auto px-6 sm:px-0"
            >
                <h2 className="text-3xl md:text-6xl font-bold tracking-tighter mb-6 md:mb-8 leading-[1.1]">
                    Billions in idle stablecoins. <br className="hidden md:block" />
                    <span className="text-gray-500">Earning absolutely nothing.</span>
                </h2>
                <p className="text-lg md:text-2xl text-gray-400 font-medium leading-relaxed max-w-3xl mx-auto">
                    Over 1.5 billion people globally have mobile wallets but no access to basic financial growth tools. DeFi protocols exist, but require knowledge most users simply don't have.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 sm:gap-6">

                {/* The Problem Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-[#111113] rounded-none sm:rounded-[2.5rem] p-8 md:p-12 lg:p-16 border-y sm:border border-white/5 flex flex-col justify-between group overflow-hidden relative min-h-[400px] md:min-h-[500px]"
                >
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-red-900/20 transition-all duration-700"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                            </div>
                            <h3 className="text-lg font-bold text-white tracking-widest uppercase">The Problem</h3>
                        </div>

                        <p className="text-2xl md:text-3xl font-semibold leading-tight mb-8">
                            Which pools to use? <br />
                            When to move funds? <br />
                            How to avoid impermanent loss?
                        </p>
                    </div>

                    <div className="relative z-10 mt-auto">
                        <div className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                            <p className="text-gray-300 font-medium italic mb-4 text-lg">
                                "I have cUSD in my MiniPay wallet but I don't know how to make it grow. I'm not a DeFi person."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User242&backgroundColor=1a1a1a" alt="Avatar" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">MiniPay User</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* The Solution Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-gradient-to-br from-[#1a1a1f] to-[#0a0a0c] rounded-none sm:rounded-[2.5rem] p-8 md:p-12 lg:p-16 border-b sm:border border-white/10 flex flex-col justify-between group overflow-hidden relative min-h-[400px] md:min-h-[500px]"
                >
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0071e3]/10 rounded-full blur-[100px] -ml-20 -mb-20 group-hover:bg-[#0071e3]/20 transition-all duration-700"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-full bg-[#0071e3]/20 flex items-center justify-center">
                                <Target className="w-5 h-5 text-[#2997ff]" />
                            </div>
                            <h3 className="text-lg font-bold text-[#2997ff] tracking-widest uppercase">The Solution</h3>
                        </div>

                        <h4 className="text-3xl md:text-5xl font-bold leading-tight mb-4 md:mb-6">
                            An AI agent that <br className="hidden md:block" /> works for you.
                        </h4>

                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-medium">
                            AutoPilot Wallet manages and grows your idle cUSD completely autonomously based on a simple goal set in plain language.
                        </p>
                    </div>

                    <div className="relative z-10 mt-12 grid grid-cols-1 gap-6">
                        <div className="border-t border-white/10 pt-6">
                            <h5 className="font-bold text-white text-lg mb-1">No DeFi knowledge needed</h5>
                            <p className="text-sm text-gray-400">Managed completely automatically behind the scenes.</p>
                        </div>
                        <div className="border-t border-white/10 pt-6">
                            <h5 className="font-bold text-white text-lg mb-1">No manual trading</h5>
                            <p className="text-sm text-gray-400">Agent detects spreads and executes profitable moves.</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
