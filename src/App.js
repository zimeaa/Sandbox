import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Screens/Home';
import Dev from './Screens/Dev';
import Scroller from './Screens/Scroller';
import Blog from "./Screens/Blog";

const App = () => {
  return (
    <Router >

      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dev" element={<Dev />} />
          <Route path="/scroller" element={<Scroller />} />
          <Route path="/scroller" element={<Scroller />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
