import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const ShowCoin = () => {
  const params = useParams()
  const [coin, setCoin] = useState([])
  const [chart, setChart] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getCoinData()
    setLoading(true)
  },[])
  var options = {
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
      setChart(response.data.data[0].screen_data.pairs_attr[0].chart_link)
      setLoading(false)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const RenderCoin = () => {
    return (
      <div>
        <div>

        </div>
        <div style={{width:'100%', height:'75vh'}}>
        <iframe style={{width:'100%', height:'100%'}} src={chart} allowfullscreen></iframe>
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
        {chart && RenderCoin()}
      </div>
    )
  }
}

export default ShowCoin