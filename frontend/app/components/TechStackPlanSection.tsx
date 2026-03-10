"use client";

import React from 'react';
import { Database, Network, Code2, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const techFeatures = [
    {
        category: "On-Chain Intelligence",
        icon: <Database className="w-6 h-6 text-white" />,
        items: [
            "Autonomous smart contracts",
            "ERC-8004 persistent identity",
            "x402 permissionless execution"
        ]
    },
    {
        category: "DeFi Infrastructure",
        icon: <Network className="w-6 h-6 text-white" />,
        items: [
            "Moola Market API integration",
            "Ubeswap & Mento monitoring",
            "Viem/Ethers.js execution layer"
        ]
    },
    {
        category: "Intelligent Interface",
        icon: <Code2 className="w-6 h-6 text-white" />,
        items: [
            "LLM intent parsing",
            "MiniPay SDK deep integration",
            "Reactive frontend architecture"
        ]
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
};

export default function TechStackPlanSection() {
    return (
        <section className="w-full max-w-[1200px] mx-auto px-6 py-24 font-sans text-white border-t border-white/10 mt-10">

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-24 max-w-3xl mx-auto"
            >
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
                    Radically advanced. <br className="hidden md:block" />
                    Relentlessly secure.
                </h2>
                <p className="text-xl text-gray-400 font-medium">
                    AutoPilot combines advanced AI intent parsing with robust on-chain Celo primitives to deliver a seamless financial experience.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
            >
                {techFeatures.map((stack, idx) => (
                    <motion.div variants={itemVariants} key={idx} className="bg-[#111113] rounded-[2.5rem] p-10 border border-white/5 flex flex-col h-full group hover:border-white/20 transition-all">

                        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-8">
                            {stack.icon}
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-6">{stack.category}</h3>

                        <ul className="space-y-4 flex-1">
                            {stack.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-400 font-medium">
                                    • {item}
                                </li>
                            ))}
                        </ul>

                    </motion.div>
                ))}
            </motion.div>

            {/* Security Banner Apple Style */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-black rounded-[3rem] p-12 md:p-20 flex flex-col items-center text-center border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)] relative overflow-hidden group"
            >

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700"></div>

                <ShieldCheck className="w-20 h-20 text-emerald-400 mb-8 relative z-10" />

                <h4 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10 tracking-tight">Enterprise-Grade Security.</h4>
                <p className="text-xl text-gray-400 font-medium max-w-2xl mb-10 relative z-10">
                    Smart contracts enforce your absolute safety floor. The agent mathematically cannot withdraw below your requested limit.
                </p>

                <button className="relative z-10 flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition group/btn text-lg">
                    Review the Audit <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </motion.div>

        </section>
    );
}
