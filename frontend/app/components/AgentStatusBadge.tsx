import React from 'react';

export default function AgentStatusBadge() {
    return (
        <div className="inline-flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-emerald-400 text-[11px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            Agent Active
        </div>
    );
}
