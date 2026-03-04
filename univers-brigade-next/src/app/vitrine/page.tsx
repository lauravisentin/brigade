"use client";

import { useState } from "react";
import type { GalleryResource } from "@/lib/galleryData";
import { heroData, getFeatured, getShowcase } from "@/lib/vitrineData";
import HeroSection from "@/components/vitrine/HeroSection";
import EditorialSplit from "@/components/vitrine/EditorialSplit";
import HorizontalShowcase from "@/components/vitrine/HorizontalShowcase";
import ResourceReveal from "@/components/vitrine/ResourceReveal";
import VitrineFooter from "@/components/vitrine/VitrineFooter";

const featured = getFeatured();
const showcase = getShowcase();

export default function VitrinePage() {
  const [selected, setSelected] = useState<GalleryResource | null>(null);

  return (
    <>
      <HeroSection headline={heroData.headline} subline={heroData.subline} />

      {featured.map((item, i) => (
        <EditorialSplit
          key={item.id}
          resource={item}
          index={i}
          theme={i % 2 === 0 ? "light" : "dark"}
          reversed={i % 2 !== 0}
          onSelect={setSelected}
        />
      ))}

      <HorizontalShowcase items={showcase} />

      <VitrineFooter />

      <ResourceReveal
        resource={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
