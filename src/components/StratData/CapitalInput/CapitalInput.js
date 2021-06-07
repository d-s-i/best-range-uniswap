import React, { useState } from "react";
import styles from "./CapitalInput.module.css";

const CapitalInput = (props) => {
    const [capital, setCapital] = useState("");
    
    const capitalChangeHandler = (event) => {
        setCapital(event.target.value);
        props.onUpdatingCapital(event.target.value);
    }

    return (
        <div className={styles.capital} >
            <label htmlFor="capital" >Capital:</label>
            <input className={styles.input} value={capital} type="number" id="tentacles" name="capital" onChange={capitalChangeHandler} ></input>
            <button className={styles.button}>Ok</button>
        </div>
    );
}

export default CapitalInput;