import React from 'react';
import { connect } from 'react-redux'
import { addNews } from './../actions/news'

console.log(addNews)

function AddNewsButton({addNews}) {
	
		return (
			<button className='app__cover__addNewsButton' onClick={addNews}>
				ДОБАВИТЬ НОВОСТЬ
			</button>		
		) 								
}

export default connect(null, {addNews})(AddNewsButton);
