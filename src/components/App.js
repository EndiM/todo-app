import React from "react";
import TodoPage from './TodoPage';
import { hot } from "react-hot-loader";

class App extends React.Component {
  render() {
    return (<TodoPage />
    );
  }
}

export default hot(module)(App);
