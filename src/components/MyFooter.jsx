import styles from "./MyFooter.module.css";
import { Github, Instagram, MessageCircle } from "lucide-react";

export function MyFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.info}>
        <p>IFRN - Campus Macau</p>
        <p>Curso Técnico em Informática</p>
        <p>Programação para Internet</p>
      </div>

      <div className={styles.name}>
        <p>Arthur Oliveira Marinho</p>
      </div>

      <div className={styles.icons}>
        <a href="https://github.com/ArthurOliveira120/ppi2025_ArthurOliveira.git"><Github /></a>
        <a href="https://www.instagram.com/arthur_oliveira120/"><Instagram /></a>
        <a href="https://t.me/ArthurOliveira120"><MessageCircle /></a>
      </div>
    </footer>
  )
}
