"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LiquidCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'a' ||
                target.closest('button') ||
                target.closest('a') ||
                target.tagName.toLowerCase() === 'textarea' ||
                target.tagName.toLowerCase() === 'input'
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
        };
    }, []);

    return (
        <motion.div
            className="pointer-events-none fixed top-0 left-0 z-1 rounded-full bg-[#00ff88] blur-[100px] mix-blend-screen"
            animate={{
                x: mousePosition.x - (isHovering ? 150 : 100),
                y: mousePosition.y - (isHovering ? 150 : 100),
                width: isHovering ? 300 : 200,
                height: isHovering ? 300 : 200,
                opacity: isHovering ? 0.45 : 0.3,
            }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 25,
                mass: 0.5,
            }}
        />
    );
}
