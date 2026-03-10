"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function SpaceBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Generate random stars only once
    const stars = useMemo(() => {
        const generateStars = (count: number, maxRadius: number) => {
            return Array.from({ length: count }).map((_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                r: Math.random() * maxRadius + 1, // Increased minimum size
                opacity: Math.random() * 0.8 + 0.2,
                duration: Math.random() * 4 + 2, // Twinkle duration
                delay: Math.random() * 5, // Twinkle delay
            }));
        };

        return {
            small: generateStars(200, 1.5),
            medium: generateStars(100, 2),
            large: generateStars(50, 3),
        };
    }, []);

    if (!mounted) {
        return (
            <div className="fixed inset-0 bg-[#050505] pointer-events-none -z-10 overflow-hidden" />
        );
    }

    return (
        <div className="fixed inset-0 bg-[#050505] pointer-events-none -z-10 overflow-hidden">
            {/* Nebulas / Glows */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, ease: "easeOut", delay: 0.5 }}
                className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[150px]"
            />

            {/* Starfield SVG */}
            <svg className="absolute inset-0 w-full h-full z-0" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="white" stopOpacity="1" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {stars.small.map((star) => (
                    <circle
                        key={`s-${star.id}`}
                        cx={`${star.x}%`}
                        cy={`${star.y}%`}
                        r={star.r}
                        fill="white"
                        opacity={star.opacity}
                        className="animate-twinkle"
                        style={{
                            animationDuration: `${star.duration}s`,
                            animationDelay: `${star.delay}s`,
                        }}
                    />
                ))}

                {stars.medium.map((star) => (
                    <circle
                        key={`m-${star.id}`}
                        cx={`${star.x}%`}
                        cy={`${star.y}%`}
                        r={star.r}
                        fill="#e0e7ff"
                        opacity={star.opacity}
                        className="animate-twinkle"
                        style={{
                            animationDuration: `${star.duration}s`,
                            animationDelay: `${star.delay}s`,
                        }}
                    />
                ))}

                {stars.large.map((star) => (
                    <circle
                        key={`l-${star.id}`}
                        cx={`${star.x}%`}
                        cy={`${star.y}%`}
                        r={star.r}
                        fill="url(#star-glow)"
                        opacity={star.opacity}
                        className="animate-twinkle"
                        style={{
                            animationDuration: `${star.duration * 1.5}s`,
                            animationDelay: `${star.delay}s`,
                        }}
                    />
                ))}
            </svg>

            {/* Gradient Overlay for bottom blending */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.1)] to-black z-10 pointer-events-none" />

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes twinkle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.2; }
        }
        .animate-twinkle {
            animation: twinkle ease-in-out infinite;
        }
      `}} />
        </div>
    );
}
