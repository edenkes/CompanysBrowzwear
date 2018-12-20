import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {GoogleMapApi} from "../config/keys";

export class MapContainer extends Component {

    render() {



        return (
            <Map google={this.props.google} zoom={14}
                 style={{width: '40%', height: '70%'}}
                 initialCenter={{
                     lat: 40.854885,
                     lng: -88.081807
                 }}
            >

                {/*<Marker onClick={this.onMarkerClick}*/}
                        {/*name={'Current location'} />*/}

                {/*<InfoWindow onClose={this.onInfoWindowClose}>*/}
                    {/*<div>*/}
                        {/*/!*<h1>{this.state.selectedPlace.name}</h1>*!/*/}
                    {/*</div>*/}
                {/*</InfoWindow>*/}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (GoogleMapApi)
})(MapContainer)
