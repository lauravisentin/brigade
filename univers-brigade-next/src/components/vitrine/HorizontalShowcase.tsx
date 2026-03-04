"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import type { GalleryResource } from "@/lib/galleryData";
import ResourceReveal from "./ResourceReveal";
import "./HorizontalShowcase.scss";

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export default function HorizontalShowcase({
  items,
}: {
  items: GalleryResource[];
}) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<GalleryResource | null>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const scrollTarget = useRef(0);
  const scrollX = useMotionValue(0);
  const smoothX = useSpring(scrollX, {
    stiffness: reduce ? 300 : 80,
    damping: reduce ? 40 : 28,
    mass: reduce ? 0.5 : 0.8,
  });

  const progress = useTransform(smoothX, (v) =>
    maxScroll > 0 ? Math.abs(v) / maxScroll : 0
  );

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const hasDragged = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const measure = useCallback(() => {
    if (!trackRef.current || !containerRef.current || isMobile) return;
    const trackW = trackRef.current.scrollWidth;
    const viewW = containerRef.current.clientWidth;
    setMaxScroll(Math.max(0, trackW - viewW));
  }, [isMobile]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, items]);

  useEffect(() => {
    if (isMobile) return;
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      scrollTarget.current = clamp(
        scrollTarget.current + delta * 1.2,
        0,
        maxScroll
      );
      scrollX.set(-scrollTarget.current);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [maxScroll, scrollX, isMobile]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (isMobile) return;
      isDragging.current = true;
      hasDragged.current = false;
      dragStartX.current = e.clientX;
      dragStartScroll.current = scrollTarget.current;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [isMobile]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current || isMobile) return;
      const dx = dragStartX.current - e.clientX;
      if (Math.abs(dx) > 4) hasDragged.current = true;
      scrollTarget.current = clamp(
        dragStartScroll.current + dx,
        0,
        maxScroll
      );
      scrollX.set(-scrollTarget.current);
    },
    [maxScroll, scrollX, isMobile]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleCardClick = useCallback((item: GalleryResource) => {
    if (hasDragged.current) return;
    setSelected(item);
  }, []);

  const handleCardKeyDown = useCallback(
    (e: React.KeyboardEvent, item: GalleryResource) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setSelected(item);
      }
    },
    []
  );

  return (
    <>
      <section
        ref={containerRef}
        className="vShowcase"
        aria-label="Sélection de ressources"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div ref={headerRef} className="vShowcase__header">
          <motion.span
            className="vShowcase__label"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : undefined}
            transition={
              reduce ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
            }
          >
            Sélection curatée
          </motion.span>
          <motion.h2
            className="vShowcase__headline"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : undefined}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
            }
          >
            Nos Ressources
          </motion.h2>
        </div>

        <motion.div
          ref={trackRef}
          className="vShowcase__track"
          style={isMobile ? undefined : { x: smoothX }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              className="vShowcase__card"
              role="button"
              tabIndex={0}
              aria-label={`${item.title} — ${item.tag}`}
              onClick={() => handleCardClick(item)}
              onKeyDown={(e) => handleCardKeyDown(e, item)}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      duration: 0.6,
                      delay: i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            >
              <div className="vShowcase__cardImage">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width:768px) 100vw, 460px"
                  style={{ objectFit: "cover" }}
                  priority={i < 3}
                />
              </div>
              <div className="vShowcase__cardOverlay" />
              <div className="vShowcase__cardMeta">
                <span className="vShowcase__cardTag">{item.tag}</span>
                <span className="vShowcase__cardTitle">{item.title}</span>
                <div className="vShowcase__cardLine" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="vShowcase__progress" aria-hidden="true">
          <motion.div
            className="vShowcase__progressBar"
            style={{ scaleX: progress }}
          />
        </div>
      </section>

      <ResourceReveal
        resource={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
