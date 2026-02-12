import "./globals.scss";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "Univers Brigade",
  description: "Catalogue de ressources",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main className="appMain">{children}</main>
      </body>
    </html>
  );
}
