import React, { useState } from "react";
import styles from "./CapitalInput.module.css";

import SimpleButton from "../../UI/SimpleButton";
import Input from "../../UI/Input";

const CapitalInput = (props) => {
    const [capital, setCapital] = useState("");
    
    const capitalChangeHandler = (event) => {
        setCapital(event.target.value);
        props.onUpdatingCapital(event.target.value);
    }

    const clearHandler = () => {
        setCapital("");
        props.onUpdatingCapital("");
    }

    // The button is here for UI purposes but the function is not needed. Add onClick={updateCapital} to the "Ok" button to make it work
    // const updateCapital = () => props.onUpdatingCapital(capital); 

    return (
        <div className={styles.capital} >
            <label htmlFor="capital" >Capital:</label>
            <Input value={capital} type="number" id="capital" name="capital" onChange={capitalChangeHandler} />
            <SimpleButton className={styles["button-ok"]}>Ok</SimpleButton>
            <SimpleButton className={styles["button-clear"]} onClick={clearHandler} >Clear</SimpleButton>
        </div>
    );
}

export default CapitalInput;