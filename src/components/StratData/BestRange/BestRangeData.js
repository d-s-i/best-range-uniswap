import React from "react";

import Table from "../Table/Table";

import styles from "./BestRangeData.module.css";

const BestRange = (props) => {

    const _ = ""; // unused parameter

    const returnATwoDecimalsNumber = (number) => parseFloat(number.toFixed(2));

    const displayData = (type, data, unit, rangePosition) => {
        if(type === "pool") return displayPoolData(data);
        if(type === "range") return displayRange(data, rangePosition);
        if(type === "simulation") return displayDataSimul(data, unit);
    }
    
    const displayPoolData = (number) => {
        if(number) return `$${number.toLocaleString("en")}`;
        return " -- ";
    }

    const displayRange = (range, position) => `#${position} ~ ${range}`;

    const displayDataSimul = (number, unit) =>  {
        return unit === "$" ? `$${returnATwoDecimalsNumber(number) || " -- "}` : `${returnATwoDecimalsNumber(number) || " -- "}%`;
    }

    const calcNewTVL = (tvl) => 100 * capital / (tvl + capital);
    const calcFees = (fees, tvl) => fees * tvl /100;
    const calcApr = (fees) => (fees * 365 / capital) *100; 

    const capital = parseFloat(props.capital);

    const range1 = props.range.range_1.range;
    const range2 = props.range.range_2.range;
    const range3 = props.range.range_3.range;

    const feesRange1 = parseFloat(props.range.range_1.fees);
    const feesRange2 = parseFloat(props.range.range_2.fees);
    const feesRange3 = parseFloat(props.range.range_3.fees);

    const tvlRange1 = parseFloat(props.range.range_1.tvl);
    const tvlRange2 = parseFloat(props.range.range_2.tvl);
    const tvlRange3 = parseFloat(props.range.range_3.tvl);

    const volumeRange1 = parseFloat(props.range.range_1.volume);
    const volumeRange2 = parseFloat(props.range.range_2.volume);
    const volumeRange3 = parseFloat(props.range.range_3.volume);

    const tvlSimul1 = calcNewTVL(tvlRange1);
    const tvlSimul2 = calcNewTVL(tvlRange2);
    const tvlSimul3 = calcNewTVL(tvlRange3);

    const feesSimul1 = calcFees(feesRange1, tvlSimul1 );
    const feesSimul2 = calcFees(feesRange2, tvlSimul2 );
    const feesSimul3 = calcFees(feesRange3, tvlSimul3);

    const aprRange1 = calcApr(feesSimul1);
    const aprRange2 = calcApr(feesSimul2);
    const aprRange3 = calcApr(feesSimul3);

    return (
        <div className={styles["display-table"]} >
            <Table 
                tableTitle="Data"
                column_1Title="Best Range" 
                column_2Title="Fees*" 
                column_3Title="TVL" 
                column_4Title="Volume*"
                column_1Line_1Data={displayData("range", range1, _, 1)}
                column_2Line_1Data={displayData("pool", feesRange1)}
                column_3Line_1Data={displayData("pool", tvlRange1)}
                column_4Line_1Data={displayData("pool", volumeRange1)}
                column_1Line_2Data={displayData("range", range2, _, 2)}
                column_2Line_2Data={displayData("pool", feesRange2)}
                column_3Line_2Data={displayData("pool", tvlRange2)}
                column_4Line_2Data={displayData("pool", volumeRange2)}
                column_1Line_3Data={displayData("range", range3, _, 3)}
                column_2Line_3Data={displayData("pool", feesRange3)}
                column_3Line_3Data={displayData("pool", tvlRange3)}
                column_4Line_3Data={displayData("pool", volumeRange3)}
                className={`${styles["left-table"]} ${styles["data-simulation-table"]}`}
                classNameThead={"border-bottom"}
                classNameTd={"cells"}
                colSpan="4"
            />
            <Table 
                tableTitle={`Simulation (${displayData("pool", capital)})`} 
                column_1Title="Fees*" 
                column_2Title="TVL" 
                column_3Title="APR" 
                column_1Line_1Data={displayData("simulation", feesSimul1, "$")}
                column_2Line_1Data={displayData("simulation", tvlSimul1, "%")}
                column_3Line_1Data={displayData("simulation", aprRange1, "%")}
                column_1Line_2Data={displayData("simulation", feesSimul2, "$")}
                column_2Line_2Data={displayData("simulation", tvlSimul2, "%")}
                column_3Line_2Data={displayData("simulation", aprRange2, "%")}
                column_1Line_3Data={displayData("simulation", feesSimul3, "$")}
                column_2Line_3Data={displayData("simulation", tvlSimul3, "%")}
                column_3Line_3Data={displayData("simulation", aprRange3, "%")}
                className={`${styles["data-simulation-table"]}`}
                classNameThead={"border-bottom"}
                colSpan="3"
            />
        </div>
    );
}

export default BestRange;