import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CoinCard from './Components/CoinCard';




// Sort options: PERC1D_DN (Chg 24h) | PERC7D_DN (Chg 7D) | MARKETCAP_DN (Market Cap) | VOLUME24_DN (Vol 24h) | TOTAL_VOLUME_DN (Total vol)


const setCallOptions = (sort, page)=>{
  return {
    method: 'GET',
    url: 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins/list',
    params: {
      edition_currency_id: '12',
      time_utc_offset: '28800',
      lang_ID: '1',
      sort: sort,
      page: page
    },
    headers: {
      'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_CRYPTO_KEY
    }
  }
}

const Feed = () => {
  const [data, setData] = useState([])
  const [options, setOptions] = useState(setCallOptions('MARKETCAP_DN', '1'))
  const [loading, setLoading] = useState(true)
  
  useEffect(()=>{
    getData()
    setLoading(true)
  },[options])


  const getData = () => {
    axios.request(options).then(function (response) {
      console.log(response.data)
      console.log(response.data.data[0].screen_data);
      setData(response.data.data[0].screen_data)
      setLoading(false)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const renderCoinCard = () => {
      return data.crypto_data.map((c)=> <CoinCard coin={c} />)
  }

    if(loading){
      return(
        <div>Loading</div>
      )
    }else{
      return(
        <div>
          <h1>Coins</h1>
          <div>
            <h3 onClick={()=>setOptions(setCallOptions('MARKETCAP_DN', '1'))}>Market Cap</h3>
            <h3 onClick={()=>setOptions(setCallOptions('PERC1D_DN', '1'))}>Top Performers</h3>
            <h3 onClick={()=>setOptions(setCallOptions('VOLUME24_DN', '1'))}>Volume</h3>
          </div>
          <div id="feed_coin_container">
          {data.crypto_data && renderCoinCard()}
          </div>
        </div>

      )
    }
}

export default Feed