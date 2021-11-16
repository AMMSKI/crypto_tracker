import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

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

