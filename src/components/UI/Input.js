import React from "react";

import styles from "./Input.module.css";

const Input = (props) => {
    return (
        <React.Fragment>
            <input className={`${styles.input} ${props.className}`} value={props.value} type={props.type} id={props.id} placeholder={props.placeholder} name="capital" onChange={props.onChange}></input>
        </React.Fragment>
    );
}

export default Input;