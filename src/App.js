import React, { Component } from 'react';


import LoginPage from './views/LoginPage/LoginPage';
import Validacion from './views/Validacion/Validacion';
import RegistroPage from './views/RegistroPage/RegistroPage';
import Guardar_estudiante from './views/PerfilE/guardar_estudiante'
import Editar_Estudiante from './views/EditarPerfilE/Editar_Estudiante'
import Eliminar_estudiante from './views/EliminarPerfilE/Eliminar_estudiante'
import Vista1 from './views/PerfilT/Vista1'
import HomePage from './views/HomePage/HomePage';
import ChoosePage from './views/ChoosePage/ChoosePage';
import EditarTutor from './views/EditarPerfilT/EditarTutor';
import Vista2 from './views/VerPerfilT/Vista2'
import Blog from './views/AddTutoria/AddTutoria'
import AnuncioAlumno from './views/AnuncioAlumno/AnuncioAlumno'



 
class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      tipo:'',
      correo:'',
      logg: 0
    }
    this.IniciarSesion=this.IniciarSesion.bind(this);
    this.cerrarSesion=this.cerrarSesion.bind(this);

    this.SetLog = this.SetLog.bind(this);
  }

  SetLog(result){
    this.setState({logg:result})
  }

  cerrarSesion(){

    // fetch("../server/closeSession.php")
    fetch("http://localhost/build/server/closeSession.php")
    
    .then(()=>{
        this.setState({
          tipo:"",
          correo:""
          
        })
    })
  }
  IniciarSesion(correo, tipo){
    // fetch("../server/initSession.php")
  
    fetch("http://localhost/build/server/initSession.php",{
      method:'POST',
      headers:{
       
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials:'include',
      
      body: "email="+correo+"&tipo="+tipo
    })
    .then((response) =>{
      return response.json()
    }).then((myjson)=> this.setState({correo : myjson["email"],tipo:myjson["tipo"]})
          
            );
  }

 

  render() {
    var {logg} = this.state
    return (
      
     
      <div className='row'>

     
    
      { logg === 0? <HomePage SetLog={this.SetLog}
                              tipo={this.state.tipo}
                              cerrarSesion={this.cerrarSesion}
                                         /> :
          logg === 1? <LoginPage IniciarSesion={this.IniciarSesion}
                                  SetLog={this.SetLog} />:                            
         logg === 2? <Validacion SetLog={this.SetLog}/> :
         logg === 3? <ChoosePage SetLog={this.SetLog}/> :
         logg === 4? <RegistroPage SetLog={this.SetLog}/> :
         logg === 5 ? <Guardar_estudiante email={this.state.correo} SetLog={this.SetLog}/> :
         logg === 6 ? <Editar_Estudiante email={this.state.correo} SetLog={this.SetLog}/> :
         logg === 7 ? <Eliminar_estudiante email={this.state.correo} SetLog={this.SetLog}/>: 
         logg === 8 ? <Vista1 email={this.state.correo} SetLog={this.SetLog}/> :
         logg === 9 ? <EditarTutor email={this.state.correo} SetLog={this.SetLog}/> :
         logg === 10 ? <Vista2 email={this.state.correo} SetLog={this.SetLog}/> : 
         logg === 11 ? <Blog SetLog={this.SetLog}/> : 
         logg === 12 ? <AnuncioAlumno correo={this.state.correo} SetLog={this.SetLog}/> :null}
    
       
      </div>
      
     
      
    );
  }
}

export default App;
