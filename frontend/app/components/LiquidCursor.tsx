"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function LiquidCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Hide default cursor across the entire page when this component mounts
        document.body.style.cursor = 'none';

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'a' ||
                target.closest('button') ||
                target.closest('a')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
            document.body.style.cursor = 'auto'; // Restore on unmount
        };
    }, []);

    return (
        <>
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-[100] flex items-center justify-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                style={{ pointerEvents: 'none' }}
                animate={{
                    x: mousePosition.x - 16, // Center the rocket (assuming size 32)
                    y: mousePosition.y - 16,
                    scale: isHovering ? 1.4 : 1,
                    rotate: isHovering ? -90 : -45, // Nominally point top-left, tip further left when hovering
                }}
                transition={{
                    type: "spring",
                    stiffness: 400, // Make it very snappy to follow mouse closely
                    damping: 25,
                    mass: 0.2,
                }}
            >
                <Rocket className="w-8 h-8 text-white fill-white/20" strokeWidth={1.5} />
            </motion.div>

            {/* Soft thrust exhaust glow behind the rocket */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-[99] rounded-full bg-[#FF5C38] blur-xl opacity-60 mix-blend-screen"
                style={{ pointerEvents: 'none' }}
                animate={{
                    x: mousePosition.x - 24, // Offset to sit behind the rocket tail
                    y: mousePosition.y - 10,
                    width: isHovering ? 48 : 32,
                    height: isHovering ? 48 : 32,
                    opacity: isHovering ? 0.9 : 0.4,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    mass: 0.8,
                }}
            />

            {/* Restored Large Liquid Glow */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-[98] rounded-full bg-[#FF5C38] blur-xl opacity-80 mix-blend-screen"
                style={{ pointerEvents: 'none' }}
                animate={{
                    x: mousePosition.x - 48,
                    y: mousePosition.y - 48,
                    width: isHovering ? 120 : 96,
                    height: isHovering ? 120 : 96,
                    opacity: isHovering ? 1 : 0.7,
                }}
                transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 20,
                    mass: 0.8,
                }}
            />
        </>
    );
}
