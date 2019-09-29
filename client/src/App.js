import React, { Component } from "react";
import "./App.css";
import Head from "./components/Header";
import 'antd/dist/antd.css';
import Users from "./components/Users";

class App extends Component {
  render() {
    return (
      <div>
        <Head />
        <Users/>
      </div>
    );
  }
}

export default App;
