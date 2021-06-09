import styles from "./TelegramLink.module.css";

import telegramLogo from "./telegram-logo.png";

const TelegramLink = () => {
    return (
        <a href={"https://t.me/Ggump"} target="_blank" rel="noopener noreferrer" title="Ideas to improve the app ? Please contact me !" className={styles["telegram-contact"]}>
            <button className={styles.button}>
                <img src={telegramLogo} className={styles["telegram-logo"]} alt="telegram-logo"/>
                @Ggump
            </button>
        </a>
    );
}

export default TelegramLink;