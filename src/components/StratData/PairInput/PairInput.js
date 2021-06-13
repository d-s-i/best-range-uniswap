import { useState } from "react";

import styles from "./PairInput.module.css";

import SimpleButton from "../../UI/SimpleButton";
import Input from "../../UI/Input";

const PairInput = (props) => {

    const [enteredToken0, setToken0Symbol] = useState("");
    const [enteredToken1, setToken1Symbol] = useState("");

    const tokenChangeHandlerToken0 = (event) => {
        setToken0Symbol(event.target.value);
    }
    const tokenChangeHandlerToken1 = (event) => {
        setToken1Symbol(event.target.value);
    }

    const fetchData = () => {
        const token0Symbol = enteredToken0
        const token1Symbol = enteredToken1;
        props.onQueryingPairData(token0Symbol, token1Symbol);
        setToken0Symbol("");
        setToken1Symbol("");
    }

    return (
        <div className={styles["display-user-input"]} >
            <Input value={enteredToken0} placeholder="token0 symbol" type="text" id="token0" name="token0" onChange={tokenChangeHandlerToken0} />
            <Input value={enteredToken1} placeholder="token1 symbol" type="text" id="token1" name="token1" onChange={tokenChangeHandlerToken1}/>
            <SimpleButton className={styles["button-ok"]} onClick={fetchData}>Query Data</SimpleButton>
        </div>
    );
}

export default PairInput;