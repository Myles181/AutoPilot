"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Wallet, Settings, ArrowUpRight } from 'lucide-react';
import SpaceBackground from '../components/SpaceBackground';
import AgentStatusBadge from '../components/AgentStatusBadge';
import AllocationCard from '../components/AllocationCard';
import ActionLog from '../components/ActionLog';
import WeeklyReportBanner from '../components/WeeklyReportBanner';
import Link from 'next/link';

export default function Dashboard() {
    return (
        <div className="min-h-[100dvh] bg-black text-white font-sans selection:bg-emerald-500 selection:text-white relative flex flex-col p-4 md:p-6 overflow-hidden">
            <SpaceBackground />

            <div className="relative z-10 max-w-[600px] mx-auto w-full pt-4 pb-24">

                {/* Header */}
                <header className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center shadow-inner">
                            <Wallet className="w-5 h-5 text-gray-300" />
                        </div>
                        <div>
                            <h1 className="text-white font-bold tracking-tight text-lg leading-none mb-0.5">AutoPilot</h1>
                            <span className="text-[9px] text-[#00ff88] font-black uppercase tracking-widest leading-none flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]"></span> MiniPay Connected
                            </span>
                        </div>
                    </div>
                    <Link href="/settings" className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center transition-colors">
                        <Settings className="w-5 h-5 text-gray-400" />
                    </Link>
                </header>

                {/* Main Balance Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center py-6 mb-8"
                >
                    <AgentStatusBadge />

                    <div className="mt-8 text-center flex flex-col items-center">
                        <h2 className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase mb-2">Total Managed Balance</h2>
                        <div className="text-[4.5rem] sm:text-[5.5rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 leading-none">
                            $25.04
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-6 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                        >
                            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm font-semibold text-gray-300">Total Yield: <span className="text-emerald-400 font-bold ml-0.5">+$0.04</span></span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Allocation vs Growth Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-6"
                >
                    <AllocationCard />
                </motion.div>

                {/* Weekly Report Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-6"
                >
                    <WeeklyReportBanner />
                </motion.div>

                {/* Action Log Widget */}
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <ActionLog />
                </motion.div>

            </div>

            {/* Floating Bottom Navigation (simulating app structure) */}
            <div className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
                <div className="pointer-events-auto flex items-center gap-2 bg-[#0a0a0c]/80 backdrop-blur-3xl border border-white/10 p-2 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                    <Link href="/dashboard" className="flex items-center justify-center w-14 h-14 bg-white/10 border border-white/5 rounded-full text-white shadow-inner transition-colors">
                        <LayoutDashboard className="w-6 h-6" />
                    </Link>
                    <Link href="/vault" className="flex items-center justify-center w-14 h-14 hover:bg-white/5 rounded-full text-gray-500 transition-colors">
                        <Wallet className="w-6 h-6" />
                    </Link>
                    <Link href="/settings" className="flex items-center justify-center w-14 h-14 hover:bg-white/5 rounded-full text-gray-500 transition-colors">
                        <Settings className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
