import { createClient } from 'urql';

const APIURL = "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-testing";

const client = createClient({url: APIURL});

export async function queryToken(tokenSymbol) {

    const tokensQuery = `
      query {
        tokens(first:1, where: {
          symbol: "${tokenSymbol}"
        }, orderBy: volumeUSD, orderDirection: desc) {
          id
        }
      }
    `

    const queryData = await client.query(tokensQuery).toPromise();
    return queryData.data;
  }

export async function queryPool(token0Id, token1Id) {

    const tokensQuery = `
    query {
      pools(first:1, where: {
        token0: "${token0Id}"
        token1: "${token1Id}"
      }, orderBy: volumeUSD, orderDirection: desc) {
        id
      }
    }
  `

  const queryData = await client.query(tokensQuery).toPromise();
  return queryData.data;
}

export async function fetchData(poolAddress) {

    const tokensQuery = `
      query {
        pools(where: { 
          id: "${poolAddress}"
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
        ticks(first:5, where: {
          pool: "${poolAddress}"
        }, orderBy: liquidityGross, orderDirection: desc) {
          liquidityGross
          tickIdx
        }
      }
    `

    const queryData = await client.query(tokensQuery).toPromise();
    return queryData.data;
}