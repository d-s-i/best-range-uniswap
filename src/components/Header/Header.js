import React from "react";

import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles.header} >
            <a href="https://google.com" className={styles["redirection-menu"]} >
                <img src="white-ant-removebg-preview.png" alt="logo" className={styles.logo} />
                ERGÀMOS
            </a>
            Just buildin'
        </header>
    );
}

export default Header;