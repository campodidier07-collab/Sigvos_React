"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./HeroSlider.module.css";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2000&q=80",
    alt: "Cultivos verdes",
    title: "Gestión Inteligente de",
    titleAccent: "Cultivos",
    subtitle: "Potencia tu agronegocio con SIGVOS. Control integral, trazabilidad total y decisiones basadas en datos para maximizar tu productividad.",
    cta: { text: "Comenzar Ahora", href: "/login" },
    ctaSecondary: { text: "Conoce Más", href: "#que-es" },
  },
  {
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=2000&q=80",
    alt: "Tecnología agrícola",
    title: "Trazabilidad en",
    titleAccent: "Tiempo Real",
    subtitle: "Registra actividades, monitorea el estado de cada lote y sincroniza tu información desde cualquier lugar, incluso sin conexión a internet.",
    cta: { text: "Ingresar al Sistema", href: "/login" },
    ctaSecondary: null,
  },
  {
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=2000&q=80",
    alt: "Trazabilidad agrícola",
    title: "Aumenta tu",
    titleAccent: "Rentabilidad",
    subtitle: "Analiza la eficiencia de tu producción, gestiona a tu equipo de trabajo y optimiza tus costos con reportes detallados y precisos.",
    cta: { text: "Crea tu cuenta gratis", href: "/register" },
    ctaSecondary: null,
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="inicio" className={styles.hero}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${index === currentSlide ? styles.slideActive : ""}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.image} alt={slide.alt} className={styles.slideImage} />
          <div className={styles.slideOverlay}></div>
          <div className={styles.slideContentWrap}>
            <div className={styles.slideContent}>
              <h1 className={styles.heroTitle}>
                {slide.title}{" "}
                <span className="gradient-text">{slide.titleAccent}</span>
              </h1>
              <p className={styles.heroSubtitle}>{slide.subtitle}</p>
              <div className={styles.heroBtns}>
                <Link href={slide.cta.href} className="btn-primary">
                  {slide.cta.text}
                </Link>
                {slide.ctaSecondary && (
                  <a href={slide.ctaSecondary.href} className="btn-secondary">
                    {slide.ctaSecondary.text}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ""}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
