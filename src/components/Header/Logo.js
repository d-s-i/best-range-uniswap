import React from "react";

import styles from "./Logo.module.css";

const Logo = (props) => {
    
    return (
        <a href="https://google.com" className={`${props.className}`} >
            <img src="white-ant-removebg-preview.png" alt="logo" className={styles.logo} />
            MELÉTI
        </a>
    );
}

export default Logo;