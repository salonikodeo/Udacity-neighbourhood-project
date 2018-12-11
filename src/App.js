import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import SquareAPI from './API/';
import SideBar from './components/SideBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 13,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }
  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers, markers)});
  }
  onMarkerClick = (marker) => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers,marker)});
    const venue = this.state.venues.find(ven => ven.id === marker.id);

    SquareAPI.getVenueDetails(marker.id).then(resp => {
      const newVenue = Object.assign(venue, resp.response.venue);
      this.setState({venues: Object.assign(this.state.venues,newVenue)});
      console.log(newVenue);
    })
  }
  onListClick = venue => {
    const marker =  this.state.markers.find(marker => marker.id === venue.id);
    this.onMarkerClick(marker);
    console.log(venue);
  }
  gm_authFailure() {
    window.alert("Google Maps error!!!");
  }
  componentDidMount() {
    window.gm_authFailure = () => this.gm_authFailure();
    SquareAPI.search({
      near: 'Bhopal,India',
      query: 'food',
      limit: 10
    }).then(result => {
      const { venues } = result.response;
      const { center } = result.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      })
      this.setState({
        venues, center, markers
      });
    })
    .catch(error => alert(error));
  }
  render() {
    return (
      <div className="App">
        <SideBar 
          {...this.state}
          onListClick={this.onListClick}
        />
        <Map 
          {...this.state}
          onMarkerClick={this.onMarkerClick}
          role="application"
          aria-hidden="true"
        />
      </div>
    );
  }
}

export default App;
