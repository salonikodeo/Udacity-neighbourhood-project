import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    zoom={props.zoom}
    defaultCenter={{ lat: 23.259933, lng: 77.412615 }}
    center={props.center}
  >
    {props.markers && 
      props.markers
        .filter(marker => marker.isVisible)
        .map((marker, id, arr) => {
          const venInfo = props.venues.find(ven => ven.id === marker.id);
          return (
            <Marker 
            key={id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => props.onMarkerClick(marker)}
            animation={arr.length === 1 ? window.google.maps.Animation.BOUNCE : window.google.maps.Animation.DROP}
            >
            {marker.isOpen && venInfo.icon && (
              <InfoWindow>
                <div>
                    <img
                      src={`${venInfo.icon.prefix}200${venInfo.icon.suffix}`}
                      alt={"image of the Venue"}
                    />
                  <p>{venInfo.name}</p>
                  <br/>
                  <p>{venInfo.location.formattedAddress}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
          );
          })
      }
  </GoogleMap>
))
);

export default class Map extends Component {
  render() {
    return (
       <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDIH856EDhM6HZ9pI3A5NhPko9vjNOwBhw"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `75%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}
