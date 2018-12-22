import React, { Component } from 'react'
import Geocode from "react-geocode";

import {GoogleMapApi} from "../config/keys";

class MapContainer extends Component {
    state = {
        center: {lat: 45.5122308 , lng:-122.6587185}
    };

    componentDidMount() {
        this.renderMap();
        Geocode.setApiKey(GoogleMapApi);
        Geocode.enableDebug();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.address !== prevProps.address) {
            this.getLocation()
        }
    }

    renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?" +
            "key=AIzaSyCo9sOYpFP8-uPhzK_BecdEbjvKaEmR9uY&callback=initMap");
        window.initMap = this.initMap
    };

    getLocation = () => {
        Geocode.fromAddress(this.props.address).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                const center = {lat: lat, lng: lng};

                this.state.map.setCenter(center);

                const marker = new window.google.maps.Marker(
                    {position: center, map: this.state.map, title: this.props.address});

                // Create An InfoWindow
                const infoWindow = new window.google.maps.InfoWindow();

                const contentString = `${marker.title}`;

                // Change the content
                infoWindow.setContent(contentString);

                // Open An InfoWindow
                infoWindow.open(this.state.map, marker)

                this.render()
            },
            error => {
                console.log("ERROR!!11 " + error)

                console.error(error);
            }
        ).catch(error => {
            console.log("ERROR!! " + error)
        });
    };

    initMap = () => {
        // Create A Map
        const map = new window.google.maps.Map(document.getElementById('map'), {
            // center: {lat: -34.397, lng: 150.644},
            center: this.state.center,
            zoom: 15
        });

        const marker = new window.google.maps.Marker({
            position: this.state.center,
            map: map,
            title: `${this.props.address}`
        });

        // Create An InfoWindow
        const infoWindow = new window.google.maps.InfoWindow();

        const contentString = `${marker.title}`;

        // Change the content
        infoWindow.setContent(contentString);

        // Open An InfoWindow
        infoWindow.open(map, marker)

        this.setState({
            map: map
        }, () => this.getLocation())
    };

    render() {
        return (
            <div id="map"/>
        )
    }
}

function loadScript(url) {
    const index = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index)
}

export default MapContainer;

/*
import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {GoogleMapApi} from "../config/keys";
import Geocode from "react-geocode";

export class MapContainer extends Component {
state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    center: {lat: 45.5122308 , lng:-122.6587185}
};

onMarkerClick = (props, marker) =>{
    this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });
};

onMapClicked = () => {
    if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
    }
};

componentWillMount() {
    Geocode.setApiKey(GoogleMapApi);
    Geocode.enableDebug();

    Geocode.fromAddress(this.props.address).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            this.setState({
                center: {lat: lat, lng: lng}
            })
        },
        error => {
            console.error(error);
        }
    );
}

componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.props.address !== nextProps.address) {
        Geocode.fromAddress(nextProps.address).then(
            response => {
                const {lat, lng} = response.results[0].geometry.location;
                this.setState({
                    center: {lat: lat, lng: lng}
                });
            },
            error => {
                console.error(error);
            }
        );
    }

}

render() {
    const {center} = this.state;
    return (
        <Map google={this.props.google}
             onClick={this.onMapClicked}
             zoom={15}
             style={{width: '520px', height: '340px'}}
             center={center} >

            <Marker onClick={this.onMarkerClick}
                    name={this.props.address}
                    position={center}
            />

            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow} >
                <div>
                    <h6 className="">{this.state.selectedPlace.name}</h6>
                </div>
            </InfoWindow>

        </Map>
    );
}
}

export default GoogleApiWrapper({
apiKey: (GoogleMapApi)
})(MapContainer)
*/
