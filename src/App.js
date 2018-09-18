import React, { Component } from 'react';

import './App.css';
import LoginComponent from './Components/LoginComponent';
import DashBoard from './Components/DashboardComponent';
import { connect } from 'react-redux';


class App extends Component {
  getComponentToRender(){
    if (this.props.isUserLoggedIn) {
      return <DashBoard />
    } else {
      return <LoginComponent />
    }
  }

  render() {
    return (
      <div className="App">
        {this.getComponentToRender()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserLoggedIn: state.isUserLoggedIn,
  }
}

export default connect(mapStateToProps)(App);
