"use client";

import { motion, useReducedMotion } from "framer-motion";

type FloatingCupProps = {
  className?: string;
};

export function FloatingCup({ className }: FloatingCupProps) {
  const reduce = useReducedMotion() ?? false;

  if (reduce) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/coffee-cup.webp" alt="" className={className} />
    );
  }

  return (
    <motion.img
      src="/coffee-cup.webp"
      alt=""
      className={className}
      whileInView={{
        y: [0, -5, 0, 3, 0],
        rotate: [0, 1.5, 0, -1.5, 0],
      }}
      viewport={{ once: false, amount: 0 }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ willChange: "transform" }}
    />
  );
}
