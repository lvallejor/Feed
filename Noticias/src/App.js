import React, { Component } from 'react';
import Buscador from './components/Buscador';
import Noticias from './components/Noticias';

class App extends Component {

  state = {
    terminos:"",
    noticias:[]
  }

  consultarApi = () =>{
    //var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var proxyUrl = '';
    var url = "http://localhost:4000/api/allnews/";
    fetch(proxyUrl+url, {
      method: 'get',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then((respuesta) => respuesta.json())
    .then((resultado) => this.setState({ noticias : resultado}))
    .catch(() => console.log("Can’t access "+url+" response. Blocked by browser?"));

  }

  datosBusqueda = (termino) =>{
    this.setState({termino},()=>{
      this.consultarApi();
    })
  }

  render() {
    if(this.state.noticias.length < 1){ 
      this.consultarApi();  
    }
    
    return (
      <div className="App container">
        <div className="jumbotron">
        <h1 class="display-3">HN Feed</h1>
          <p className="lead text-center">We love {"<3"} Noticias Hack</p>
          <Buscador 
          datosBusqueda={this.datosBusqueda}/>
        </div>
        <Noticias 
          noticias={this.state.noticias}
          consultarApi={this.consultarApi}
        />
        
      </div>
    );
  }
}

export default App;
