"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ShieldAlert, ZapOff } from 'lucide-react';
import SpaceBackground from '../components/SpaceBackground';
import Link from 'next/link';

export default function VaultPage() {
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [isWithdrawing, setIsWithdrawing] = useState(false);

    const totalBalance = 25.04;
    const growthPool = 20.04;
    const safetyFloor = 5.00;

    const handleWithdraw = () => {
        if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
        setIsWithdrawing(true);
        setTimeout(() => setIsWithdrawing(false), 2000);
    };

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
                        Vault
                    </div>
                    <div className="w-[84px]"></div> {/* Spacer */}
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[500px] relative z-10 mb-20"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold tracking-tighter mb-2 text-white">
                        Withdraw Funds
                    </h1>
                    <p className="text-gray-400 text-sm font-medium max-w-sm mx-auto">
                        Pull funds out of AutoPilot's smart contract back into your Celo MiniPay wallet.
                    </p>
                </div>

                {/* Locked vs Available Overview */}
                <div className="flex gap-4 mb-8">
                    <div className="flex-1 bg-[#0a0a0c]/80 bg-gradient-to-br from-[#00ff88]/5 to-transparent backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col justify-center">
                        <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Liquid</span>
                        <span className="text-white text-2xl font-black">${growthPool.toFixed(2)}</span>
                    </div>
                    <div className="flex-1 bg-[#0a0a0c]/80 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col justify-center opacity-70">
                        <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-1">Locked (Floor) <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mb-0.5"></div></span>
                        <span className="text-white text-2xl font-black">${safetyFloor.toFixed(2)}</span>
                    </div>
                </div>

                {/* Withdrawal Form */}
                <div className="bg-[#0a0a0c]/80 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all mb-6">

                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-gray-400 tracking-tight uppercase">Amount (cUSD)</span>
                        <button onClick={() => setWithdrawAmount(growthPool.toString())} className="text-[10px] font-bold tracking-widest uppercase bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md transition-colors text-white">Max Liquid</button>
                    </div>

                    <div className="relative flex items-center mb-6 border-b border-white/10 pb-2 focus-within:border-white/50 transition-colors">
                        <span className="text-4xl font-light text-gray-400 mr-2">$</span>
                        <input
                            type="number"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            placeholder="0.00"
                            max={growthPool}
                            className="w-full bg-transparent text-5xl font-black text-white focus:outline-none placeholder:text-white/20"
                        />
                    </div>

                    <button
                        onClick={handleWithdraw}
                        disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > growthPool}
                        className="w-full bg-white disabled:bg-white/10 disabled:text-gray-500 text-black px-6 py-4 rounded-full font-black text-lg hover:bg-gray-200 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] disabled:shadow-none flex justify-center items-center gap-2 group"
                    >
                        {isWithdrawing ? (
                            <span className="inline-block w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        ) : (
                            <>
                                <ArrowUpRight className="w-5 h-5 group-disabled:opacity-50" />
                                Withdraw to Wallet
                            </>
                        )}
                    </button>
                </div>

                {/* Panic Action */}
                <div className="mt-12 p-5 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/30 rounded-3xl transition-colors cursor-pointer group">
                    <div className="flex items-start gap-4">
                        <div className="bg-red-500/10 p-2.5 rounded-xl text-red-500 shrink-0 mt-0.5">
                            <ShieldAlert className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-red-500 font-bold text-sm tracking-tight mb-1 flex items-center gap-1.5">
                                <ZapOff className="w-3.5 h-3.5" /> Stop Agent & Withdraw All
                            </h3>
                            <p className="text-red-400/70 text-xs leading-relaxed">
                                This immediately revokes x402 permissions, halting all lending and trading. The full ${totalBalance.toFixed(2)} balance (including the safety floor) will be released to your wallet.
                            </p>
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
