import React from "react";

import Table from "./Table/Table";

import styles from "./GeneralPairData.module.css";

const DisplayPairData = (props) => {
    return (
        <div className={styles["display-top-data"]} >
            <div className={styles["pair-name"]} >{props.name}</div>
            <div className={styles["display-metrics"]}>
                <Table 
                tableTitle="" 
                column_1Title="Fees" 
                column_2Title="TVL" 
                column_3Title="Volume" 
                column_1Line_1Data={`${parseFloat(props.fees).toLocaleString("en")} $`}
                column_2Line_1Data={`${parseFloat(props.tvl).toLocaleString("en")} $`}
                column_3Line_1Data={`${parseFloat(props.volume).toLocaleString("en")} $`}
                />
            </div>
        </div>            
    );
}

export default DisplayPairData;