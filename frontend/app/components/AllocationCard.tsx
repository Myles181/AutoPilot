import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

export default function AllocationCard() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Safety Floor Card */}
            <div className="bg-[#0a0a0c]/80 bg-gradient-to-br from-emerald-500/10 to-transparent backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-lg relative overflow-hidden group hover:border-white/20 hover:from-emerald-500/15 transition-all">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/10 p-2.5 rounded-2xl text-emerald-400">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="text-white font-bold tracking-tight">Safety Floor</span>
                    </div>
                    <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase bg-white/5 border border-white/5 px-2 py-1 rounded-md">Locked</span>
                </div>
                <div className="text-3xl font-black text-white mb-2 tracking-tighter">$5.00</div>
                <div className="text-gray-400 text-xs leading-relaxed font-medium">Base balance protected.<br />Agent cannot withdraw.</div>
            </div>

            {/* Growth Pool Card */}
            <div className="bg-[#0a0a0c]/80 bg-gradient-to-br from-[#FF5C38]/10 to-transparent backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-lg relative overflow-hidden group hover:border-white/20 hover:from-[#FF5C38]/15 transition-all">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#FF5C38]/10 p-2.5 rounded-2xl text-[#FF5C38]">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-white font-bold tracking-tight">Growth Pool</span>
                    </div>
                    <span className="text-[#FF5C38] text-[10px] font-bold tracking-widest uppercase bg-[#FF5C38]/10 border border-[#FF5C38]/20 px-2 py-1 rounded-md flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5C38] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF5C38]"></span>
                        </span>
                        Deploying
                    </span>
                </div>
                <div className="text-3xl font-black text-white mb-2 tracking-tighter">$20.00</div>
                <div className="text-gray-400 text-xs leading-relaxed font-medium">Actively routed through<br />Lending & Arbitrage.</div>
            </div>
        </div>
    );
}
