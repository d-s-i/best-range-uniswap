import React, { useState } from "react";

import TradingViewWidget, { Themes } from 'react-tradingview-widget';

import GeneralPairData from "./GeneralPairData";
import BestRangeData from "./BestRange/BestRangeData";
import CapitalInput from "./CapitalInput/CapitalInput";
import Card from "../Card/Card";

const StratData = (props) => {

    const [capital, setCapital] = useState("");

    const updateCapitalHandler = (capital) => setCapital(capital);

    const pairName = `${props.pairData.token0}-${props.pairData.token1}`;
    
    return (
        <Card>
            <GeneralPairData key={props.pairData.id} name={pairName} id={props.pairData.id} fees={props.pairData.fees} tvl={props.pairData.tvl} volume={props.pairData.volume}/>
            <TradingViewWidget 
            symbol={`BINANCEUS:${props.pairData.token0}USD/BINANCEUS:${props.pairData.token1}USD`} 
            theme={Themes.DARK} 
            locale="en" 
            width={`100%`}
            height={300} 
            hide_top_toolbar={true} 
            />
            <BestRangeData range={props.pairData.ranges} capital={capital}/>
            <CapitalInput onUpdatingCapital={updateCapitalHandler} />
        </Card>
    );
}

export default StratData;

/*

Code to extract the data needed in <GeneralPoolData />

{
  pools(where: {
    id: "0x6f48eca74b38d2936b02ab603ff4e36a6c0e3a77"
  }) {
    poolDayData {
      volumeUSD
      feesUSD
      tvlUSD
    }
  }
  
}
*/