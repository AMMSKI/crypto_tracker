import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoLogoBitcoin } from 'react-icons/io'
import { BiDollar } from 'react-icons/bi'
import ShowCoin from './ShowCoin';
import './StyleSheets/feed.css'


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

const Feed = (props) => {
  const [data, setData] = useState([])
  const [options, setOptions] = useState(setCallOptions('MARKETCAP_DN', '1'))
  const [loading, setLoading] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [myCoin, setMyCoin] = useState([{}])
  
  useEffect(()=>{
    getData()
    setLoading(true)
  },[options])


  const getData = () => {
    axios.request(options).then(function (response) {
      setData(response.data.data[0].screen_data)
      setLoading(false)
    }).catch(function (error) {
      console.error(error);
    });
  }
  const showCoinDetails= (c) => {
    setMyCoin(c)
    setShowDetails(true)
  }

  const renderCoinCard = () => {
      return data.crypto_data.map((c)=> {
        return (
          <div key={c.id} className="feed_coin_card">
            <h2>{c.name}</h2>
            <p><BiDollar />{c.inst_price_usd}</p>
            <p><IoLogoBitcoin />{c.inst_price_btc}</p>
            <p>Today {c.change_percent_1d}</p>
            <button onClick={()=>showCoinDetails(c)}>More Info</button>
          </div>
        )
      })
  }

    // if(loading){
    //   return(
    //     <div>Loading</div>
    //   )
    // }
    if(showDetails){
      return(
        <div>
          <ShowCoin coin={myCoin} setShowDetails={setShowDetails} showDetails={showDetails}/>
        </div>
      )
    }else{
      return(
        <div className='feed_container'>
          <h1>Coins</h1>
          <div className='feed_nav'>
            <h3 onClick={()=>setOptions(setCallOptions('MARKETCAP_DN', '1'))}>Market Cap</h3>
            <h3 onClick={()=>setOptions(setCallOptions('PERC1D_DN', '1'))}>Top Performers</h3>
            <h3 onClick={()=>setOptions(setCallOptions('VOLUME24_DN', '1'))}>Volume</h3>
          </div>
          {loading ? <div>Loading</div> :
            <div className="feed_coin_container">
            {data.crypto_data && renderCoinCard()}
            </div>
          }
        </div>
      )
    }
}

export default Feed