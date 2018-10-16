import React from 'react';
import AddNewsButton from './addNewsButton'

function Cover({date}) {
		return (
			<div className='app__cover'>
				<h1 className='app__cover__headline'>Мировые новости</h1>
				<p className='app__cover__date'>{date}</p>
				<AddNewsButton />
			</div>		
		) 								
}

export default Cover;








