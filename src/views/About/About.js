import React, { Component } from 'react';



const clases = [
  {
    id:1,
    materia:"Quimika",
    titulo:"quimixa 1",
    descripcion:"clasede quimica",
    rut:"191094123",
    date:"131231",
  },
  {
    id:1,
    materia:"matematicas",
    titulo:"matematicas 1",
    descripcion:"clasede matematicas",
    rut:"191094123",
    date:"131231",
  },
  {
    id:1,
    materia:"edo",
    titulo:"edo 1",
    descripcion:"clasede edo",
    rut:"191094123",
    date:"131231",
  }
]


class About extends Component {
constructor(props){
  super(props);

  this.state = {
    clases:clases,
    term:''
  }
  this.searchHandler = this.searchHandler.bind(this);
  this.searchingFor = this.searchingFor .bind(this);
}

  searchingFor(term){
    return function(x){
      return x.titulo.toLowerCase().includes(term.toLowerCase()) ||  x.materia.toLowerCase().includes(term.toLowerCase()) ||  x.descripcion.toLowerCase().includes(term.toLowerCase()) ||  x.rut.toLowerCase().includes(term.toLowerCase()) || !term;
    }
  }

  searchHandler(event){
    this.setState({
      term:event.target.value
    })
  }




  render() {
    return (
      <div>

      <form>
        <input type="text" name="firstname" onChange={this.searchHandler} value={this.state.term}/>
      </form>


      {
        clases.filter(this.searchingFor(this.state.term)).map((clase)=>{
          return(
            <div key={clase.id}>
              <h3>{clase.materia}</h3>
              <h3>{clase.titulo}</h3>
              <h3>{clase.descripcion}</h3>
              <h3>{clase.rut}</h3>
              <h4>{clase.date}</h4>
            </div>
          )
        })
      }


      </div>
    );
  }
}

export default About;
