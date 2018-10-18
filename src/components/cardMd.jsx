import React from 'react';

function CardMd({props}) {

		return (
			<div className='newsList__cardMd'>
				<img src={props.fileTemp} className='newsList__cardMd__bg' alt='Card BG' />
				<div className='newsList__cardMd__wrapper'>
					
					<p className='newsList__cardMd__date'>{props.date}</p>
					<a className='newsList__cardMd__title' href='#'>{props.title} </a>
				</div>		
				<div className={`newsList__cardMd__type newsList__cardMd__type-${props.nameEng}`}>{props.category}</div>
				<a className='newsList__cardMd__link' href='#'><img src='img/share.svg' alt='share' /></a>
			</div>		
		) 								
}

export default CardMd;