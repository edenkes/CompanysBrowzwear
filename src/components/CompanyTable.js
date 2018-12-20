import React, {Component} from 'react';
import {Container, Table, Button} from 'reactstrap';
import clientsList from "../public/clients.json";
import MapContainer from "./MapContainer";

const first = 0;

class CompanyTable extends Component {
    state = {
        countriesList: [],
        citiesList: [],
        companyList: [],

        countryName: '',
        cityName: '',
        companyName: '',
        companyAddress: '',
    };

    componentWillMount() {
        // Load the attached JSON file
        const countriesList = this.parseList(clientsList['Customers']);

        if(countriesList){
            // The default view is for the first contact of the
            // first city of the first country
            const countryName = countriesList[first].name;

            const citiesList = getCitiesList(countriesList, countryName);
            const cityName = citiesList[first].name;

            const companyList = getCompaniesList(countriesList, countryName, cityName);
            const companyName = companyList[first].name;
            const companyAddress = companyList[first].Address;

            this.setState({
                countriesList: countriesList,
                citiesList: citiesList,
                companyList: companyList,

                countryName: countryName,
                cityName: cityName,
                companyName: companyName,
                companyAddress: companyAddress,
            })
        }
    }

    // Parse the List of json into custom data structure
    parseList = (CustomersList) => {
        const countriesList = [];
        CustomersList.forEach(function(element) {
            const countryName = element['Country'];
            const cityName = element['City'];
            const companyName = element['CompanyName'];
            const Address = element['Address'] +', ' + cityName+ ', ' + countryName;

            const citiesList = getCitiesList(countriesList, countryName);

            if (citiesList) {
                const companiesList = getCompaniesList(countriesList, countryName, cityName);

                if (companiesList){
                    companiesList.push({
                        name: companyName,
                        Address: Address
                    })

                } else
                    citiesList.push({
                        name: cityName,
                        companies: [{
                            name: companyName,
                            Address: Address
                        }]
                    })

            }else
                countriesList.push({
                    name: countryName,
                    cities: [{
                        name: cityName,
                        companies: [{
                            name: companyName,
                            Address: Address
                        }]
                    }]
                })
        });

        sort(countriesList);

        return countriesList
    };

    // Click event when user click on a country
    changeCity = (event) => {
        const countriesList = this.state.countriesList;
        const countryName = event.target.textContent;

        const citiesList = getCitiesList(countriesList, countryName);
        const cityName = citiesList[first].name;

        const companyList = citiesList[first].companies;
        const companyName = citiesList[first].companies[first].name;
        const companyAddress = citiesList[first].companies[first].Address;

        this.setState({
            citiesList: citiesList,
            companyList: companyList,

            countryName: countryName,
            cityName: cityName,
            companyName: companyName,
            companyAddress: companyAddress,
        })
    };

    // Click event when user click on a city
    changeCompany = (event) => {
        const countriesList = this.state.countriesList;
        const countryName = this.state.countryName;

        const cityName = event.target.textContent;

        const companyList = getCompaniesList(countriesList, countryName, cityName);
        const companyName =  companyList[first].name;
        const companyAddress = companyList[first].Address;

        this.setState({
            companyList: companyList,

            cityName: cityName,
            companyName: companyName,
            companyAddress: companyAddress,
        })
    };

    // Click event when user click on a company
    changeLocation = (event) => {
        this.setState({
            companyName: event.target.textContent,
            companyAddress: getCompanyAddress(this.state.countriesList, this.state.countryName, this.state.cityName, event.target.textContent),
        });
    };

    render() {
        const {countriesList, citiesList, companyList, companyAddress} = this.state;

        return(
            <Container>
                <Table className="m-4" bordered>
                    <thead>
                    <tr>

                        <th >{
                            /* In the leftmost column, display the list of countries present in the file.*/}
                            Countries
                        </th>
                        <th >
                            {/*Show list of cities in that country in the second column.*/}
                            Cities
                        </th>
                        <th >
                            {/*Show alphabetized list of companies in that city*/}
                            Company
                        </th>
                        <th style={{width: '50%', minWidth: '550px'}}>
                            {/*Show a Google map with a pin at the company address*/}
                            Map
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr >
                        <th>
                            <div className="pre-scrollable">
                                <ul className="list-group">
                                    {countriesList.map(({name}) => (
                                        name === this.state.countryName ? <Button block className="btn btn-outline-primary active border-0" key={name}>
                                                {name}
                                            </Button>
                                            :
                                            <Button block className="btn btn-outline-primary border-0" onClick={this.changeCity.bind(this)} key={name}>
                                                {name}
                                            </Button>
                                    ))}
                                </ul>
                            </div>
                        </th>
                        <th>
                            <div className="pre-scrollable">
                                <ul className="list-group" >
                                    {citiesList.map(({name}) => (
                                        name === this.state.cityName ? <Button block className="btn btn-outline-primary active border-0" key={name}>
                                                {name}
                                            </Button>
                                            :
                                            <Button block className="btn btn-outline-primary border-0" onClick={this.changeCompany.bind(this)} key={name}>
                                                {name}
                                            </Button>
                                    ))}
                                </ul>
                            </div>
                        </th>
                        <th>
                            <div className="pre-scrollable">
                                <ul className="list-group">
                                    {companyList.map(({name}) => (

                                        name === this.state.companyName ? <Button block className="btn btn-outline-primary active border-0" key={name}>
                                                {name}
                                            </Button>
                                            :
                                            <Button block className="btn btn-outline-primary border-0" onClick={this.changeLocation.bind(this)} key={name}>
                                                {name}
                                            </Button>
                                    ))}
                                </ul>
                            </div>
                        </th>
                        <th >
                            <MapContainer
                                address={companyAddress}
                            />
                        </th>
                    </tr>
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default CompanyTable;

function sort(countriesList) {
    // Countries should be sorted by number of cities, highest first.
    countriesList.sort((first, second) => {
        return -(first.cities.length - second.cities.length)
    });

    countriesList.forEach(country => {
        // Cities should be sorted by number of companies, highest first.
        country.cities.sort((first, second) => {
            return -(first.companies.length - second.companies.length)
        });

        country.cities.forEach(city => {
            // Show alphabetized list of companies in that city
            city.companies.sort((first, second) => {
                return first['name'].localeCompare(second['name'])
            })
        })

    })
}

// get a list of cities
function getCitiesList(countriesList, countryName) {
    for (let i = 0; i < countriesList.length; i++) {
        if (countriesList[i].name === countryName) {
            return countriesList[i].cities;
        }
    }
    return undefined;
}

// get a list of Companies
function getCompaniesList(countriesList, countryName, cityName) {
    for (let i = 0; i < countriesList.length; i++) {
        if (countriesList[i].name === countryName) {
            for (let j = 0; j < countriesList[i].cities.length; j++) {
                if (countriesList[i].cities[j].name === cityName) {
                    return countriesList[i].cities[j].companies;
                }
            }
        }
    }
    return undefined;
}

// get a string of company address
function getCompanyAddress(countriesList, countryName, cityName, companyName) {
    for (let i = 0; i < countriesList.length; i++)
        if (countriesList[i].name === countryName)
            for (let j = 0; j < countriesList[i].cities.length; j++)
                if (countriesList[i].cities[j].name === cityName)
                    for (let k = 0; k < countriesList[i].cities[j].companies.length; k++)
                        if (countriesList[i].cities[j].companies[k].name === companyName) {
                            return countriesList[i].cities[j].companies[k].Address;
                        }
    return null
}
