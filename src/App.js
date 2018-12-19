import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import AppNavbar from './components/AppNavbar';
import CompanyTable from './components/CompanyTable';

class App extends Component {
  render() {
    return (
      <div className="App">
          <AppNavbar/>
          <CompanyTable />
      </div>
    );
  }
}

export default App;
