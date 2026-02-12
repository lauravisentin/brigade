import styles from "./Gallery.module.scss";
import { ressources } from "@/lib/ressources";
import Image from "next/image";


export default function Gallery() {
  return (
    <section className={styles.section} id="ressources">
      <div className={styles.inner}>
        <div className={styles.head}>
          <h1 className={styles.title}>Ressources</h1>
          <p className={styles.subtitle}>
            Des liens utiles, clairs et rapides à parcourir.
          </p>
        </div>

        <div className={styles.grid}>
          {ressources.map((r, index) => (
            <a
                key={r.id || index}
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className={styles.card}
                aria-label={r.title}
            >

              <div className={styles.thumb}>
                <Image
                src={r.img}
                alt={r.title}
                width={300}
                height={200}
                style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.meta}>
                <div className={styles.name}>{r.title}</div>
                <div className={styles.row}>
                  <span className={styles.tag}>{r.tag}</span>
                  <span className={styles.open}>Ouvrir ↗</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
