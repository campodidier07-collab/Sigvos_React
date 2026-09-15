import styles from "./RolesSection.module.css";

const roles = [
  {
    type: "admin",
    icon: "fas fa-user-tie",
    title: "Administrador de Finca",
    desc: "Posee la visión estratégica. Configura la finca, gestiona el personal, define los ciclos de cultivo y analiza los reportes financieros y productivos para tomar decisiones informadas.",
    features: [
      "Planificación de lotes y cultivos",
      "Análisis de costos y rentabilidad",
      "Generación de reportes gerenciales",
    ],
  },
  {
    type: "worker",
    icon: "fas fa-tractor",
    title: "Trabajador de Campo",
    desc: "El motor operativo. Registra las labores diarias directamente desde el terreno, reporta novedades fitosanitarias y mantiene actualizada la bitácora de actividades del cultivo.",
    features: [
      "Registro rápido de labores",
      "Reporte de plagas o enfermedades",
      "Interfaz simplificada y directa",
    ],
  },
];

export default function RolesSection() {
  return (
    <section id="roles" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.tag}>Estructura de Trabajo</p>
          <h2 className={styles.title}>Roles Especializados</h2>
          <p className={styles.desc}>
            El sistema se adapta a la estructura de tu equipo, brindando las
            herramientas exactas que cada rol necesita para brillar.
          </p>
        </div>

        <div className={styles.grid}>
          {roles.map((role) => (
            <div
              key={role.type}
              className={`${styles.card} ${
                role.type === "admin" ? styles.cardAdmin : styles.cardWorker
              }`}
            >
              <div className={styles.cardDecor}></div>
              <div className={styles.cardContent}>
                <div
                  className={`${styles.icon} ${
                    role.type === "admin" ? styles.iconAdmin : styles.iconWorker
                  }`}
                >
                  <i className={role.icon}></i>
                </div>
                <h3 className={styles.cardTitle}>{role.title}</h3>
                <p className={styles.cardDesc}>{role.desc}</p>
                <ul className={styles.features}>
                  {role.features.map((feat, i) => (
                    <li key={i} className={styles.feature}>
                      <i className={`fas fa-check ${styles.check}`}></i>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
