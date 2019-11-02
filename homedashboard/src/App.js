import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home"
import Steam from "./components/SteamPlaytime"

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/steam" component={Steam}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
