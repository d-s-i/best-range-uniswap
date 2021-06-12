import React from "react";
import styles from "./SimpleParagraph.module.css";

const SimpleParagraph = (props) => {
    return(
        <div className={styles[`${props.className}`]} >
            <p className={styles.paragraph} >{props.mainText}</p>
            <p className={`${styles["sub-text"]} ${styles.paragraph}` } >{props.subText}</p>
        </div>
    );
}

export default SimpleParagraph;