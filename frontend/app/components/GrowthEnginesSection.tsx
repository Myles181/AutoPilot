"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GrowthEnginesSection() {
    return (
        <section className="w-full max-w-[1200px] mx-auto px-6 py-24 font-sans text-white border-t border-white/10">

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-24 max-w-3xl mx-auto"
            >
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
                    Two engines. <br className="hidden md:block" />
                    One smooth ride.
                </h2>
                <p className="text-xl text-gray-400 font-medium">
                    AutoPilot uses two autonomous strategies to grow idle cUSD safely and consistently, without ever risking your base balance.
                </p>
            </motion.div>

            <div className="space-y-6">

                {/* Engine 1 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-[#111113] rounded-[3rem] p-10 md:p-20 border border-white/5 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

                    <div className="flex-1 w-full relative z-10">
                        <div className="text-sm font-bold tracking-widest text-emerald-500 uppercase mb-4">Lending Engine</div>
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Stable, <br />low-risk yield.</h3>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed mb-8 max-w-lg">
                            The agent deposits idle cUSD into Celo lending protocols like Moola Market. You earn yield paid out in cUSD directly, with absolutely zero price-volatility risk.
                        </p>
                        <button className="flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition group/btn">
                            Explore Lending <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="flex-1 w-full relative z-10">
                        <div className="w-full aspect-square md:aspect-[4/3] bg-black rounded-3xl border border-white/10 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/20"></div>
                            <div className="relative z-10 text-emerald-500 font-bold text-sm tracking-wider uppercase mb-8">Live Feed</div>

                            <div className="space-y-4 relative z-10">
                                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                                    <div className="text-xs text-gray-400 mb-1">Deposit Executed</div>
                                    <div className="text-xl font-bold text-white">+ 20.00 cUSD to Moola</div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 ml-8">
                                    <div className="text-xs text-gray-400 mb-1">Yield Earned (7 Days)</div>
                                    <div className="text-xl font-bold text-emerald-400">+ 1.40 cUSD</div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                                    <div className="text-xs text-gray-400 mb-1">Safety Floor Triggered</div>
                                    <div className="text-xl font-bold text-white">Auto-withdrawal generated</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Engine 2 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-[#111113] rounded-[3rem] p-10 md:p-20 border border-white/5 flex flex-col md:flex-row-reverse items-center gap-12 relative overflow-hidden group"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF5C38]/5 rounded-full blur-[120px] pointer-events-none"></div>

                    <div className="flex-1 w-full relative z-10">
                        <div className="text-sm font-bold tracking-widest text-[#FF5C38] uppercase mb-4">Arbitrage Engine</div>
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Instant, <br />profitable spreads.</h3>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed mb-8 max-w-lg">
                            Scans Celo DEXes 24/7 for price inefficiencies. When a profitable spread is detected above your safety threshold, it executes trades returning more cUSD to your wallet instantly.
                        </p>
                        <button className="flex items-center gap-2 text-[#FF5C38] font-bold hover:text-orange-400 transition group/btn">
                            Explore Arbitrage <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="flex-1 w-full relative z-10">
                        <div className="w-full aspect-square md:aspect-[4/3] bg-black rounded-3xl border border-white/10 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FF5C38]/10"></div>
                            <div className="relative z-10 text-[#FF5C38] font-bold text-sm tracking-wider uppercase mb-8">DEX Scanner</div>

                            <div className="space-y-4 relative z-10">
                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <div className="text-lg font-bold text-white">Ubeswap <span className="text-gray-500 text-sm font-medium mx-2">0.992</span></div>
                                    <div className="text-[#FF5C38] font-bold animate-pulse">+0.8% SPREAD</div>
                                </div>
                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <div className="text-lg font-bold text-white">Mento <span className="text-gray-500 text-sm font-medium mx-2">1.000</span></div>
                                </div>
                                <div className="mt-8 bg-[#FF5C38] rounded-2xl p-4 text-center">
                                    <div className="text-white font-bold text-lg">Execute Trade: +$0.04 Profit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
