"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Wallet } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ─── Google Icon (SVG) ────────────────────────────────────────────────────────
const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

// ─── Celo Logo (SVG) ─────────────────────────────────────────────────────────
const CeloIcon = () => (
    <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true" fill="none">
        <circle cx="16" cy="16" r="16" fill="#FCFF52" />
        <circle cx="16" cy="16" r="9" stroke="#1A1A1A" strokeWidth="3" fill="none" />
        <circle cx="16" cy="7" r="3" fill="#1A1A1A" />
        <circle cx="16" cy="25" r="3" fill="#1A1A1A" />
    </svg>
);

// ─── Tab type ─────────────────────────────────────────────────────────────────
type AuthTab = "login" | "signup";

export default function AuthPage() {
    const [tab, setTab] = useState<AuthTab>("login");
    const [walletConnecting, setWalletConnecting] = useState(false);
    const router = useRouter();

    const handleWalletConnect = () => {
        setWalletConnecting(true);
        // UI only — simulate brief loading state
        setTimeout(() => {
            setWalletConnecting(false);
            router.push('/deposit');
        }, 1800);
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-center items-center p-4 relative overflow-hidden">

            {/* Premium Ambient Background (Like other sections) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0071e3]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

            {/* Apple-style Nav / Back Button */}
            <Link
                href="/"
                className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors z-20 group"
            >
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
                <span className="font-semibold tracking-tight hidden sm:block">Back to AutoPilot</span>
            </Link>


            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[480px] bg-[#111113]/90 backdrop-blur-3xl rounded-[2.5rem] sm:rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-[0_0_100px_rgba(0,0,0,1)] relative z-10 flex flex-col items-center"
            >
                {/* ── Logo Header ───────────────────────────────────────── */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a1a1f] to-[#0d0d0f] border border-white/10 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] mb-8 relative">
                    <div className="absolute inset-0 rounded-full bg-white/5 blur-md" />
                    <Layers className="w-8 h-8 text-white relative z-10" />
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-white mb-2 text-center">
                    {tab === "login" ? "Welcome back." : "Start growing."}
                </h1>
                <p className="text-gray-400 font-medium text-center mb-8">
                    {tab === "login" ? "Sign in to your autonomous wallet." : "Create your autonomous wallet."}
                </p>

                {/* ── Tabs ──────────────────────────────────────────────────── */}
                <div className="flex w-full bg-black/40 p-1.5 rounded-full mb-8 border border-white/5">
                    {(["login", "signup"] as AuthTab[]).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`flex-1 py-2.5 text-sm font-semibold tracking-tight transition-all rounded-full relative ${tab === t ? "text-black" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {tab === t && (
                                <motion.div
                                    layoutId="auth-tab-bg"
                                    className="absolute inset-0 bg-white rounded-full"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">
                                {t === "login" ? "Sign In" : "Create Account"}
                            </span>
                        </button>
                    ))}
                </div>

                {/* ── Social / Web3 Logins ─────────────────────────── */}
                <div className="w-full space-y-3 mb-8">
                    <motion.button
                        onClick={handleWalletConnect}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-3 bg-[#FCFF52]/5 hover:bg-[#FCFF52]/10 border border-[#FCFF52]/20 hover:border-[#FCFF52]/40 text-white rounded-2xl px-4 py-4 font-semibold transition-all duration-200"
                    >
                        <CeloIcon />
                        <span>
                            {walletConnecting ? (
                                <span className="flex items-center gap-2">
                                    <span className="inline-block w-4 h-4 border-2 border-[#FCFF52]/60 border-t-[#FCFF52] rounded-full animate-spin" />
                                    Connecting…
                                </span>
                            ) : (
                                "Connect Celo Wallet"
                            )}
                        </span>
                        {!walletConnecting && <Wallet className="w-4 h-4 text-[#FCFF52]/60 ml-auto" />}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-white rounded-2xl px-4 py-4 font-semibold transition-all duration-200"
                    >
                        <GoogleIcon />
                        {tab === "login" ? "Continue with Google" : "Sign up with Google"}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
