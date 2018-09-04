import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmationModal from '../PerfilE/ConfirmationModal'

const styles = {
    root: {
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft:"5%",
      paddingRight:"5%",
      marginTop: 50,
      marginLeft: "20%",
      marginRight: "20%",
    },
  
    card2:{
      marginTop: 50,
      marginLeft: "10%",
      marginRight: "10%",
      paddingTop: 20
    },
  
  
    boton: {
      marginTop: 30,
    },
  
    icono: {
      marginTop: 20,
      marginRight: 15,
      width: 30,
      height: 30,
    },
  
    avatar:{
      width: 120,
      height: 120,
      borderStyle: "groove",
      marginLeft:"41%",
    }
  }


class Eliminar_estudiante extends Component  {

  eliminarTutor(){
    var data = new FormData()
    data.append('EmailE',this.state.EmailE)
    fetch("http://localhost/borrar_estudiante.php", {
      method: 'POST',
      body:data
    })
  }

  constructor(props) {
    super(props);

    this.state = {
      verVista:'',
      tablaNombre: 'placeholder',
      tablaApellido: 'placeholder',
      tablaTelefono: 'placeholder',
      tablaUbicacion: 'placeholder',
      tablaFoto: '',
      EmailE:'prueba2',

    };

    
   
  }

  componentDidMount(){
    var data = new FormData()
    data.append('EmailE',this.state.EmailE)
    fetch("http://localhost/leer_estudiante.php",{
      method: "POST",
      body: data
    })
    .then((response => {
      return response.json()
    }))
    .then( estudiante => {
      this.setState({tablaNombre:estudiante[0].NombreE})
      this.setState({tablaApellido:estudiante[0].ApellidoE})
      this.setState({tablaUbicacion:estudiante[0].localidad})
      this.setState({tablaTelefono:estudiante[0].TelefonoE})
      this.setState({tablaFoto:estudiante[0].ImagenE})
      console.log(estudiante[0].NombreE)
      console.log(this.state)
    })
  }
  

  render(){
   return( 


      
    <Paper style={styles.card2}> 

      <Avatar
        style={{border: 0}} 
        size={100}
        style={styles.avatar}
        src={ "http://localhost"+this.state.tablaFoto.replace("xampp/htdocs/","")}
      />

      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Nombre:</TableCell>
            <TableCell >{this.state.tablaNombre}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Apellido:</TableCell>
            <TableCell>{this.state.tablaApellido}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Telefono:</TableCell>
            <TableCell>{this.state.tablaTelefono}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ubicacion:</TableCell>
            <TableCell>{this.state.tablaUbicacion}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <ConfirmationModal message={"La siguiente accion borrara sus datos de forma permanente, ¿desea continuar?"} onSubmit={()=>this.eliminarTutor()}>
      <Button variant="raised"  color="secondary" style ={styles.boton}>
         Eliminar 
      <DeleteIcon style={{marginLeft: 10}}/>
      </Button>
      </ConfirmationModal>
    </Paper>

    )
  }

}

export default Eliminar_estudiante;