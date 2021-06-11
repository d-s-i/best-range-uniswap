import React from "react";

import Table from "./Table/Table";

import styles from "./GeneralPairData.module.css";

const GeneralPairData = (props) => {

    const displayMetrics = (number) => {
        if(number) return `$${parseFloat(number).toLocaleString("en")}`;
        return " -- ";
    }

    return (
        <div className={styles["display-top-data"]} >
            <a className={styles["pair-name"]} href={`https://info.uniswap.org/#/pools/${props.id}`} title={`https://info.uniswap.org/#/pools/${props.id}`} target="_blank" rel="noopener noreferrer">{props.name}</a>
            <div className={styles["display-metrics"]}>
                <Table 
                colSpan={0}
                tableTitle="" 
                column_1Title="Fees" 
                column_2Title="TVL" 
                column_3Title="Volume" 
                column_1Line_1Data={displayMetrics(props.fees)}
                column_2Line_1Data={displayMetrics(props.tvl)}
                column_3Line_1Data={displayMetrics(props.volume)}
                />
            </div>
        </div>            
    );
}

export default GeneralPairData;