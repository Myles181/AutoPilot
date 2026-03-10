"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import SpaceBackground from '../components/SpaceBackground';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DepositPage() {
    const [amount, setAmount] = useState("");
    const router = useRouter();

    const handleDeposit = () => {
        if (!amount || parseFloat(amount) <= 0) return;
        router.push('/goal');
    };

    return (
        <div className="min-h-[100dvh] bg-black text-white font-sans selection:bg-[#0071e3] selection:text-white relative flex flex-col items-center justify-center p-4 overflow-hidden">
            <SpaceBackground />

            {/* Top Nav (simplified for sub-pages) */}
            <div className="absolute top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-auto w-full max-w-[800px] h-12 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full flex items-center px-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] justify-between"
                >
                    <Link href="/auth" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-1 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
                    </Link>
                    <div className="mx-auto text-white/50 text-[11px] font-bold tracking-widest uppercase">
                        Deposit cUSD
                    </div>
                    <div className="w-[52px]"></div> {/* Spacer to keep title centered */}
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[500px] relative z-10 mt-12"
            >
                <div className="text-center mb-10">
                    <div className="mx-auto w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <span className="text-2xl font-serif text-white">$</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-white">
                        Fund your agent.
                    </h1>
                    <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-sm mx-auto">
                        Deposit cUSD into your autonomous smart contract to begin earning yield.
                    </p>
                </div>

                <div className="bg-[#0a0a0c]/80 bg-gradient-to-br from-[#0071e3]/10 to-transparent backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden group hover:border-white/20 hover:from-[#0071e3]/15 transition-all mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-400 tracking-tight uppercase">Amount (cUSD)</span>
                        <span className="text-xs font-medium text-gray-500 flex items-center gap-1">Wallet Bal: <span className="text-white font-bold">$142.50</span></span>
                    </div>

                    <div className="relative flex items-center mb-6 border-b border-white/10 pb-2 group-focus-within:border-[#0071e3]/50 transition-colors">
                        <span className="text-4xl font-light text-gray-400 mr-2">$</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-transparent text-5xl font-black text-white focus:outline-none placeholder:text-white/20"
                            autoFocus
                        />
                    </div>

                    <div className="flex gap-2">
                        {["25", "50", "100", "Max"].map((shortcut) => (
                            <button
                                key={shortcut}
                                onClick={() => setAmount(shortcut === "Max" ? "142.50" : shortcut)}
                                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold py-2.5 rounded-xl transition-colors"
                            >
                                {shortcut !== "Max" && "$"}{shortcut}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-start gap-4 mb-10 px-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
                        Your funds are secured by audited smart contracts. You can withdraw your balance at any time directly back to your connected Celo wallet.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleDeposit}
                        disabled={!amount || parseFloat(amount) <= 0}
                        className="w-full bg-white disabled:bg-white/10 disabled:text-gray-500 text-black px-6 py-4 rounded-full font-black text-lg hover:bg-gray-200 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] disabled:shadow-none flex justify-center items-center gap-2 group"
                    >
                        <Zap className="w-5 h-5 text-yellow-500 group-disabled:text-gray-500" />
                        Deposit to AutoPilot
                        <ArrowRight className="w-5 h-5 group-disabled:opacity-50" />
                    </button>

                    <button
                        onClick={() => router.push('/dashboard')}
                        className="w-full bg-transparent text-gray-400 hover:text-white px-6 py-3 rounded-full font-bold text-sm transition-colors"
                    >
                        Skip for now
                    </button>
                </div>

            </motion.div>
        </div>
    );
}
