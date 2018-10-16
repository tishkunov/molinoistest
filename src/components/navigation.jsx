import React from 'react';

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

function Navigation({filter}) {
		return (
			<div className='navigation'>
				{navItems.map((item, index) => (
					<li key={index} className='navigation__listItem'  >
						<a href='#' className={item.key === filter? 'navigation__listItem__link navigation__listItem__link-active' : 'navigation__listItem__link'}>{item.name}</a>
					</li>
				))}
			</div>		
		) 								
}

export default Navigation;




