export type Ressource = {
  id: string;
  title: string;
  href?: string; // ? = optionnel, pas toutes les ressources ont un lien.
  img: string;
  tag?: string;
  variant?: "large" | "tall" | "wide" | "default";
};


export const ressources: Ressource[]  = [
  {
    id: "1",
    title: "Guide Michelin",
    href: "https://guide.michelin.com",
    img: "/images/img1.jpg",
    tag: "Référence",
    variant:"tall",
  },
  {
    id: "2",
    title: "Les Lauriers",
    href: "https://lauriers.ca",
    img: "/images/img2.jpg",
    tag: "Québec",
    variant:"large",
  },
  {
    id: "3",
    title: "Produits locaux",
    href: "https://example.com",
    img: "/images/img3.jpg",
    tag: "Marchés",
    variant:"default",
  },
  {
    id: "4",
    title: "Sommellerie",
    href: "https://example.com",
    img: "/images/img4.jpg",
    tag: "Boissons",
    variant:"default",
  },
  {
    id: "5",
    title: "Recettes en ligne",
    href: "https://example.com",
    img: "/images/img5.jpg",
    tag: "Recettes",
    variant:"default",
  },
  {
    id: "6",
    title: "Bistros",
    href: "https://example.com",
    img: "/images/img6.jpg",
    tag: "Restaurants",
    variant:"wide",
  },
];