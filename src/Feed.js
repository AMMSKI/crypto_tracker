import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CoinCard from './Components/CoinCard';
import { apikey } from './Components/apikey'

let options = {
  method: 'GET',
  url: 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins/list',
  params: {
    edition_currency_id: '12',
    time_utc_offset: '28800',
    lang_ID: '1',
    sort: 'PERC1D_DN',
    page: '1'
  },
  headers: {
    'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
    'x-rapidapi-key': apikey
  }
};


const Feed = () => {
  const [data, setData] = useState([])

  useEffect(()=>{
    getData()
  },[])

  const getData = () => {
    axios.request(options).then(function (response) {
      console.log(response.data)
      console.log(response.data.data[0].screen_data);
      setData(response.data.data[0].screen_data)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const renderCoinCard = () => {
      return data.crypto_data.map((c)=> <CoinCard coin={c} />)
  }

  return (
    <div>
      <h1>Feed</h1>
      <div id="feed_coin_container">
      {data.crypto_data && renderCoinCard()}
      </div>
    </div>
  )
}

export default Feed