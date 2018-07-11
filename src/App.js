import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <Router>
        <div className="App">
          <Home />
        </div>
      </Router>
    );
  }
}

export default App;
