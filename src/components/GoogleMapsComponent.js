// Google Maps Component
// As it describes, takes the longitude and latitude 

// External Packages
import React, { Component } from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY_TWO;

const GoogleMapsComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: props.position.latitude, lng: props.position.longitude }}
    key={new Date().getTime()}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.position.latitude, lng: props.position.longitude }} onClick={props.onMarkerClick} noRedraw={true} />}
    {/* { props.isMarkerShown &&
        <MarkerWithLabel
        position={{ lat: props.position.latitude, lng: props.position.longitude }}
        labelAnchor={{lat: props.position.latitude, lng: props.position.longitude}}
        labelStyle={{backgroundColor: "yellow", fontSize: "32px", padding: "16px"}}
      />
    } */}
  </GoogleMap>
);

class GoogleMapsHOC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMarkerShown: false,
            longitude: props.position.longitude,
            latitude: props.position.latitude
        };
    }

    componentDidMount() {
    this.delayedShowMarker()
    };

    delayedShowMarker = () => {
    setTimeout(() => {
        this.setState({ isMarkerShown: true })
    }, 500)
    }

    handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
    }

    render() {
        const { longitude, latitude } = this.props.position;
        let position;

        // Created in the event that a user clicks on Next while they are looking at the MAP.
        // There's a slight chance that the following (NEXT) article does not have any longitude or latitude associated with it 
        // and since the component rendered would still be the map (GoogleMapsComponent), it would return an error 
        // This ensures that the state in the parent component is changed so that the 'Outline' (Text) is showed instead
        if (longitude === 'None') {
            this.props.changeContentDisplay('Outline');
        } else {
            position = {
                longitude: longitude ,
                latitude: latitude,
            }
        }

        return (
            <>
            {
                longitude !== 'None' &&   <GoogleMapsComponent
                                            isMarkerShown={this.state.isMarkerShown}
                                            onMarkerClick={this.handleMarkerClick}
                                            position={position}
                                            />
            }
            </>
        )
    }
}

export default GoogleMapsHOC;