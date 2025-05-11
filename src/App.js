import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Screens/Home';
import Dev from './Screens/Dev';
import Scroller from './Screens/Scroller';

const App = () => {
  return (
    <Router >

      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dev" element={<Dev />} />
          <Route path="/scroller" element={<Scroller />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
