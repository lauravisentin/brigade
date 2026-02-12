"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export type GridItem = {
  id: string;
  title?: string;
  href?: string;
  img?: string; // absent = case vide
  tag?: string;
  size?: "s" | "m" | "l";
};

export default function HorizontalGrid({
  items,
  blanks = 10,
}: {
  items: GridItem[];
  blanks?: number;
}) {
  const blanksArr: GridItem[] = Array.from({ length: blanks }, (_, i) => ({
    id: `blank-${i}`,
  }));

  const all = [...items, ...blanksArr];

  return (
    <section style={{ height: "100vh", width: "100vw", overflowX: "auto" }}>
      <div
        style={{
          height: "100%",
          display: "grid",
          gridAutoFlow: "column",
          gridTemplateRows: "repeat(3, minmax(0, 1fr))",
          gridAutoColumns: "clamp(160px, 18vw, 240px)",
          gap: 18,
          padding: 24,
          width: "max-content",
          minWidth: "100%",
        }}
      >
        {all.map((it) => {
          const isEmpty = !it.img;

          const cell = (
            <motion.div
              key={it.id}
              style={{
                borderRadius: 18,
                overflow: "hidden",
                position: "relative",
                background: isEmpty ? "rgba(0,0,0,0.06)" : "#111",
                border: "1px solid rgba(255,255,255,0.10)",
                aspectRatio: "4 / 3",
              }}
            >
              {it.img && (
                <Image
                    src={it.img}
                    alt={it.title ?? "Ressource"}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 70vw, 240px"
                />
                )}
            </motion.div>
          );

          if (!it.href || isEmpty) return cell;

          return (
            <a key={it.id} href={it.href} target="_blank" rel="noreferrer">
              {cell}
            </a>
          );
        })}
      </div>
    </section>
  );
}
