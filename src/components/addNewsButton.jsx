import React from 'react';
import { connect } from 'react-redux'
import { ADD_NEWS } from './../actions/news'

function AddNewsButton({ADD_NEWS}) {
	
		return (
			<button className='app__cover__addNewsButton' onClick={ADD_NEWS}>
				ДОБАВИТЬ НОВОСТЬ
			</button>		
		) 								
}

export default connect(null, {ADD_NEWS})(AddNewsButton);
