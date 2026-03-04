"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import ScrollRevealText from "./ScrollRevealText";
import { AnimatedRule, FadeIn } from "./DecorativeElements";
import "./HeroSection.scss";

type Props = {
  headline: string;
  subline: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection({ headline, subline }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  return (
    <section ref={ref} className="vHero" aria-label="Introduction">
      <div className="vHero__bgImage" aria-hidden="true">
        <Image
          src="/images/img2.jpg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      <div className="vHero__content">
        {/* <motion.div
          className="vHero__label"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={reduce ? { duration: 0 } : { duration: 0.6, delay: 0.1, ease }}
        >
          Univers Brigade
        </motion.div> */}

        <ScrollRevealText
          text={headline}
          as="h1"
          className="vHero__headline"
          staggerDelay={0.025}
        />

        <AnimatedRule className="vHero__rule" />

        <FadeIn delay={0.6}>
          <p className="vHero__subline">{subline}</p>
        </FadeIn>
      </div>

      <motion.div
        className="vHero__scroll"
        initial={reduce ? false : { opacity: 0, y: -8 }}
        animate={
          inView
            ? { opacity: 1, y: [0, 6, 0] }
            : undefined
        }
        transition={
          reduce
            ? { duration: 0 }
            : {
                opacity: { duration: 0.6, delay: 1.2 },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
              }
        }
        aria-hidden="true"
      >
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <path
            d="M8 4v16m0 0l-5-5m5 5l5-5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}
