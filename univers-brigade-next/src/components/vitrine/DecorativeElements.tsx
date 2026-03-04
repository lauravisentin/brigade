"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import "./DecorativeElements.scss";

const ease = [0.22, 1, 0.36, 1] as const;

export function AnimatedRule({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={`vDeco__rule ${dark ? "vDeco__rule--dark" : ""} ${className}`}
      initial={reduce ? false : { scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : reduce ? undefined : { scaleX: 0 }}
      transition={reduce ? { duration: 0 } : { duration: 0.8, ease }}
    />
  );
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : reduce
            ? undefined
            : { opacity: 0, y: 24 }
      }
      transition={
        reduce ? { duration: 0 } : { duration: 0.7, delay, ease }
      }
    >
      {children}
    </motion.div>
  );
}
