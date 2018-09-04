import React, { Component } from 'react';



var clases = [{"idClase":"1","materia":"Calculo IV","titulo":"Imparto Clase de calculo IV","descripcion":" Quis aute iure reprehenderit in voluptate.","correoT":"lucas@alumnos.ubiobio.cl","fecha":"0000-00-00"},
{"idClase":"2","materia":"Programacion","titulo":"Imparto clases de PHP","descripcion":" qui officia deserunt mollit anim id est laborum.","correoT":"lucas@alumnos.ubiobio.cl","fecha":"0000-00-00"}]


class About extends Component {
constructor(props){



  super(props);



  this.state = {
    clases:'',
    term:''
  }


  this.cualquiera();
  this.searchHandler = this.searchHandler.bind(this);
  this.searchingFor = this.searchingFor.bind(this);
  this.cualquiera = this.cualquiera.bind(this);

}

  searchingFor(term){
    return function(x){
      return x.titulo.toLowerCase().includes(term.toLowerCase()) ||  x.materia.toLowerCase().includes(term.toLowerCase()) ||  x.descripcion.toLowerCase().includes(term.toLowerCase()) || !term;
    }
  }

  searchHandler(event){
    this.setState({
      term:event.target.value
    })
  }




  cualquiera() {

    fetch('http://localhost/build/server/lucas/select.php')
    .then(function(response) {
      return response.json()
    })
    .then((responseJSON)=>{
        
         
           this.state.clases=responseJSON
          
      })
  }




  render() {
    return (
      <div>

      <form>
        <input type="text" name="firstname" onChange={this.searchHandler} value={this.state.term}/>
      </form>

  
      {
        
        
        this.setState({
          clases:
          this.state.clases.filter(this.searchingFor(this.state.term)).map((clase)=>{
            return(
              <div key={clase.idClase}>

              materia:
              {clase.materia} <br/>
              titulo:
              {clase.titulo} <br/>
              descripcion:
              {clase.descripcion}<br/>
              correoT: 
              {clase.correoT}<br/>
              fecha:
              {clase.date} <br/>
              __________

            </div>
          )
        })
      })
      }


      </div>
    );
  }
}

export default About;
