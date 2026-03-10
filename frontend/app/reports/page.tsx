"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CalendarDays, ChevronDown, Activity, Sparkles, TrendingUp } from 'lucide-react';
import SpaceBackground from '../components/SpaceBackground';
import Link from 'next/link';

const MOCK_REPORTS = [
    {
        id: "week-3",
        date: "March 3 - March 10",
        summary: "Your agent earned $0.20 this week — $0.16 from lending, $0.04 from arbitrage.",
        details: [
            { label: "Moola Market Yield", amount: "+$0.16", icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> },
            { label: "Ubeswap/Mento Arbitrage", amount: "+$0.04", icon: <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> },
            { label: "Total Actions Taken", amount: "12 Executions", icon: <Activity className="w-3.5 h-3.5 text-blue-400" /> }
        ],
        isOpen: true,
    },
    {
        id: "week-2",
        date: "Feb 24 - March 2",
        summary: "Your agent earned $0.14 this week primarily through Moola Market lending.",
        details: [
            { label: "Moola Market Yield", amount: "+$0.14", icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> },
            { label: "Ubeswap/Mento Arbitrage", amount: "$0.00", icon: <Sparkles className="w-3.5 h-3.5 text-gray-500" /> },
            { label: "Total Actions Taken", amount: "4 Executions", icon: <Activity className="w-3.5 h-3.5 text-blue-400" /> }
        ],
        isOpen: false,
    },
    {
        id: "week-1",
        date: "Feb 17 - Feb 23",
        summary: "Initialization week. Funds secured and first yield generated.",
        details: [
            { label: "Moola Market Yield", amount: "+$0.02", icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> },
            { label: "Safety Floor Lock", amount: "$5.00 Protected", icon: <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> }
        ],
        isOpen: false,
    }
];

export default function ReportsPage() {
    const [reports, setReports] = useState(MOCK_REPORTS);

    const toggleReport = (id: string) => {
        setReports(reports.map(r => ({
            ...r,
            isOpen: r.id === id ? !r.isOpen : r.isOpen
        })));
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
                        Performance Log
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
                    <div className="mx-auto w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                        <CalendarDays className="w-7 h-7 text-blue-400" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tighter mb-2 text-white">
                        Weekly Reports
                    </h1>
                    <p className="text-gray-400 text-sm font-medium max-w-sm mx-auto">
                        A plain-English ledger of everything your agent accomplished while you slept.
                    </p>
                </div>

                <div className="space-y-4">
                    {reports.map((report) => (
                        <div
                            key={report.id}
                            className={`bg-[#0a0a0c]/80 backdrop-blur-xl border ${report.isOpen ? 'border-white/20' : 'border-white/5'} rounded-3xl p-5 sm:p-6 shadow-lg transition-all duration-300 relative overflow-hidden cursor-pointer group hover:bg-white/5`}
                            onClick={() => toggleReport(report.id)}
                        >
                            {report.isOpen && <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]"></div>}

                            <div className="flex items-center justify-between">
                                <h3 className="text-white font-bold tracking-tight">{report.date}</h3>
                                <motion.div
                                    animate={{ rotate: report.isOpen ? 180 : 0 }}
                                    className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center text-gray-400 transition-colors"
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </motion.div>
                            </div>

                            <p className={`text-sm mt-3 leading-relaxed transition-colors ${report.isOpen ? 'text-gray-200' : 'text-gray-500'}`}>
                                "{report.summary}"
                            </p>

                            <AnimatePresence>
                                {report.isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                        animate={{ height: 'auto', opacity: 1, marginTop: 20 }}
                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-4 border-t border-white/10 space-y-3">
                                            {report.details.map((detail, idx) => (
                                                <div key={idx} className="flex justify-between items-center text-xs">
                                                    <div className="flex items-center gap-2 text-gray-400 font-medium">
                                                        {detail.icon} {detail.label}
                                                    </div>
                                                    <div className="font-bold text-white tracking-wide">
                                                        {detail.amount}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

            </motion.div>
        </div>
    );
}
