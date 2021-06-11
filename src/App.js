import React, { useState } from "react";

import { createClient } from 'urql';
import { BigNumber } from "bignumber.js";

import Header from "./components/Header/Header";
import StratData from "./components/StratData/StratData";
import InfoHelper from "./components/StratData/InfoHelper";
import Footer from "./components/Footer/Footer";
import SimpleButton from "./components/UI/SimpleButton";

const App = () => {

  const [pairData, setPairData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {

    setIsLoading(true);

    const APIURL = "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-testing";

    const tokensQuery = `
      query {
        pools(where: { 
          token0: "0x6b175474e89094c44da98b954eedeac495271d0f"
          token1: "0xdac17f958d2ee523a2206206994597c13d831ec7"
        }) {
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
        ticks(first:5, where: {
          pool: "0x6f48eca74b38d2936b02ab603ff4e36a6c0e3a77"
        }, orderBy: liquidityGross, orderDirection: desc) {
          liquidityGross
          tickIdx
        }
      }
    `

    const client = createClient({url: APIURL});

    const queryData = await client.query(tokensQuery).toPromise();
    return queryData.data;
  }

  const formatNumbers0Decimals = (number) => Math.trunc(parseFloat(number));

  const formatNumber4DecimalsRoundDown = (number) => Math.floor(number * 10000) / 10000;

  const calcLowerTick = (tickIdx, decimalsDiff) =>  BigNumber(1.0001**(tickIdx)) * BigNumber(10**(decimalsDiff));
  const calcUpperTick = (tickIdx, decimalsDiff) => 1.0001**(parseFloat(tickIdx) + 10) * BigNumber(10**(decimalsDiff));
  const calcTvl = (liquidity) => BigNumber(liquidity) / BigNumber(10**15);
  
  const fetchDataHandler = () => {
    fetchData().then((response) => {

      const decimalsDiff = Math.abs(parseFloat(response.pools[0].token0.decimals) - parseFloat(response.pools[0].token1.decimals));

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

      setPairData(previousValues => {
        return [{
          id: response.pools[0].id,
          token0: response.pools[0].token0.symbol,
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
      ...previousValues
    ];
      });
      setIsLoading(false);
    });
  }

  return (
    <React.Fragment>
      <Header />
      <SimpleButton onClick={fetchDataHandler}>Fecth Data</SimpleButton>
      {!isLoading && pairData.map((pairData) => <StratData key={`${pairData.id}`} pairData={pairData} />)}
      {isLoading && <p>Loading</p>}
      <InfoHelper />
      <Footer />
    </React.Fragment>
  );
}

export default App;
