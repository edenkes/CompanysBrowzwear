import React, { Component } from 'react';
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import AppNavbar from './components/AppNavbar';
import CompanyTable from './components/CompanyTable';
import PageNotAvailable from './components/PageNotAvailable'

class App extends Component {
    render() {
        return (
            <div className="App">
                <AppNavbar/>
                <Router>
                    <Switch>
                        <Route path="/search/:country?/:city?/:company?/:location?" component={CompanyTable} />
                        {/*<Route path="/search/country=:country?/city=:city?/company=:company?/location=:location?" component={CompanyTable} />*/}
                        <Route path='/' exact component={CompanyTable} />
                        <Route component={PageNotAvailable}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
