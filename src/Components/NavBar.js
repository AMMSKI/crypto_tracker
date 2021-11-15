import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div>
      <Link to='/'>Feed</Link>
      </div>
      <div>
        {/* <Link to='show'>Show</Link> */}
      </div>
      <div>
        {/* <Link /> */}
      </div>
    </div>
  )
}

export default NavBar