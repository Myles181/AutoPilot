import React from 'react';
import { CalendarDays, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function WeeklyReportBanner() {
    return (
        <Link href="/reports" className="block w-full bg-[#0a0a0c]/80 bg-gradient-to-br from-blue-500/10 to-transparent backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex items-center justify-between cursor-pointer hover:border-white/20 hover:from-blue-500/15 transition-all group shadow-lg relative overflow-hidden">
            <div className="flex items-center gap-4 pl-3">
                <div className="bg-blue-500/10 p-2.5 rounded-xl text-blue-400 shrink-0">
                    <CalendarDays className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm tracking-tight mb-0.5">Weekly Report Ready</h4>
                    <p className="text-gray-400 text-xs leading-relaxed max-w-[220px] sm:max-w-[400px] truncate sm:whitespace-normal">
                        "Your agent earned $0.20 this week — $0.16 from lending, $0.04 from arbitrage."
                    </p>
                </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-all shrink-0">
                <ChevronRight className="w-4 h-4" />
            </div>
        </Link>
    );
}
