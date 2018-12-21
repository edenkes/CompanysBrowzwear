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

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.props.address !== nextProps.address){
            Geocode.fromAddress(nextProps.address).then(
                response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    this.setState({
                        center: {lat: lat, lng: lng}
                    });

                },
                error => {
                    console.error(error);
                }
            );
        }
        return true
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
