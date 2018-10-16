import React from 'react';

const footerNav = [
	{
		'link' : 'https://google.ru',
		'name' : 'Редакция'
	}, 
	{
		'link' : 'https://google.ru',
		'name' : 'Реклама'
	},
	{
		'link' : 'https://google.ru',
		'name' : 'Пресс-релизы'
	},
	{
		'link' : 'https://google.ru',
		'name' : 'Техподдержка'
	},
	{
		'link' : 'https://google.ru',
		'name' : 'Спецпроекты'
	},
	{
		'link' : 'https://google.ru',
		'name' : 'Вакансии'
	},
	{
		'link' : 'https://google.ru',
		'name' : 'RSS'
	}
];

function Footer() {

		return (
			<div className='footer'>
				<div className='container'>
					<div className='footer__line'> 

						<input className='footer__firstLine__searchInput' placeholder='Поиск' />

						<div className='footer__firstLine__icon'>
							<a href='https://www.apple.com/ru/ios/app-store/'>
								<img src='/img/icon-appstore.png'  alt='App store icon' />
							</a>
						</div>
						
					</div>

					<div className='footer__line'> 

						<nav className='footer__line__nav'>
							{footerNav.map((item, index) => (
									<li key={index} className='footer__line__nav__listItem'><a className='footer__line__nav__listItem__link' href={item.link}>{item.name}</a></li>
								))			
							}
						</nav>
						<p className='footer__line__copyright'>© 1999–2018 ООО «Мировые новости»</p>
					</div>
				</div>
			</div>
		) 			
					
	
}

export default Footer;








