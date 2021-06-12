import React from "react";

import Table from "./Table/Table";
import SimpleButton from "../UI/SimpleButton";

import styles from "./GeneralPairData.module.css";

const GeneralPairData = (props) => {

    const displayMetrics = (number) => {
        if(number) return `$${parseFloat(number).toLocaleString("en")}`;
        return " -- ";
    }

    const deletePairHandler= () => {
        props.onDelete(props.id);
    }

    return (
        <div className={styles["display-top-data"]} >
            <div className={styles["top-left"]} >
                <a className={styles["pair-name"]} href={`https://info.uniswap.org/#/pools/${props.id}`} title={`https://info.uniswap.org/#/pools/${props.id}`} target="_blank" rel="noopener noreferrer">{props.name}</a>
                <SimpleButton className={styles["button-clear"]} onClick={deletePairHandler} >Delete</SimpleButton>
            </div>
            <div className={styles["display-metrics"]}>
                <Table 
                colSpan={0}
                tableTitle="" 
                column_1Title="Fees*" 
                column_2Title="TVL" 
                column_3Title="Volume*" 
                column_1Line_1Data={displayMetrics(props.fees)}
                column_2Line_1Data={displayMetrics(props.tvl)}
                column_3Line_1Data={displayMetrics(props.volume)}
                />
            </div>
        </div>            
    );
}

export default GeneralPairData;