import { Link } from "react-router-dom";

import styles from "../../styles/Footer.module.css";
import { ROUTES } from "../../untils/routes";

import LOGO from "../../images/logo.svg";

const Footer = () => (
    <section className={styles.footer}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Stuff" />
        </Link>
      </div>

      <div className={styles.rights}>
        Developed by bester Employer{" "}
        <a href="https://www.twitch.tv/nix" target="_blank" rel="noreferrer">
          @Mansur_gik
        </a>
      </div>

      <div className={styles.socials}>
        <a href="https://www.twitch.tv/nix" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`../../../sprite.svg#instagram`} />
          </svg>
        </a>

        <a href="https://www.twitch.tv/nix" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`../../../sprite.svg#facebook`} />
          </svg>
        </a>

        <a href="https://www.twitch.tv/nix" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`../../../sprite.svg#youtube`} />
          </svg>
        </a>
      </div>
    </section>
  );

export default Footer;
