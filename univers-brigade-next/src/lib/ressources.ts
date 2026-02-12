export type Ressource = {
  id: string;
  title: string;
  href?: string;
  img: string;
  tag?: string;
};


export const ressources: Ressource[]  = [
  {
    id: "1",
    title: "Guide Michelin",
    href: "https://guide.michelin.com",
    img: "/images/img1.jpg",
    tag: "Référence",
  },
  {
    id: "2",
    title: "Les Lauriers",
    href: "https://lauriers.ca",
    img: "/images/img2.jpg",
    tag: "Québec",
  },
  {
    id: "3",
    title: "Produits locaux",
    href: "https://example.com",
    img: "/images/img3.jpg",
    tag: "Marchés",
  },
  {
    id: "4",
    title: "Sommellerie",
    href: "https://example.com",
    img: "/images/img4.jpg",
    tag: "Boissons",
  },
  {
    id: "5",
    title: "Online Recipes",
    href: "https://example.com",
    img: "/images/img5.jpg",
    tag: "Recettes",
  },
];