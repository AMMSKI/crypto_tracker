import React, { Fragment } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import NavBar from './Components/NavBar';
import Feed from './Feed';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Fragment>
        <Route path='/' element={<Feed/>} />
        </Fragment>
      </Routes>
    </div>
  );
}

export default App;
