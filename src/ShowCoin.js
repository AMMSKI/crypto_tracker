import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowCoin = () => {
  const params = useParams()
  const [coin, setCoin] = useState([])
  const [loading, setLoading] = useState(false)
  console.log(params)
  useEffect(()=>{
    getCoinData()
  },[])

  let options = {
    method: 'GET',
    url: 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-overview',
    params: {pair_ID: params.pair_ID, time_utc_offset: '28800', lang_ID: '1'},
    headers: {
      'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_CRYPTO_KEY
    }
  };
  
  const getCoinData = () => {
    axios.request(options).then(function (response) {
      console.log(response.data.data[0].screen_data.pairs_data);
      setCoin(response.data.data[0].screen_data.pairs_data)
      setLoading(false)
    }).catch(function (error) {
      console.error(error);
      setLoading(false)
    });
  }
console.log(coin)

  const RenderCoin = () => {
    return (
      <div>
        <h1></h1>
        <div>
          
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
        ShowCoin
        {RenderCoin}
      </div>
    )
  }
}

export default ShowCoin