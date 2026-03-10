import React from 'react';
import { ArrowRightLeft, Landmark, Zap } from 'lucide-react';

const MOCK_ACTIONS = [
    {
        id: 1,
        type: 'arbitrage',
        action: 'Arbitrage Executed',
        detail: 'Ubeswap → Mento +0.8%',
        profit: '+$0.04',
        time: '2m ago',
        icon: <ArrowRightLeft className="w-4 h-4 text-cyan-400" />,
        color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
    },
    {
        id: 2,
        type: 'deposit',
        action: 'Yield Deposit',
        detail: 'Moola Market at 4.2% APY',
        profit: null,
        time: '4h ago',
        icon: <Landmark className="w-4 h-4 text-purple-400" />,
        color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    },
    {
        id: 3,
        type: 'system',
        action: 'Agent Activated',
        detail: 'Safety floor locked at $5.00',
        profit: null,
        time: '4h ago',
        icon: <Zap className="w-4 h-4 text-emerald-400" />,
        color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    }
];

export default function ActionLog() {
    return (
        <div className="w-full bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></span>
                    Agent Activity
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Live</span>
            </div>

            <div className="relative border-l border-white/10 ml-4 space-y-7">
                {MOCK_ACTIONS.map((log) => (
                    <div key={log.id} className="relative pl-6">
                        {/* Timeline dot */}
                        <div className={`absolute top-0 -left-[14px] w-7 h-7 rounded-full flex items-center justify-center ${log.color} border bg-[#0a0a0c] z-10 shadow-sm`}>
                            {log.icon}
                        </div>

                        <div className="flex flex-col gap-1.5 -mt-0.5">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-white tracking-tight">{log.action}</h4>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{log.time}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-medium text-gray-400">{log.detail}</p>
                                {log.profit && (
                                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.15)]">{log.profit}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
