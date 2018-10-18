import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import history from './../history';

import CardMd from './cardMd'
import Navigation from './navigation'
import MainNews from './mainNews'
import FormAdd from './formAdd'
import CardLg from './cardLg'

import { setNewsData, changePage } from './../actions/news'

import { Link } from 'react-router-dom'

class BodyNews extends Component {

	componentDidMount() {
		if (localStorage.getItem('news') !== null && localStorage.getItem('news') !== undefined) {
			this.props.setNewsData(JSON.parse(localStorage.getItem('news')))

		}
	}

	handleChangePage = (e) => {
		e.preventDefault();
		
		history.push(`?page=${e.target.value}`);

		this.props.changePage(e.target.value)
	}

	render() {

		const { stateOfAdding, filter, newsList, page , countPages } = this.props;
		console.log(newsList)
		const formAdding = this.props.stateOfAdding === 'active' ? (<FormAdd />) : null;
		return (
			<div className='bodyNews'>
				<div className='container'>
					<Navigation filter={filter}  />

					<div className='bodyNews__wrapperMainNews'>
						{newsList.filter(item => item.id >= ((page * 3) - 2) && item.id <= page * 3 ).map((item, index) => index === 0 ? (
							<Fragment key={item.id}>
								<CardLg props={item} />
								<MainNews />
							</Fragment>
							) : (
							<CardMd key={item.id} props={item} />
						))}
						
					</div>
					{formAdding}
					<div className='bodyNews__pagination' onClick={this.handleChangePage} style={{ marginTop: '50px'}} >
						{countPages.map((item, index) => (<button key={index}  value={item}>{item}</button>))}
					</div>
					
					
					

				</div>
			</div>		
		); 
	}
										
}


const mapStateToProps = state => {
	return {
		filter: state.news.filter,
		stateOfAdding: state.news.stateOfAdding,
		newsList: state.news.newsList,
		page: state.news.page,
		countPages: state.news.countPages
	}
}

const mapDispatchProps = dispatch => {
	return {
		setNewsData: (payload) => {
			dispatch(setNewsData(payload))
		},
		changePage: (payload) => {
			dispatch(changePage(payload))
		}
	}
}

export default connect(mapStateToProps, mapDispatchProps)(BodyNews);