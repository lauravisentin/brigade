import { fontVariableClasses } from "@/lib/vitrineFonts";
import VitrineHeader from "@/components/vitrine/VitrineHeader";
import "./vitrine.scss";

export const metadata = {
  title: "Vitrine — Univers Brigade",
  description:
    "Explorez notre sélection curatée de ressources pour la restauration contemporaine.",
};

export default function VitrineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`vitrine ${fontVariableClasses}`}>
      <VitrineHeader />
      {children}
    </div>
  );
}
