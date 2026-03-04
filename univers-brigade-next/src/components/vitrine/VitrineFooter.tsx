"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import "./VitrineFooter.scss";

const ease = [0.22, 1, 0.36, 1] as const;

export default function VitrineFooter() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  return (
    <footer ref={ref} className="vFooter" role="contentinfo">
      <motion.div
        className="vFooter__rule"
        initial={reduce ? false : { scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : undefined}
        transition={reduce ? { duration: 0 } : { duration: 1, ease }}
      />

      <div className="vFooter__inner">
        <div className="vFooter__left">
          <motion.span
            className="vFooter__brand"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={
              reduce ? { duration: 0 } : { duration: 0.6, delay: 0.2, ease }
            }
          >
            Univers Brigade
          </motion.span>
          <motion.span
            className="vFooter__tagline"
            initial={reduce ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={
              reduce ? { duration: 0 } : { duration: 0.6, delay: 0.35 }
            }
          >
          </motion.span>
        </div>
      </div>

      <motion.div
        className="vFooter__copy"
        initial={reduce ? false : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={reduce ? { duration: 0 } : { duration: 0.5, delay: 0.5 }}
      >
        © {new Date().getFullYear()} Univers Brigade
      </motion.div>
    </footer>
  );
}
