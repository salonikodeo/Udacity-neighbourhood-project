import React, {Component} from 'react';
import VenueList from './VenueList';

export default class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: "",
			venues: []
		};
	}
	//filter the venues based on query
	filterVenues = () => {
		if(this.state.query.trim() !== "") {
			const venues = this.props.venues.filter(venue => 
				venue.name
				.toLowerCase()
				.includes(this.state.query.toLowerCase())
			)
			return venues;
		}
		return this.props.venues;
	}
	handleChange = event => {
		this.setState({ query: event.target.value});
		const markers = this.props.venues.map(venue => {
			const isMatched = venue.name
				.toLowerCase()
				.includes(event.target.value.toLowerCase());
			const marker = this.props.markers.find(marker => marker.id === venue.id);
			if(isMatched) {
				marker.isVisible = true;
			}
			else {
				marker.isVisible = false;
			}
			return marker;
		})
		this.props.updateSuperState({ markers });
	}
	render() {
		return (
			<div className="sideBar">
				<input type={"text"} id={"search"} placeholder={"Filter Venues"} onChange={this.handleChange}/>
				<VenueList
					{...this.props}
					venues={this.filterVenues()}
					onListClick={this.props.onListClick}
				/>
			</div>
		)
	}
}