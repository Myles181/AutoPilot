"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, Key, Layers, Activity, Server, AlertCircle, CheckCircle2 } from 'lucide-react';
import SpaceBackground from '../components/SpaceBackground';
import Link from 'next/link';

export default function SettingsPage() {
    const [arbEnabled, setArbEnabled] = useState(true);
    const [lendingEnabled, setLendingEnabled] = useState(true);
    const [restarting, setRestarting] = useState(false);

    const simulateRestart = () => {
        setRestarting(true);
        setTimeout(() => setRestarting(false), 2000);
    }

    return (
        <div className="min-h-[100dvh] bg-black text-white font-sans selection:bg-[#0071e3] selection:text-white relative flex flex-col items-center justify-start pt-24 p-4 overflow-hidden scroll-smooth">
            <SpaceBackground />

            {/* Top Nav */}
            <div className="absolute top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-auto w-full max-w-[800px] h-12 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full flex items-center px-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] justify-between"
                >
                    <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-1 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Dashboard
                    </Link>
                    <div className="mx-auto text-white/50 text-[11px] font-bold tracking-widest uppercase">
                        Agent Configuration
                    </div>
                    <div className="w-[84px]"></div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[500px] relative z-10 mb-20"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex w-16 h-16 bg-white/5 border border-white/10 rounded-full items-center justify-center mb-6 shadow-inner relative">
                        <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-md" />
                        <Server className="w-8 h-8 text-white relative z-10" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tighter mb-2 text-white">
                        System Identity
                    </h1>
                    <p className="text-gray-400 text-sm font-medium max-w-sm mx-auto">
                        Manage your autonomous agent's on-chain execution and internal growth engines.
                    </p>
                </div>

                {/* Identity Hash Block */}
                <div className="bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all mb-6">
                    <h3 className="text-sm font-bold text-gray-400 tracking-tight uppercase mb-4 flex items-center gap-2">
                        <Key className="w-4 h-4 text-emerald-400" /> ERC-8004 Registry Hash
                    </h3>
                    <div className="bg-black/50 border border-white/5 p-4 rounded-xl font-mono text-xs text-emerald-400/80 break-all leading-relaxed shadow-inner">
                        0x7F9B2e257B4Fe24cB3e45A394d6F3aE36D9bF597
                    </div>
                    <p className="text-[10px] text-gray-500 mt-3 font-medium uppercase tracking-widest text-center flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Active on Celo Mainnet
                    </p>
                </div>

                {/* Growth Engines Toggles */}
                <div className="bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all mb-6">
                    <h3 className="text-sm font-bold text-gray-400 tracking-tight uppercase mb-6 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#0071e3]" /> Growth Engines
                    </h3>

                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
                        <div>
                            <div className="text-white font-bold tracking-tight mb-1">Lending Oracle</div>
                            <div className="text-gray-400 text-xs font-medium max-w-[200px] leading-relaxed">Routes idle cUSD to Moola Market for stable yield.</div>
                        </div>
                        {/* Custom Toggle 1 */}
                        <button
                            onClick={() => setLendingEnabled(!lendingEnabled)}
                            className={`w-12 h-6 rounded-full relative transition-colors ${lendingEnabled ? 'bg-emerald-500' : 'bg-white/10'}`}
                        >
                            <motion.div
                                className="w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5"
                                animate={{ left: lendingEnabled ? '26px' : '2px' }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-white font-bold tracking-tight mb-1">DEX Arbitrage</div>
                            <div className="text-gray-400 text-xs font-medium max-w-[200px] leading-relaxed">Executes multi-hop trades when spreads exceed 0.5%.</div>
                        </div>
                        {/* Custom Toggle 2 */}
                        <button
                            onClick={() => setArbEnabled(!arbEnabled)}
                            className={`w-12 h-6 rounded-full relative transition-colors ${arbEnabled ? 'bg-emerald-500' : 'bg-white/10'}`}
                        >
                            <motion.div
                                className="w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5"
                                animate={{ left: arbEnabled ? '26px' : '2px' }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                    </div>
                    {(!arbEnabled || !lendingEnabled) && (
                        <div className="mt-6 flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl">
                            <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-yellow-500/80 leading-relaxed font-medium">Disabling core engines may drastically reduce the agent's ability to achieve your stated accumulation goals.</p>
                        </div>
                    )}
                </div>

                {/* Intent Redirection */}
                <Link href="/goal" className="w-full bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center justify-between group hover:border-white/30 transition-all mb-10 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                            <Activity className="w-4 h-4 text-gray-300" />
                        </div>
                        <div className="font-bold text-sm text-white">Update Agent Intent</div>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-500 rotate-180 group-hover:text-white transition-colors" />
                </Link>

                {/* Reboot Agent Action */}
                <div className="flex justify-center">
                    <button
                        onClick={simulateRestart}
                        disabled={restarting}
                        className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${restarting ? 'animate-spin' : ''}`} />
                        {restarting ? 'Rebooting Engine...' : 'Force System Reboot'}
                    </button>
                </div>

            </motion.div>
        </div>
    );
}
