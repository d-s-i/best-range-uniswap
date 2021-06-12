import React, { useState } from "react";

import { createClient } from 'urql';
import { BigNumber } from "bignumber.js";

import Header from "./components/Header/Header";
import StratData from "./components/StratData/StratData";
import InfoHelper from "./components/StratData/InfoHelper";
import Footer from "./components/Footer/Footer";
import PairInput from "./components/StratData/PairInput/PairInput";

const App = () => {

  const APIURL = "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-testing";

  const [pairData, setPairData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let addressToken0;
  let addressToken1;
  let decimalsDiff;

  const formatNumbers0Decimals = (number) => Math.trunc(parseFloat(number));

  const formatNumber4DecimalsRoundDown = (number) => Math.floor(number * 10000) / 10000;

  const calcLowerTick = (tickIdx, decimalsDiff) =>  BigNumber(1.0001**(tickIdx)) * BigNumber(10**(decimalsDiff));
  const calcUpperTick = (tickIdx, decimalsDiff) => 1.0001**(parseFloat(tickIdx) + 10) * BigNumber(10**(decimalsDiff));
  const calcTvl = (liquidity) => BigNumber(liquidity) / BigNumber(10**15);

  async function queryToken(tokenSymbol) {

    setIsLoading(true);

    const tokensQuery = `
      query {
        tokens(first:1, where: {
          symbol: "${tokenSymbol}"
        }, orderBy: volumeUSD, orderDirection: desc) {
          id
        }
      }
    `

    const client = createClient({url: APIURL});

    const queryData = await client.query(tokensQuery).toPromise();
    return queryData.data.tokens[0].id;
  }

  async function fetchData(token0Id, token1Id) {

    const tokensQuery = `
      query {
        pools(where: { 
          token0: "${token0Id}"
          token1: "${token1Id}"
        }, orderBy: volumeUSD, orderDirection: desc) {
          id
          feeTier
          totalValueLockedUSD
          poolDayData (first:1, orderBy:date, orderDirection: desc, skip: 1) {
            volumeUSD
          }
          token0 {
            symbol
            decimals
          }
          token1 {
            symbol
            decimals
          }
        }
      }
    `

    const client = createClient({url: APIURL});

    const queryData = await client.query(tokensQuery).toPromise();
    return queryData.data;
  }

  async function queryTicks(poolAddress) {

    setIsLoading(true);

    const tokensQuery = `
      query {
        ticks(first:5, where: {
          pool: "${poolAddress}"
        }, orderBy: liquidityGross, orderDirection: desc) {
          liquidityGross
          tickIdx
        }
      }
    `

    const client = createClient({url: APIURL});

    const queryData = await client.query(tokensQuery).toPromise();
    return queryData.data.ticks;
  }

  const queryTokens = (token0, token1) => {
    queryToken(token0).then((response) => {
      addressToken0 = response;
      return queryToken(token1);
    })
    .then((response) => addressToken1 = response)
    .then(() => fetchData(addressToken0, addressToken1)).then((response) => {

      setPairData([{
          id: response.pools[0].id,
          token0: response.pools[0].token0.symbol,
          token0Decimals: response.pools[0].token0.decimals,
          token1Decimals: response.pools[0].token1.decimals,
          token1: response.pools[0].token1.symbol,
          fees: formatNumbers0Decimals(response.pools[0].poolDayData[0].volumeUSD * (response.pools[0].feeTier / 10000) / 100),
          volume: formatNumbers0Decimals(response.pools[0].poolDayData[0].volumeUSD),
          tvl: formatNumbers0Decimals(response.pools[0].totalValueLockedUSD),
        }]);

      decimalsDiff = Math.abs(parseFloat(response.pools[0].token0.decimals,) - parseFloat(response.pools[0].token1.decimals,));

      return queryTicks(response.pools[0].id);

    }).then((response) => {  

      const lowerTickDAI1 = calcLowerTick(response[0].tickIdx, decimalsDiff);
      const upperTickDAI1 = calcUpperTick(response[0].tickIdx,decimalsDiff);
      const lowerTickDAI2 = calcLowerTick(response[1].tickIdx, decimalsDiff);;
      const upperTickDAI2 = calcUpperTick(response[1].tickIdx,decimalsDiff);
      const lowerTickDAI3 = calcLowerTick(response[2].tickIdx, decimalsDiff);;
      const upperTickDAI3 = calcUpperTick(response[2].tickIdx,decimalsDiff);
      
      const lowerTickUSDT1 = 1.0001 / lowerTickDAI1;
      const upperTickUSDT1 = 1.0001 / upperTickDAI1;
      const lowerTickUSDT2 = 1.0001 / lowerTickDAI2;
      const upperTickUSDT2 = 1.0001 / upperTickDAI2;
      const lowerTickUSDT3 = 1.0001 / lowerTickDAI3;
      const upperTickUSDT3 = 1.0001 / upperTickDAI3;

      
      const tvl1 = calcTvl(response[0].liquidityGross);
      const tvl2 = calcTvl(response[1].liquidityGross);
      const tvl3 = calcTvl(response[2].liquidityGross);

      setPairData((previousData) => {
        return [{
          ...previousData[0],
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
        }]
      });
      setIsLoading(false);
    });
  }

  return (
    <React.Fragment>
      <Header />
      <PairInput onQueryingToken={queryTokens} />
      {!isLoading && pairData.map((pairData) => <StratData key={`${pairData.id}`} pairData={pairData} />)}
      {isLoading && <p>Press the button to load data</p>}
      <InfoHelper />
      <Footer />
    </React.Fragment>
  );
}

export default App;
