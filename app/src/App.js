import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:10000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-intro">{this.state.apiResponse}</h1>
      </div>
    );
  }

}

export default App;
