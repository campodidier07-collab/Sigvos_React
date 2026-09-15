import styles from "./QueEsSection.module.css";

export default function QueEsSection() {
  return (
    <section id="que-es" className={styles.section}>
      <div className={styles.bg1}></div>
      <div className={styles.bg2}></div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Imagen */}
          <div className={styles.imageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1000&q=80"
              alt="Plataforma SIGVOS"
              className={styles.image}
            />
            <div className={styles.decor1}></div>
            <div className={styles.decor2}></div>

            {/* Floating card */}
            <div className={`${styles.floatingCard} glass-card`}>
              <div className={styles.floatingInner}>
                <div className={styles.floatingIcon}>
                  <i className="fas fa-chart-line"></i>
                </div>
                <div>
                  <p className={styles.floatingLabel}>Rendimiento</p>
                  <p className={styles.floatingValue}>+34%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className={styles.textWrap}>
            <p className={styles.tag}>Innovación Agrícola</p>
            <h2 className={styles.title}>
              Transformamos el campo con{" "}
              <span className={styles.accent}>tecnología</span>
            </h2>
            <p className={styles.desc}>
              SIGVOS es una plataforma integral diseñada para digitalizar la
              gestión de tus cultivos. Desde la planificación de la siembra
              hasta el análisis de la cosecha, te brindamos las herramientas
              necesarias para optimizar recursos y aumentar la rentabilidad.
            </p>

            <div className={styles.features}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-leaf"></i>
                </div>
                <div>
                  <h4 className={styles.featureTitle}>Gestión Centralizada</h4>
                  <p className={styles.featureDesc}>
                    Controla todos tus lotes y variedades de cultivos desde un
                    único panel intuitivo.
                  </p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-cloud-arrow-up"></i>
                </div>
                <div>
                  <h4 className={styles.featureTitle}>Datos en Tiempo Real</h4>
                  <p className={styles.featureDesc}>
                    Sincronización instantánea de labores y reportes de campo,
                    incluso en zonas de baja conectividad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
