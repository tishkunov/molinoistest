import React from 'react';

function CardMd({date}) {
		return (
			<div className='newsList__cardMd'>
				<img src='img/news-img-example.jpg' className='newsList__cardMd__bg' alt='Card BG' />
				<div className='newsList__cardMd__wrapper'>
					
					<p className='newsList__cardMd__date'>18:08, 12 сентября 2018</p>
					<a className='newsList__cardMd__title' href='#'>Виктор Ан обратился к болельщикам </a>
				</div>		
				<div className='newsList__cardMd__type'>Sport</div>
				<a className='newsList__cardMd__link' href='#'><img src='img/share.svg' alt='share' /></a>
			</div>		
		) 								
}

export default CardMd;