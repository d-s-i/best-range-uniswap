import chart from "./chart.JPG";

import styles from "./PairChart.module.css";

const PairChart = () => {
    return(
        <img src={chart} alt="chart" className={styles.chart} />
    );
}

export default PairChart;