"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import "./AnimGallery.scss";

type Resource = {
  id: string;
  title: string;
  href?: string;
  img: string;
  tag?: string;
};

export default function AnimGallery({
  items,
}: {
  items: Resource[];
}) {
  const reduce = useReducedMotion();
  const [toGrid, setToGrid] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setToGrid(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <section className="animGallery">
      <motion.div
        layout
        className={`animGallery__grid ${
          toGrid ? "animGallery__grid--active" : ""
        }`}
        transition={
          reduce
            ? { duration: 0 }
            : { type: "spring", stiffness: 120, damping: 18, mass: 0.9 }
        }
      >
        {items.map((it, i) => {
          const rotate = i % 2 === 0 ? -4 : 4;

          const card = (
            <motion.div
              key={it.id}
              layout
              className={`animGallery__card ${
                toGrid ? "animGallery__card--grid" : "animGallery__card--stack"
              }`}
              initial={{
                opacity: 0,
                scale: 0.85,
                rotate: 0,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: reduce ? 0 : rotate,
                filter: "blur(0px)",
              }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 140, damping: 18 }
              }
              whileHover={!reduce && toGrid ? { scale: 1.02 } : undefined}
              whileTap={!reduce && toGrid ? { scale: 0.99 } : undefined}
            >
              <Image
                src={it.img}
                alt={it.title}
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                style={{ objectFit: "cover" }}
                priority={i < 4}
              />
            </motion.div>
          );

          if (!it.href) return card;

          return (
            <a
              key={it.id}
              href={it.href}
              target="_blank"
              rel="noreferrer"
              aria-label={it.title}
              className="animGallery__link"
            >
              {card}
            </a>
          );
        })}
      </motion.div>
    </section>
  );
}
