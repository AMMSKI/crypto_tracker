import React, { Fragment } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Hero from './Components/Hero';
import Feed from './Feed';

function App() {
  return (
    <div className="App">
      <Hero />
      <Routes>
        <Fragment>
        <Route path='/' element={<Feed/>} />
        </Fragment>
      </Routes>
    </div>
  );
}

export default App;
