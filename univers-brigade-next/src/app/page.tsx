import AnimGallery from "@/components/sections/AnimGallery";
import { ressources } from "@/lib/ressources";

export default function Page() {
  return <AnimGallery items={ressources} />;
}


// import HorizontalGrid, { GridItem } from "@/components/sections/HorizontalGrid";
// import { ressources } from "@/lib/ressources";

// export default function Page() {
//   const items: GridItem[] = ressources.map((r) => ({
//     id: r.id,
//     title: r.title,
//     href: r.href,
//     img: r.img,
//     tag: r.tag,
//   }));

//   return <HorizontalGrid items={items} blanks={14} />;
// }
