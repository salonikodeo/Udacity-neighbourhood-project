import React, {Component} from 'react';
import ListItem from './ListItem';

export default class VenueList extends Component {
	render() {
		return (
			// eslint-disable-next-line
			<ol className="venueList" role="list">
				{this.props.venues && 
					this.props.venues.map((venue, id) => (
						<ListItem
							key={id}
							{...venue}
							onListClick={this.props.onListClick}
						/>
					))
				}
			</ol>
		)
	}
}