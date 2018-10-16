import React, { Component } from 'react';
import { connect } from 'react-redux'

import CardMd from './cardMd'
import Navigation from './navigation'

class BodyNews extends Component {
	render() {
		return (
			<div className='bodyNews'>
				<div className='container'>
					<Navigation filter={this.props.filter}  />
					<CardMd />
				</div>
			</div>		
		); 
	}
										
}


const mapStateToProps = state => {
	return {
		filter: state.news.filter
	}
}

export default connect(mapStateToProps, null)(BodyNews);