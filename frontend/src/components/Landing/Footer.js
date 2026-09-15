import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <i className="fas fa-seedling"></i>
              </div>
              <span className={styles.logoText}>
                SIG<span className={styles.logoAccent}>VOS</span>
              </span>
            </div>
            <p className={styles.desc}>
              Innovando en la gestión agrícola. Software especializado para
              potenciar la productividad y sostenibilidad del agro moderno.
            </p>
            <div className={styles.socials}>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.social} ${styles.facebook}`}
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.social} ${styles.instagram}`}
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://web.whatsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.social} ${styles.whatsapp}`}
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Explorar */}
          <div>
            <h4 className={styles.title}>Explorar</h4>
            <ul className={styles.links}>
              <li><a href="#inicio" className={styles.link}>Inicio</a></li>
              <li><a href="#que-es" className={styles.link}>Plataforma</a></li>
              <li><a href="#roles" className={styles.link}>Roles</a></li>
              <li><a href="#objetivos" className={styles.link}>Beneficios</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className={styles.title}>Contacto</h4>
            <ul className={styles.links}>
              <li className={styles.contactItem}>
                <i className={`fas fa-envelope ${styles.contactIcon}`}></i>
                <span>sigvos.app@gmail.com</span>
              </li>
              <li className={styles.contactItem}>
                <i className={`fas fa-map-marker-alt ${styles.contactIcon}`}></i>
                <span>Vereda Palomas<br />Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2026 SIGVOS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
