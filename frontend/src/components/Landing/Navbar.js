"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navInner}>
        {/* Logo */}
        <a href="#inicio" className={styles.logo}>
          <div className={styles.logoIcon}>
            <i className="fas fa-seedling"></i>
          </div>
          <span className={styles.logoText}>
            SIG<span className={styles.logoAccent}>VOS</span>
          </span>
        </a>

        {/* Links desktop */}
        <div className={styles.navLinks}>
          <a href="#inicio" className={styles.navLink}>Inicio</a>
          <a href="#que-es" className={styles.navLink}>Plataforma</a>
          <a href="#roles" className={styles.navLink}>Roles</a>
          <a href="#objetivos" className={styles.navLink}>Beneficios</a>
          <Link href="/login" className={styles.navBtn}>
            Acceder <i className="fas fa-arrow-right" style={{ fontSize: "0.75rem", marginLeft: "0.25rem" }}></i>
          </Link>
        </div>

        {/* Botón menú móvil */}
        <button
          className={styles.menuToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menú"
        >
          <i className={mobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>
      </div>

      {/* Menú móvil */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ""}`}>
        <a href="#inicio" className={styles.mobileLink} onClick={closeMobile}>Inicio</a>
        <a href="#que-es" className={styles.mobileLink} onClick={closeMobile}>Plataforma</a>
        <a href="#roles" className={styles.mobileLink} onClick={closeMobile}>Roles</a>
        <a href="#objetivos" className={styles.mobileLink} onClick={closeMobile}>Beneficios</a>
        <Link href="/login" className={styles.mobileCta} onClick={closeMobile}>
          Ingresar al Sistema
        </Link>
      </div>
    </nav>
  );
}
