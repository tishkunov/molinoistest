import React, { Component } from 'react';
import { connect } from 'react-redux'

import CardMd from './cardMd'
import Navigation from './navigation'
import MainNews from './mainNews'
import FormAdd from './formAdd'

class BodyNews extends Component {

	render() {
		const { stateOfAdding, filter  } = this.props;
		const formAdding = this.props.stateOfAdding === 'active' ? (<FormAdd />) : null;
		return (
			<div className='bodyNews'>
				<div className='container'>
					<Navigation filter={filter}  />
					<div className='bodyNews__wrapperMainNews'>
						<div className='newsList__cardLg__wrapper'>
							<p className='newsList__cardLg__wrapper__date'>12 Сентября 2018, Среда, 17:07</p>
							<div className='newsList__cardLg'>
								<img src='img/news-photo.jpg' className='newsList__cardLg__bg' alt='Card BG' />
								<div className='newsList__cardMd__wrapper'>
									
									<p className='newsList__cardMd__date'>18:08, 12 сентября 2018</p>
									<a className='newsList__cardMd__title' href='#'>Виктор Ан обратился к болельщикам </a>
								</div>		
								<div className='newsList__cardMd__type'>Sport</div>
								<a className='newsList__cardMd__link' href='javascript:void(0);'><img src='img/share.svg' alt='share' /></a>
							</div>	
						</div>
						<MainNews />
					</div>
					{formAdding}
					<CardMd />

				</div>
			</div>		
		); 
	}
										
}


const mapStateToProps = state => {
	return {
		filter: state.news.filter,
		stateOfAdding: state.news.stateOfAdding
	}
}

export default connect(mapStateToProps, null)(BodyNews);