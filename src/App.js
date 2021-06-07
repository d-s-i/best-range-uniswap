import React from "react";
import Header from "./components/Header/Header";
import StratData from "./components/StratData/StratData";

const App = () => {
    const pairData = [
      {
      name: "DAI-USDT",
      fees: "5954",
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
        name: "USDC-USDT",
        fees: "31658",
        tvl: "145214784",
        volume: "34521789" ,
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
        }
    ];

  return (
    <React.Fragment>
      <Header />
      {pairData.map((pairData) => <StratData key={pairData.name} pairData={pairData} />)}
    </React.Fragment>
  );
}

export default App;
