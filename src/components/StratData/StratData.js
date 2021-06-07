import React, { useState } from "react";

import GeneralPairData from "./GeneralPairData";
import PairChart from "./Chart/PairChart";
import BestRangeData from "./BestRange/BestRangeData";
import CapitalInput from "./CapitalInput/CapitalInput";
import Card from "../Card/Card";

const StratData = (props) => {

    const [capital, setCapital] = useState("");

    const updateCapitalHandler = (capital) => setCapital(capital);
    
    return (
        <Card>
            <GeneralPairData key={props.pairData.name} name={props.pairData.name} fees={props.pairData.fees} tvl={props.pairData.tvl} volume={props.pairData.volume}/>
            <PairChart />
            <BestRangeData range={props.pairData.ranges} capital={capital} />
            <CapitalInput onUpdatingCapital={updateCapitalHandler} />
        </Card>
    );
}

export default StratData;