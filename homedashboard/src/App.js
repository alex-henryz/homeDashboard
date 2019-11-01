import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home"
import About from "./components/Header"
import Topics from "./components/Header"

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
}

export default App;
