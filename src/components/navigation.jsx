import React from 'react';
import { connect } from 'react-redux'
import { changeFilter } from '../actions/news'

const navItems = [
	{
		name: 'Все',
		key: 'all'
	}, 
	{
		name: 'Политика',
		key: 'politic'
	},
	{
		name: 'Спорт',
		key: 'sport'
	},
	{	
	 	name: 'Проишествия',
	 	key: 'accidents'
	},
	{
		name: 'Наука',
		key: 'science'
	},
	{
		name: 'Бизнес',
		key: 'business'
	}];

function Navigation({filter , changeFilter}) {
		return (
			<div className='navigation' onClick={changeFilter}>
				{navItems.map((item, index) => (
					<li key={index} className='navigation__listItem'  >
						<a name={item.key}  className={item.key === filter? 'navigation__listItem__link navigation__listItem__link-active' : 'navigation__listItem__link'}>{item.name}</a>
					</li>
				))}
			</div>		
		) 								
}

const mapDispatchToProps = dispatch => {
	return {
		changeFilter: e => {
			if (e.target.getAttribute('name') !== null)  dispatch(changeFilter(e.target.getAttribute('name')))
			
		}
	}
}

export default connect(null ,mapDispatchToProps )(Navigation);




