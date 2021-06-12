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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState([false, ""]);
  const [isWelcome, setIsWelcome] = useState(true);

  let addressToken0; // temporarly stored token0 address
  let addressToken1; // temporarly stored token1 address
  let decimalsDiff; // temporarly stored decimals difference between token0 and token 1 used for price calculations

  const formatNumbers0Decimals = (number) => Math.trunc(parseFloat(number));

  const formatNumber4DecimalsRoundDown = (number) => Math.floor(number * 10000) / 10000;

  const calcLowerTick = (tickIdx, decimalsDiff) =>  BigNumber(1.0001**(tickIdx)) * BigNumber(10**(decimalsDiff));
  const calcUpperTick = (tickIdx, decimalsDiff) => 1.0001**(parseFloat(tickIdx) + 10) * BigNumber(10**(decimalsDiff));
  const calcTvl = (liquidity) => BigNumber(liquidity) / BigNumber(10**15);

  const isPoolDisplayed = (poolAddress) => pairData.map(pair => pair.id).includes(poolAddress) ? true : false;
  const handlerTokenNotFound = (responseArray) => {
    if(responseArray.length === 0 ) throw new Error("One of the token hasn't been found. Make sure tokens are rightly written in CAPS if needed (see Uniswap pool).");
  }
  const handlerPoolNotFound = (poolAddress) => {
    if (poolAddress.length === 0) throw new Error("This pool doesn't exist. Make sure the pool exist and that your token0 is indeed token0 and not token1 or vice versa.");
  }

  const queryPairData = (token0, token1) => {

    setIsLoading(true);

    queryToken(token0)
    .then((response) => {
      handlerTokenNotFound(response.tokens);
      addressToken0 = response.tokens[0].id;
      return queryToken(token1);
    })
    .then((response) => {
      handlerTokenNotFound(response.tokens);
      addressToken1 = response.tokens[0].id;
    }).then(() => {
      return queryPool(addressToken0, addressToken1);
    })
    .then((response) => {
      handlerPoolNotFound(response.pools);
      if(isPoolDisplayed(response.pools)) throw new Error("You already queried this pool");
      return fetchData(response.pools[0].id);
    })
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
      setIsWelcome(false);
      setIsError(() => [false, ""]);

    }).catch(error => setIsError(() => [true, `${error}`]));
  }

  const deletePairHandler = (id) => {
    const idToDelete = pairData.map((pair) => pair.id).indexOf(id); 
    if (idToDelete === 0) {
      const newState = pairData.slice(1, pairData.length);
      newState.length === 0 && setIsWelcome(true);
      return setPairData(newState);
    }
    if(pairData.length > 1) {
      const newState = pairData.slice(0, idToDelete).concat(pairData.slice(idToDelete, -1));
      return setPairData(newState);
    }
  }

  return (
    <React.Fragment>
      <Header />
      <PairInput onQueryingPairData={queryPairData} />
      {!isLoading && pairData.map((pairData) => <StratData key={`${pairData.id}`} pairData={pairData} onDelete={deletePairHandler} />)}
      {isWelcome && !isError[0] && <SimpleParagraph mainText="Start querying data now" subText="(ex: token0 - DAI / token1 - USDC)" />}
      {isLoading && !isError[0] && <SimpleParagraph mainText="Loading" subText="Wait a few seconds ..." />}
      {isError[0] && <SimpleParagraph mainText={isError[1]} className="error" />}
      {!isLoading && !isWelcome && <InfoHelper />}
      <Footer />
    </React.Fragment>
  );
}

export default App;
