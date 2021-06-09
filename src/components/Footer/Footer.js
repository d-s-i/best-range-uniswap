import TelegramLink from "./TelegramLink";
import styles from "./Footer.module.css";

const Footer = () => {
    return(
        <div className={styles.footer}>
            <TelegramLink />    
            <div>Privacy Policy</div>
            <div>Cookie Policy</div>
            <div>Termes of Use</div>
            <div>Risks</div>
        </div>
    );
}

export default Footer;