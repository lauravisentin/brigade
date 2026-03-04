"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import type { GalleryResource } from "@/lib/galleryData";
import ScrollRevealText from "./ScrollRevealText";
import { AnimatedRule, FadeIn } from "./DecorativeElements";
import "./EditorialSplit.scss";

type Props = {
  resource: GalleryResource;
  index: number;
  theme: "light" | "dark";
  reversed: boolean;
  onSelect: (r: GalleryResource) => void;
};

export default function EditorialSplit({
  resource,
  theme,
  reversed,
  onSelect,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imgY = useSpring(rawY, { stiffness: 100, damping: 30 });

  const isDark = theme === "dark";

  return (
    <section
      ref={sectionRef}
      className={`vSplit ${isDark ? "vSplit--dark" : "vSplit--light"} ${reversed ? "vSplit--reversed" : ""}`}
    >
      <div className="vSplit__imageCol">
        <motion.div
          className="vSplit__imageInner"
          style={reduce ? undefined : { y: imgY }}
        >
          <Image
            src={resource.image}
            alt={resource.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </div>

      <div className="vSplit__textCol">
        <span className={`vSplit__label ${isDark ? "vSplit__label--dark" : ""}`}>
          {resource.tag} — {resource.category}
        </span>

        <ScrollRevealText
          text={resource.title}
          as="h2"
          className={`vSplit__title ${isDark ? "vSplit__title--dark" : ""}`}
          staggerDelay={0.035}
        />

        <AnimatedRule
          className="vSplit__ruleDecor"
          dark={isDark}
        />

        <FadeIn delay={0.3}>
          <p className={`vSplit__desc ${isDark ? "vSplit__desc--dark" : ""}`}>
            {resource.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.5}>
          <button
            className={`vSplit__cta ${isDark ? "vSplit__cta--dark" : ""}`}
            onClick={() => onSelect(resource)}
            type="button"
          >
            <span>Découvrir</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 9h10m0 0L10 5m4 4l-4 4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
