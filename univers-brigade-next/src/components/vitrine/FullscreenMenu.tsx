"use client";

import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import "./FullscreenMenu.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

const links = [
  { label: "Accueil", href: "/vitrine" },
  // { label: "Galerie", href: "/galerie" },
  { label: "Ressources", href: "/" },
];

export default function FullscreenMenu({ isOpen, onClose }: Props) {
  const reduce = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          className="vMenu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.4, ease: "easeInOut" }}
        >
          <button
            ref={closeRef}
            className="vMenu__close"
            onClick={onClose}
            aria-label="Fermer le menu"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="vMenu__rule" />

          <nav className="vMenu__nav">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="vMenu__link"
                initial={reduce ? false : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -20 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.5, delay: 0.1 + i * 0.08, ease }
                }
                onClick={onClose}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          <motion.div
            className="vMenu__footer"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={
              reduce ? { duration: 0 } : { duration: 0.5, delay: 0.5 }
            }
          >
            <span>Univers Brigade</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
