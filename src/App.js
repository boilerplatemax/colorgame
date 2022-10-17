import React from 'react'
import './CSS/App.css';
import ColorGame from './Components/ColorGame';
import MatchGame from './Components/MatchGame';
import Navigation from './Components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom";
import {
  HashRouter as Router,Routes,
  Route
} from "react-router-dom";




function App() {
return(
  <div className='App'>
    <Navigation/>
    {/* <ColorGame/> */}

    <Router>
    <Routes>
  
    <Route exact path="/" element={<MatchGame/>}/>
        

      <Route path="/matchgame" element={<MatchGame/>}>
        
      </Route>
      <Route path="/colorgame" element={<ColorGame/>}>
        
      </Route>
      </Routes>
  </Router>
  </div>
);
}
export default App;
