import React from "react";
import { IoLogoBitcoin } from 'react-icons/io'
import { BiDollar } from 'react-icons/bi'

const CoinCard = ({coin}) => {
  return (
    <div key={coin.id}>
      <h2>{coin.name}</h2>
      <p><BiDollar />{coin.inst_price_usd}</p>
      <p><IoLogoBitcoin />{coin.inst_price_btc}</p>
      <p>Today {coin.change_percent_1d}</p>
    </div>
  )
}

export default CoinCard

//what coin looks like:
// { 
  // change_percent_1d: "+347.69%"
  // change_percent_1d_color: "#3fc932"
  // change_percent_7d: "+67.81%"
  // change_percent_7d_color: "#3fc932"
  // country_id: "767"
  // cross_rates_name: "ZET"
  // currency_symbol: "ZET"
  // id: "714"
  // inst_market_cap: "&#x24;576.32K"
  // inst_market_cap_plain: "576323.89194338"
  // inst_price_btc: "0.000000049998"
  // inst_price_usd: "0.004087"
  // name: "Zetacoin"
  // pair_change_arrow: "up_green"
  // pair_change_percent_numeric: "347.69"
  // pair_id: 1071390
  // percent_change_7d_plain: "67.81"
  // total_volume: "0.00%"
  // total_volume_plain: "0.00"
  // volume_24h_usd: "&#x24;0.00K"
  // volume_24h_usd_plain: "0.00000054"
// }