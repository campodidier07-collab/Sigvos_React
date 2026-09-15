import styles from "./BeneficiosSection.module.css";

const beneficios = [
  {
    icon: "fas fa-layer-group",
    title: "Organización Total",
    desc: "Estructuración detallada de fincas, lotes y ciclos de cultivo para una gestión ordenada y sin confusiones.",
  },
  {
    icon: "fas fa-chart-pie",
    title: "Decisiones Basadas en Datos",
    desc: "Métricas, gráficos y reportes exportables que revelan el verdadero rendimiento y rentabilidad de cada lote.",
  },
  {
    icon: "fas fa-shield-halved",
    title: "Trazabilidad Segura",
    desc: "Registro inmutable de todas las acciones, insumos aplicados y cosechas, vital para certificaciones agrícolas.",
  },
];

export default function BeneficiosSection() {
  return (
    <section id="objetivos" className={styles.section}>
      <div className={styles.bgPattern}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.tag}>Nuestra Propuesta de Valor</p>
          <h2 className={styles.title}>¿Por qué elegir SIGVOS?</h2>
          <p className={styles.desc}>
            Convertimos los datos del campo en conocimiento útil para impulsar
            el crecimiento sostenible de tu producción.
          </p>
        </div>

        <div className={styles.grid}>
          {beneficios.map((b, i) => (
            <div key={i} className={`${styles.card} glass-dark`}>
              <div className={styles.icon}>
                <i className={b.icon}></i>
              </div>
              <h3 className={styles.cardTitle}>{b.title}</h3>
              <p className={styles.cardDesc}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
