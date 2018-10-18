import React, { Component } from 'react';
import { connect } from 'react-redux'
import { closeForm, setNewsData } from './../actions/news'



const categories = [
	{
		nameRus: 'Спорт',
		nameEng: 'sport'
	},
	{
		nameRus: 'Политика',
		nameEng: 'politic'
	}, 
	{
		nameRus: 'Проишествия',
		nameEng: 'incident'
	},
	{
		nameRus: 'Наука',
		nameEng: 'science'
	}, 
	{
		nameRus: 'Бизнес',
		nameEng: 'business'
	} ];

class FormAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectView : false,
			category: 'Категория',
			title: '',
			text: '',
			file:null,
			fileValue: 'Upload file',
			validation: false,
			fileTemp: '',
			nameEng:''
		}
	}

	handleChangeSelect = (e) => {
		if (e.target.classList.contains('formAddNews__select') || e.target.classList.contains('formAddNews__select-active')) {
			this.setState({selectView: true, category: ''})	
		} else {
			this.setState({selectView: false, category: e.target.getAttribute('value'), nameEng: e.target.getAttribute('nameeng')}, () => this.validation())
		}
	}

	handleChangeInput = (e) => {
		this.setState({[e.target.name] : e.target.value}, () => this.validation())
	}

	validation = () => {
		const { file, text, title, category, fileValue } = this.state;
		if (file !== null && text !== '' && title !== '' && category !== 'Категория' && category !== '' && fileValue !== 'Upload file') {
			this.setState({validation: true} )
		}  else {
			this.setState({validation: false} )
		}
		console.log(this.state.nameEng)
	}

	handleClickInputFile = (e) => {
		
		e.target.previousElementSibling.click();
	}

	handleChangeInputFile = (e) => {
		this.setState({file: e.target.files[0], fileValue: e.target.files[0].name}, () => this.validation())
	}

	handleRemoveFile = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.setState({file: null, fileValue: 'Upload file'}, () => this.validation())
	} 

	handleSubmit = (e) => {
		e.preventDefault();
		const { title, file , text, category, fileTemp , nameEng } = this.state;
		if (this.state.validation) {
			let fr = new FileReader();
			
			
			fr.onload = (e) =>  {
				  	const date = new Date().toLocaleString('ru', {
		                      day: 'numeric',
		                      year: 'numeric',
		                      month: 'long',
		                      }).slice(0, -2) 
		                      + ', ' +
		                      new Date().toLocaleString('ru', {
		                        weekday: 'long',
		                        hour: 'numeric',
		                        minute: 'numeric',
		                      }).split(' ').join(' , ');
					if (localStorage.getItem('news') === null) {
						
						const item = {
							title,
							fileTemp: e.target.result,
							text,
							category,
							id:1,
							date,
							nameEng
						}
						const news = [item];
						localStorage.setItem('news', JSON.stringify(news))
					} else {
						
						let news = JSON.parse(localStorage.getItem('news'));
						const item = {
							title,
							fileTemp: e.target.result,
							text,
							category,
							id: news.length + 1,
							date,
							nameEng
						}
						news = [...news, item]
						localStorage.setItem('news', JSON.stringify(news))
					}
					this.props.closeForm();
					this.props.setNewsData(JSON.parse(localStorage.getItem('news')));
				   
			}
			fr.readAsDataURL(file);
			
			
		}
	}

	render() {
		const { selectView, category, title, text, fileValue, validation, file } = this.state;
		const selectItems = selectView ?  categories.map((item, index) => (<div  key={index} className='formAddNews__select__item' nameeng={item.nameEng} value={item.nameRus} >{item.nameRus} </div>)) : null;
		return (
			<div className='blur-bg'>
				<form className='formAddNews' onSubmit={this.handleSubmit}>
					<div className='formAddNews__closeButton' onClick={this.props.closeForm} ></div>
					<h3 className='formAddNews__title'>TITLE</h3>
					<input className={title === ''  || title === ' ' ? 'formAddNews__input' : 'formAddNews__input-active'} onChange={this.handleChangeInput} value={title} name='title'  type='text' />
					<input className={text === '' ||  text === ' ' ?  'formAddNews__input' : 'formAddNews__input-active'} onChange={this.handleChangeInput} value={text} name='text' type='text' />
					<div className={category === 'Категория'|| category === ''  ? 'formAddNews__input formAddNews__select' : 'formAddNews__input formAddNews__select-active'} onClick={this.handleChangeSelect}>{category}  {selectItems}</div>
					
					<input type='file' name='file' className='formAddNews__inputFile' onChange={this.handleChangeInputFile} />
					<div className={fileValue === 'Upload file' ||  fileValue === ' ' ?  'formAddNews__input' : 'formAddNews__input-active'} onClick={this.handleClickInputFile} >
						{fileValue} 
						{file !== null ? (<button className='formAddNews__removeFile' onClick={this.handleRemoveFile}><img src='img/icon-close-button.svg' width='11' height='11' /></button>) : null}
						
					</div> 
					<button type='submit' className={!validation ? 'formAddNews__buttonSubmit-disabled' : 'formAddNews__buttonSubmit-active' }>ОТПРАВИТЬ</button>
				</form>
			</div>		
		) 
	}
										
}


const mapDispatchProps = dispatch => {
	return {
		closeForm: () => {
			dispatch(closeForm())
		},
		setNewsData: (payload) => {
			dispatch(setNewsData(payload))
		}
	}
}

export default connect(null, mapDispatchProps)(FormAdd);
