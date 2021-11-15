import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Feed from './Feed';

function App() {
  return (
    <div className="App">
      <Link to='/'>Feed</Link>
      <Routes>
        <React.Fragment>
        <Route path='/' element={<Feed/>} />
        </React.Fragment>
      </Routes>
    </div>
  );
}

export default App;
