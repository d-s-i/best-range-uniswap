import React from "react";

import Table from "../Table/Table";

import styles from "./BestRangeData.module.css";

const BestRange = (props) => {

    const capital = props.capital;

    const feesRange1 = parseFloat(props.range.range_1.fees);
    const feesRange2 = parseFloat(props.range.range_2.fees);
    const feesRange3 = parseFloat(props.range.range_3.fees);

    const tvlRange1 = parseFloat(props.range.range_1.tvl);
    const tvlRange2 = parseFloat(props.range.range_2.tvl);
    const tvlRange3 = parseFloat(props.range.range_3.tvl);

    const volumeRange1 = parseFloat(props.range.range_1.volume);
    const volumeRange2 = parseFloat(props.range.range_2.volume);
    const volumeRange3 = parseFloat(props.range.range_3.volume);

    const tvl_simul_1 = 100 * capital / tvlRange1;
    const tvl_simul_2 = 100 * capital / tvlRange2;
    const tvl_simul_3 = 100 * capital / tvlRange3;

    const fees_simul_1 = feesRange1 * tvl_simul_1 / 100;
    const fees_simul_2 = feesRange2 * tvl_simul_2 / 100;
    const fees_simul_3 = feesRange3 * tvl_simul_3 / 100;

    const apr_range_1 = (fees_simul_1 * 365 / capital) * 100;
    const apr_range_2 = (fees_simul_2 * 365 / capital) * 100;
    const apr_range_3 = (fees_simul_3 * 365 / capital) * 100;

    return (
        <div className={styles["display-table"]} >
            <Table 
                tableTitle="Data"
                column_1Title="Best Range" 
                column_2Title="Fees (Daily)" 
                column_3Title="TVL" 
                column_4Title="Volume"
                column_1Line_1Data={`#1 ~ ${props.range.range_1.range}`}
                column_2Line_1Data={`$${feesRange1.toLocaleString("en")}`}
                column_3Line_1Data={`$${tvlRange1.toLocaleString("en")}`}
                column_4Line_1Data={`$${volumeRange1.toLocaleString("en")}`}
                column_1Line_2Data={`#1 ~ ${props.range.range_2.range}`}
                column_2Line_2Data={`$${feesRange2.toLocaleString("en")}`}
                column_3Line_2Data={`$${tvlRange2.toLocaleString("en")}`}
                column_4Line_2Data={`$${volumeRange2.toLocaleString("en")}`}
                column_1Line_3Data={`#1 ~ ${props.range.range_3.range}`}
                column_2Line_3Data={`$${feesRange3.toLocaleString("en")}`}
                column_3Line_3Data={`$${tvlRange3.toLocaleString("en")}`}
                column_4Line_3Data={`$${volumeRange3.toLocaleString("en")}`}
                className={`${styles["left-table"]} ${styles["data-simulation-table"]}`}
            />
            <Table 
                tableTitle={`Simulation ($ ${capital})`} 
                column_1Title="Fees (Daily)" 
                column_2Title="TVL" 
                column_3Title="APR" 
                column_1Line_1Data={`$${fees_simul_1.toFixed(2)}`}
                column_2Line_1Data={`${tvl_simul_1.toFixed(2)} %`}
                column_3Line_1Data={`${apr_range_1.toFixed(2)} %`}
                column_1Line_2Data={`$${fees_simul_2.toFixed(2)}`}
                column_2Line_2Data={`${tvl_simul_2.toFixed(2)} %`}
                column_3Line_2Data={`${apr_range_2.toFixed(2)} %`}
                column_1Line_3Data={`$${fees_simul_3.toFixed(2)}`}
                column_2Line_3Data={`${tvl_simul_3.toFixed(2)} %`}
                column_3Line_3Data={`${apr_range_3.toFixed(2)} %`}
                className={`${styles["data-simulation-table"]}`}
            />
        </div>
    );
}

export default BestRange;