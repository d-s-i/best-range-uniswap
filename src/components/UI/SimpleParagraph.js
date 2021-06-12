import React from "react";
import styles from "./SimpleParagraph.module.css";

const SimpleParagraph = (props) => {
    return(
        <React.Fragment>
            <p className={styles.paragraph} >{props.mainText}</p>
            <p className={`${styles["sub-text"]} ${styles.paragraph}` } >{props.subText}</p>
        </React.Fragment>
    );
}

export default SimpleParagraph;