import React from 'react';
import { connect } from 'react-redux'
import { addNewsHandler } from './../actions/news'

function AddNewsButton({addNewsHandler}) {
	
		return (
			<button className='app__cover__addNewsButton' onClick={addNewsHandler}>
				ДОБАВИТЬ НОВОСТЬ
			</button>		
		) 								
}

export default connect(null, {addNewsHandler})(AddNewsButton);
