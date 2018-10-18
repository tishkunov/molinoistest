import React, { Component } from 'react';

import './App.css';

import Cover from './components/cover'
import Footer from './components/footer'
import BodyNews from './containers/bodyNews'

class App extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    }
  }

  componentDidCatch(error, info) {
    console.log(error, info)
    this.setState({hasError: true},() => console.log(this.state.hasError))
  }

  componentDidMount() {
    document.title = "Molinois Test Task"

  }



  render() {
      
      return (
        <div className="App">

          <Cover date={new Date().toLocaleString('ru', {
                      day: 'numeric',
                      year: 'numeric',
                      month: 'long',
                      }).slice(0, -2) 
                      + ', ' +
                      new Date().toLocaleString('ru', {
                        weekday: 'long',
                        hour: 'numeric',
                        minute: 'numeric',
                      }).split(' ').join(' , ')} />
            <BodyNews />          
            <Footer />       

        </div>
      );
  
    
  }
}



export default App;
