import React from 'react'

function CardLg({props}) {
	return (
		<div className='newsList__cardLg__wrapper'>
			<p className='newsList__cardLg__wrapper__date'>12 Сентября 2018, Среда, 17:07</p>
			<div className='newsList__cardLg'>
			<img src={props.fileTemp} className='newsList__cardLg__bg' alt='Card BG' />
			<div className='newsList__cardMd__wrapper'>		
				<p className='newsList__cardMd__date'>{props.date}</p>
				<a className='newsList__cardMd__title' href='#'>{props.title} </a>
			</div>		
			<div className='newsList__cardMd__type'>{props.category}</div>
				<a className='newsList__cardMd__link' href='javascript:void(0);'><img src='img/share.svg' alt='share' /></a>
			</div>	
		</div>
	);
	
}

export default CardLg;