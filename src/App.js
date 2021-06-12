import React, { useState } from "react";

import { queryToken, queryPool, fetchData } from "./external-functions/queries";
import { BigNumber } from "bignumber.js";

import Header from "./components/Header/Header";
import StratData from "./components/StratData/StratData";
import InfoHelper from "./components/StratData/InfoHelper";
import Footer from "./components/Footer/Footer";
import PairInput from "./components/StratData/PairInput/PairInput";
import SimpleParagraph from "./components/UI/SimpleParagraph";

const App = () => {

  const [pairData, setPairData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let addressToken0; // temporarly stored token0 address
  let addressToken1; // temporarly stored token1 address
  let decimalsDiff; // temporarly stored decimals difference between token0 and token 1

  const formatNumbers0Decimals = (number) => Math.trunc(parseFloat(number));

  const formatNumber4DecimalsRoundDown = (number) => Math.floor(number * 10000) / 10000;

  const calcLowerTick = (tickIdx, decimalsDiff) =>  BigNumber(1.0001**(tickIdx)) * BigNumber(10**(decimalsDiff));
  const calcUpperTick = (tickIdx, decimalsDiff) => 1.0001**(parseFloat(tickIdx) + 10) * BigNumber(10**(decimalsDiff));
  const calcTvl = (liquidity) => BigNumber(liquidity) / BigNumber(10**15);

  const queryPairData = (token0, token1) => {

    setIsLoading(true);

    queryToken(token0).then((response) => {
      addressToken0 = response;
      return queryToken(token1);
    })
    .then((response) => addressToken1 = response)
    .then(() => queryPool(addressToken0, addressToken1))
    .then((response) => fetchData(response))
    .then((response) => {

      decimalsDiff = Math.abs(parseFloat(response.pools[0].token0.decimals) - parseFloat(response.pools[0].token1.decimals));

      const lowerTickDAI1 = calcLowerTick(response.ticks[0].tickIdx, decimalsDiff);
      const upperTickDAI1 = calcUpperTick(response.ticks[0].tickIdx,decimalsDiff);
      const lowerTickDAI2 = calcLowerTick(response.ticks[1].tickIdx, decimalsDiff);;
      const upperTickDAI2 = calcUpperTick(response.ticks[1].tickIdx,decimalsDiff);
      const lowerTickDAI3 = calcLowerTick(response.ticks[2].tickIdx, decimalsDiff);;
      const upperTickDAI3 = calcUpperTick(response.ticks[2].tickIdx,decimalsDiff);
      
      const lowerTickUSDT1 = 1.0001 / lowerTickDAI1;
      const upperTickUSDT1 = 1.0001 / upperTickDAI1;
      const lowerTickUSDT2 = 1.0001 / lowerTickDAI2;
      const upperTickUSDT2 = 1.0001 / upperTickDAI2;
      const lowerTickUSDT3 = 1.0001 / lowerTickDAI3;
      const upperTickUSDT3 = 1.0001 / upperTickDAI3;

      
      const tvl1 = calcTvl(response.ticks[0].liquidityGross);
      const tvl2 = calcTvl(response.ticks[1].liquidityGross);
      const tvl3 = calcTvl(response.ticks[2].liquidityGross);

      setPairData((previousData) => [{
          id: response.pools[0].id,
          token0: response.pools[0].token0.symbol,
          token0Decimals: response.pools[0].token0.decimals,
          token1Decimals: response.pools[0].token1.decimals,
          token1: response.pools[0].token1.symbol,
          fees: formatNumbers0Decimals(response.pools[0].poolDayData[0].volumeUSD * (response.pools[0].feeTier / 10000) / 100),
          volume: formatNumbers0Decimals(response.pools[0].poolDayData[0].volumeUSD),
          tvl: formatNumbers0Decimals(response.pools[0].totalValueLockedUSD),
          ranges: {
            range_1: {
              range: `${formatNumber4DecimalsRoundDown(lowerTickUSDT1)}-${formatNumber4DecimalsRoundDown(upperTickUSDT1)}`,
              fees: "10",
              tvl: `${Math.trunc(tvl1)}`,
              volume: "2365142"
            },
            range_2: {
              range: `${formatNumber4DecimalsRoundDown(lowerTickUSDT2)}-${formatNumber4DecimalsRoundDown(upperTickUSDT2)}`,
              fees: "1652",
              tvl: `${Math.trunc(tvl2)}`,
              volume: "45621"
            },
            range_3: {
              range: `${formatNumber4DecimalsRoundDown(lowerTickUSDT3)}-${formatNumber4DecimalsRoundDown(upperTickUSDT3)}`,
              fees: "251",
              tvl: `${Math.trunc(tvl3)}`,
              volume: "1301"
            }
          }
        },
      ...previousData]);

      setIsLoading(false);

    });
  }

  return (
    <React.Fragment>
      <Header />
      <PairInput onQueryingPairData={queryPairData} />
      {!isLoading && pairData.map((pairData) => <StratData key={`${pairData.id}`} pairData={pairData} />)}
      {isLoading && <SimpleParagraph mainText="Start querying data now" subText="(ex: token0 - DAI / token1 - USDC)" />}
      {!isLoading && <InfoHelper />}
      <Footer />
    </React.Fragment>
  );
}

export default App;
