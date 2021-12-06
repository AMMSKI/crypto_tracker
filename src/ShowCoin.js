import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const ShowCoin = ({coin, showDetails, setShowDetails}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [options, setOptions] = useState(null)

  let yearOptions = {
    method: 'GET',
    url: 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-historical-data',
    params: {
      pair_ID: coin.pair_id,
      date_from: moment(Date.now() - 365 * 24 * 3600 * 1000).format('DDMMYYYY'),
      date_to: moment().format('DDMMYYYY'),
      lang_ID: 1,
      time_utc_offset: '28800',
      interval: 'day'
    },
    headers: {
      'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
      'x-rapidapi-key': 'e02ae8cd48msh0632d73db91de3bp1ec3fbjsnd32acd26c879'
    }
  };
  let weekOptions = {
    method: 'GET',
    url: 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-historical-data',
    params: {
      pair_ID: coin.pair_id,
      date_from: moment(Date.now() - 7 * 24 * 3600 * 1000).format('DDMMYYYY'),
      date_to: moment().format('DDMMYYYY'),
      lang_ID: 1,
      time_utc_offset: '28800',
      interval: 'day'
    },
    headers: {
      'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
      'x-rapidapi-key': 'e02ae8cd48msh0632d73db91de3bp1ec3fbjsnd32acd26c879'
    }
  };
  let monthOptions = {
    method: 'GET',
    url: 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-historical-data',
    params: {
      pair_ID: coin.pair_id,
      date_from: moment(Date.now() - 30 * 24 * 3600 * 1000).format('DDMMYYYY'),
      date_to: moment().format('DDMMYYYY'),
      lang_ID: 1,
      time_utc_offset: '28800',
      interval: 'day'
    },
    headers: {
      'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
      'x-rapidapi-key': 'e02ae8cd48msh0632d73db91de3bp1ec3fbjsnd32acd26c879'
    }
  };

  
  
  useEffect(()=>{
    if(!options){
      setOptions(yearOptions)
    }
    axios.request(options).then(function (response) {
      let myData = response.data.data[0].screen_data.data
      let theData = myData.map((d) => {
        return {
          date: moment.unix(d.date).format("DD MMM YYYY"),
          high: Number(d.high.split(",").join("")),
          low: Number(d.low.split(",").join("")),
          price: Number(d.price.split(",").join(""))
        }
      })
      const sortData  = (d) => {
        let sortedData = []
        for(let i = 0; i < d.length; i++){
          if(moment(d[i].date) < moment(d[0].date)){
            sortedData.unshift(d[i])
          }
        }
        return sortedData
      }
      setData(sortData(theData))
    }).catch(function (error) {
      console.error(error);
    });
    return 
  },[options])

  const RenderCoin = () => {
    return (
      <div>
        <button onClick={()=>setShowDetails(!showDetails)}>Back</button>
        <h1>{coin.name}</h1>
        <div>
        <LineChart
          width={1000}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey='price'/>
          <Tooltip formatter={value => `$${value}`}/>
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#29d329" />
          <Line type="monotone" dataKey="high" stroke="#29d329" />
          <Line type="monotone" dataKey="low" stroke="#29d329" />
        </LineChart>
        </div>
      </div>
    )
  }

  if(loading){
    return(
      <div>Loading</div>
    )
  }else{
    return (
      <div>
        Click to View Chart
        <h3 onClick={()=>setOptions(yearOptions)}>Year</h3>
        <h3 onClick={()=>setOptions(monthOptions)}>Month</h3>
        <h3 onClick={()=>setOptions(weekOptions)}>Week</h3>
        {data && RenderCoin()}
      </div>
    )
  }
}


export default ShowCoin


// change_percent_1d: "-3.57%"
// change_percent_1d_color: "#fa4545"
// change_percent_7d: "-11.13%"
// change_percent_7d_color: "#fa4545"
// country_id: "249"
// cross_rates_name: "ETH"
// currency_symbol: "&#926;"
// id: "195"
// inst_market_cap: "&#x24;494.39B"
// inst_market_cap_plain: "494389060640.46"
// inst_price_btc: "0.0724379"
// inst_price_usd: "4,189.04"
// name: "Ethereum"
// pair_change_arrow: "down_red"
// pair_change_percent_numeric: "-3.57"
// pair_id: 1061443
// percent_change_7d_plain: "-11.13"
// total_volume: "14.16%"
// total_volume_plain: "14.16"
// volume_24h_usd: "&#x24;15.19B"
// volume_24h_usd_plain: "15191543431.93"