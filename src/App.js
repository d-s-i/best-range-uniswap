import React, { useState } from "react";

import { createClient } from 'urql';

import Header from "./components/Header/Header";
import StratData from "./components/StratData/StratData";
import InfoHelper from "./components/StratData/InfoHelper";
import Footer from "./components/Footer/Footer";
import SimpleButton from "./components/UI/SimpleButton";

const App = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {

    const APIURL = "https://api.thegraph.com/subgraphs/name/benesjan/uniswap-v3-subgraph";

    const tokensQuery = `
      query {
        pools(where: {
          token0: "0x6b175474e89094c44da98b954eedeac495271d0f"
          token1: "0xdac17f958d2ee523a2206206994597c13d831ec7"
        }) {
          feeTier
          totalValueLockedUSD
          poolDayData {
            volumeUSD
          }
          token0 {
            name
          }
          token1 {
            name
          }
        }
      }
    `

    const client = createClient({
      url: APIURL
    });

    const queryData = await client.query(tokensQuery).toPromise();

    setIsLoading(false);

    setData(queryData);
    // console.log(queryData);
  }

  
  async function fetchDataHandler() {
    fetchData();
    await console.log(data.data.pools[0].token0.name);
  }


  // console.log("feeTier val", data);

  // console.log("data", typeof(data));
  // console.log("feeTier", typeof(data.feeTier));

  // console.log((parseFloat(data.feeTier) / 10000) * parseFloat(data.totalValueLockedUSD));

    const pairData = [
      {
      token0: "DAI",
      token1 : "USDT",
      fees: `15684`,
      tvl: "36542145",
      volume: "12489564",
      ranges: {
        range_1: {
          range: "0.9996-1.0006",
          fees: "5463",
          tvl: "5642156",
          volume: "2365142"
        },
        range_2: {
          range: "0.9986-0.9996",
          fees: "1652",
          tvl: "2312547",
          volume: "45621"
        },
        range_3: {
          range: "0.9976-0.9986",
          fees: "251",
          tvl: "356412",
          volume: "1301"
        }
      }
      },
      {
        token0: "USDC",
        token1: "USDT",
        fees: "31658",
        tvl: "145214784",
        volume: "34521789" ,
        ranges: {
          range_1: {
            range: "0.999-1.001",
            fees: "10245",
            tvl: "32154895",
            volume: "4523447"
          },
          range_2: {
            range: "0.998-0.999",
            fees: "3258",
            tvl: "11298365",
            volume: "1748552"
          },
          range_3: {
            range: "1.001-1.002",
            fees: "1244",
            tvl: "624147",
            volume: "147852"
          }
        }
        }
    ];

    

    // const name0 = data.token0.name;
    // const name1 = data.token1.name;
    // console.log(name0, name1);
    // const pairNames = pairData.map((pair) => [pair.name.slice(0, pair.name.indexOf("-")), pair.name.slice(pair.name.indexOf("-") + 1)]);

  return (
    <React.Fragment>
      <Header />
      <SimpleButton onClick={fetchDataHandler}>Fecth Data</SimpleButton>
      {!isLoading && pairData.map((pairData) => <StratData key={`${pairData.token0}-${pairData.token1}`} pairData={pairData} />)}
      {isLoading && <p>Loading</p>}
      <InfoHelper />
      <Footer />
    </React.Fragment>
  );
}

export default App;
