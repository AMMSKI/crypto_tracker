import React, { useEffect, useState } from "react";

const ShowCoin = ({coin, showDetails, setShowDetails}) => {
  
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
  },[])



  const RenderCoin = () => {
    return (
      <div>
        <button onClick={()=>setShowDetails(!showDetails)}>Back</button>
        <h1>{coin.name}</h1>
        <div>
          <iframe src={`https://coinmarketcap.com/currencies/${coin.name}/?period=7d`} />
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
        {RenderCoin()}
      </div>
    )
  }
}


export default ShowCoin
