"use client";

import React from 'react';
import { Shield, Brain, Zap, Key, LayoutDashboard, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
};

export default function CoreFeaturesSection() {
    return (
        <section className="w-full max-w-[1200px] mx-auto px-6 py-24 font-sans text-white border-t border-white/10">

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-20 max-w-3xl mx-auto"
            >
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
                    Agentic power. <br className="hidden md:block" />
                    In your pocket.
                </h2>
                <p className="text-xl text-gray-400 font-medium">
                    AutoPilot is built deeply into the Celo ecosystem, utilizing new standards for agents and autonomous execution.
                </p>
            </motion.div>

            {/* Apple-style Bento Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]"
            >

                {/* Large Feature 1 */}
                <motion.div variants={itemVariants} className="md:col-span-2 bg-[#111113] rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors">
                    <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-500/20 transition-all duration-700"></div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
                            <Brain className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Goal Setting UI</h3>
                            <p className="text-gray-400 font-medium max-w-sm">Set your minimum balance and savings target in plain language. LLM intent parsing handles the rest.</p>
                        </div>
                    </div>
                </motion.div>

                {/* Small Feature 1 */}
                <motion.div variants={itemVariants} className="bg-[#111113] rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors flex flex-col justify-between">
                    <div className="w-12 h-12 rounded-full bg-[#0071e3]/20 flex items-center justify-center mb-6">
                        <Key className="w-6 h-6 text-[#0071e3]" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Wallet Auth</h3>
                        <p className="text-gray-400 font-medium">MiniPay or WalletConnect. No accounts.</p>
                    </div>
                </motion.div>

                {/* Small Feature 2 */}
                <motion.div variants={itemVariants} className="bg-[#111113] rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors flex flex-col justify-between">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                        <Shield className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Agent Identity</h3>
                        <p className="text-gray-400 font-medium">On-chain reputation via ERC-8004.</p>
                    </div>
                </motion.div>

                {/* Large Feature 2 */}
                <motion.div variants={itemVariants} className="md:col-span-2 bg-[#111113] rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors">
                    <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-[#FF5C38]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#FF5C38]/20 transition-all duration-700"></div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="w-12 h-12 rounded-full bg-[#FF5C38]/20 flex items-center justify-center mb-6">
                            <Zap className="w-6 h-6 text-[#FF5C38]" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Autonomous Execution</h3>
                            <p className="text-gray-400 font-medium max-w-sm">x402 payment protocol lets the agent execute deposits, withdrawals, and trades without constant sign-offs.</p>
                        </div>
                    </div>
                </motion.div>

                {/* Small Feature 3 */}
                <motion.div variants={itemVariants} className="bg-[#111113] rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors flex flex-col justify-between">
                    <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-6">
                        <LayoutDashboard className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Dashboard</h3>
                        <p className="text-gray-400 font-medium">Simple UI showing all your earnings.</p>
                    </div>
                </motion.div>

                {/* Small Feature 4 */}
                <motion.div variants={itemVariants} className="md:col-span-2 bg-[#111113] rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                            <FileText className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Plain Language Reports</h3>
                            <p className="text-gray-400 font-medium">"Your agent earned $2.10 this week."</p>
                        </div>
                    </div>
                </motion.div>

            </motion.div>

        </section>
    );
}
