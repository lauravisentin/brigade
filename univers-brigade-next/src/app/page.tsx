import GrandeGallery from "@/components/sections/GrandeGallery";
import { ressources } from "@/lib/ressources";

export default function Page() {
  return <GrandeGallery items={ressources} />;
}