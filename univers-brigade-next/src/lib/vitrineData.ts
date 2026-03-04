import { galleryResources, type GalleryResource } from "@/lib/galleryData";

export const heroData = {
  headline: "Univers Brigade",
  subline:
    "Une sélection curatée de ressources, guides et inspirations pour les artisans de la gastronomie contemporaine.",
};

const featuredIds = ["g1", "g2", "g6", "g12"];
const showcaseIds = ["g3", "g4", "g5", "g7", "g8", "g9", "g10", "g11"];

function filterByIds(ids: string[]): GalleryResource[] {
  return ids
    .map((id) => galleryResources.find((r) => r.id === id))
    .filter((r): r is GalleryResource => r !== undefined);
}

export function getFeatured(): GalleryResource[] {
  return filterByIds(featuredIds);
}

export function getShowcase(): GalleryResource[] {
  return filterByIds(showcaseIds);
}
