"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import "./ScrollRevealText.scss";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  staggerDelay?: number;
  once?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function ScrollRevealText({
  text,
  as: Tag = "h2",
  className = "",
  staggerDelay = 0.03,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  const reduce = useReducedMotion();

  const words = text.split(" ");

  return (
    <Tag className={`srt ${className}`} ref={ref as React.Ref<HTMLHeadingElement>}>
      {words.map((word, wi) => {
        const charOffset = words.slice(0, wi).reduce((sum, w) => sum + w.length + 1, 0);
        return (
          <span key={wi} className="srt__word">
            {word.split("").map((char, ci) => (
              <span key={ci} className="srt__charWrap">
                <motion.span
                  className="srt__char"
                  initial={reduce ? false : { y: "110%", opacity: 0 }}
                  animate={
                    inView
                      ? { y: "0%", opacity: 1 }
                      : reduce
                        ? undefined
                        : { y: "110%", opacity: 0 }
                  }
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          duration: 0.5,
                          delay: (charOffset + ci) * staggerDelay,
                          ease,
                        }
                  }
                >
                  {char}
                </motion.span>
              </span>
            ))}
            {wi < words.length - 1 && (
              <span className="srt__space">{"\u00A0"}</span>
            )}
          </span>
        );
      })}
    </Tag>
  );
}
