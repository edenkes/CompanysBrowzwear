import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {GoogleMapApi} from "../config/keys";
import Geocode from "react-geocode";

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        center: {lat: 42, lng:42}
    };

    onMarkerClick = (props, marker, e) =>{
        // console.log(props, marker, e);
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    };

    onMapClicked = (props) => {
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
                // console.log('response 1', this.props.address, lat, lng);
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
        // console.log('new ', nextState.latitude);
        // console.log('old ', this.state.latitude);
        if(this.props.address !== nextProps.address/* || nextState.latitude !== this.state.latitude*/){
            Geocode.fromAddress(nextProps.address).then(
                response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    // console.log('response ', this.props.address, lat, lng);
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
        const {center} = this.state
        // console.log(center);

        return (
            <Map google={this.props.google}
                 onClick={this.onMapClicked}
                 zoom={16}
                 style={{width: '40%', height: '60%'}}
                 center={center} >

                <Marker onClick={this.onMarkerClick}
                        name={this.props.address}
                        position={center}
                    /*position={{
                            lat: this.state.latitude,
                            lng: this.state.longitude
                        }} *//>

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h2 className="">{this.state.selectedPlace.name}</h2>
                    </div>
                </InfoWindow>

            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (GoogleMapApi)
})(MapContainer)
