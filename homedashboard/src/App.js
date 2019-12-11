import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import SteamPlaytime from './components/SteamPlaytime';
import Todo from './components/Todo';

const styles = {
  root: {
    overflowX: "hidden",
    overflowY: "hidden"
  }
}

function App() {
  return (
    <Router>
      <div style={styles.root}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/steam" component={SteamPlaytime}/>
          <Route path ="/todo" component={Todo}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
