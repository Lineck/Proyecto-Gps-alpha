import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Send from '@material-ui/icons/Send';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Header from "components/Header/Header.jsx";
import MenuE from "../../components/MenuE/MenuE";

const styles = {
    root: {
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft:"5%",
      paddingRight:"5%",
      marginTop: "20vh",
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
    list: {
    
      fontSize: "14px",
      margin: 0,
      paddingLeft: "0",
      listStyle: "none",
      paddingTop: "0",
      paddingBottom: "0",
     
    },
    listItem: {
      float: "left",
      color: "inherit",
      position: "relative",
      display: "block",
      width: "auto",
      margin: "0",
      padding: "0",
      
    },
  
    avatar:{
      width: 60,
      height: 60,
      borderStyle: "groove",
    }
  }

  class Editar_Estudiante extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        nombre: '',
        apellido: '',
        fono: '',
        ubicacion: '',
        foto: '',
        vistaPrevia: '',
        verVista2:'false',
        error_nombre: '',
        error_apellido: '',
        error_fono: '',
        error_ubicacion: '',
        EmailE: ''
      };
      this.state.EmailE=this.props.email;
  
      this.handleSubmit = this.handleSubmit.bind(this);
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
          this.setState({nombre:estudiante[0].NombreE})
          this.setState({apellido:estudiante[0].ApellidoE})
          this.setState({ubicacion:estudiante[0].localidad})
          this.setState({fono:estudiante[0].TelefonoE}   )
          //this.setState({foto:estudiante[0].ImagenE})
          this.setState({vistaPrevia:estudiante[0].ImagenE})
          console.log(estudiante[0].NombreE)
          console.log(this.state)
        })
      }


    handleImageChange = (e) => {
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
      this.setState({ vistaPrevia:reader.result });
      this.setState({ foto:file });
      console.log(reader.result);
      }
      reader.readAsDataURL(file)
    }
  
    handleChange = event => { 
      this.setState({ [event.target.name]: event.target.value });
    };
  
      handleSubmit = (e) => {

      if(this.validar()==true){
      var data = new FormData()
      data.append("has_image", this.state.foto === ""? "false": "true")
      data.append('nombreE', this.state.nombre)
      data.append('apellidoE', this.state.apellido)
      data.append('ubicacionE', this.state.ubicacion)
      data.append('telefonoE', this.state.fono)
      data.append('foto', this.state.foto)
      data.append('EmailE',this.state.EmailE)
      
      fetch("http://localhost/editar_estudiante.php",
      {
      method: "POST",
      body: data
      }) 
      //this.props.cambio()
    }
      e.preventDefault();
      this.state.verVista = 0;
    };
  
      validar = () =>{
  
          var flagError = true;
  
          if(this.state.nombre === ''){
            flagError=false;
            this.setState({error_nombre : "Campo requerido"})
          }
          
          if(this.state.ubicacion === ''){
            flagError=false;
            this.setState({error_ubicacion : "Campo requerido"})
          }
  
          if(this.state.apellido === ''){
            flagError=false;
            this.setState({error_apellido : "Campo requerido"})
          }
  
          if(this.state.fono === ''){
            flagError=false;
            this.setState({error_fono : "Campo requerido"})
          }
          
          if(this.state.fono.length > 9){
            flagError=false;
            this.setState({error_fono : "Maximo 9 numeros"})
          }
  
          if(this.state.fono.length < 9){
            flagError=false;
            this.setState({error_fono : "Minimo 9 numeros"})
          }
  
  
          return flagError;
      }
  
  
  
    render() {
      return (
        <div>
        
        <Header        
        SetLog={this.props.SetLog}
        color="transparent"
        brand="Tutorias UBB"
        fixed
        rightLinks={
          <List style={styles.list}>
            <ListItem style={styles.listItem}>
              <Button onClick={()=>this.props.SetLog(1)} style={{color:"#fff"}}>iniciar sesion</Button>
            </ListItem>
          <ListItem style={styles.listItem}>
          <MenuE  SetLog={this.props.SetLog} cerrarSesion={this.props.cerrarSesion}/>   

          
             
          </ListItem>
         
                </List>
        }
        
        changeColorOnScroll={{
          height: 400,
          color: "primary"
        }}

        
        
      />

        <Paper  style ={styles.root}  elevation={4}>
          <Typography variant="headline" component="h3">
            Actualizar perfil.
          <Divider /> 
          </Typography>
  
          <TextField
            name="nombre"
            value={this.state.nombre}
            onChange={this.handleChange}
            required
            id="input"
            label="Nombre"
            type="text"
            placeholder="Primer nombre"
            error={this.state.error_nombre===''? false : true}
            helperText={this.state.error_nombre}
          />
          
          <br />
          <TextField
            value={this.state.apellido}
            name="apellido"
            onChange={this.handleChange}
            required
            id="input"
            label="Apellido"
            type="text"
            margin="normal"
            placeholder="Apellido paterno"
            error={this.state.error_apellido===''? false : true}
            helperText={this.state.error_apellido}
          />        
          <br />
          <TextField
            value={this.state.fono}
            name="fono"
            onChange={this.handleChange}
            required
            id="input"
            label="Numero de telefono"
            type="number"
            margin="normal"
            placeholder="Telefono de 9 digitos"
            error={this.state.error_fono===''? false : true}
            helperText={this.state.error_fono}
          />
          <br />  
          <br />
          <InputLabel htmlFor="age-helper">Ubicacion</InputLabel>
          <br />
          <Select
           name="ubicacion"
           value={this.state.ubicacion}
           error={this.state.error_ubicacion===''? false : true}
           onChange={this.handleChange}
            >
              PLACEHOLDER
              <MenuItem value='Concepcion'>Concepcion</MenuItem>
              <MenuItem value='Coronel'>Coronel</MenuItem>
              <MenuItem value='Chiguayante'>Chiguayante</MenuItem>
              <MenuItem value='Florida'>Florida</MenuItem>
              <MenuItem value='Hualpen'>Hualpen</MenuItem>
              <MenuItem value='Hualqui'>Hualqui</MenuItem>
              <MenuItem value='Lota'>Lota</MenuItem>
              <MenuItem value='San pedro de la paz'>San Pedro de la Paz</MenuItem>
              <MenuItem value='Santa Juana'>Santa Juana</MenuItem>
              <MenuItem value='Talcahuano'>Talcahuano</MenuItem>
              <MenuItem value='Tome'>Tome</MenuItem>
              <MenuItem value='Penco'>Penco</MenuItem>
            </Select>
            <br />
            <br /> 
            <InputLabel htmlFor="age-helper">Foto de perfil</InputLabel>
            <br />
            <br /> 
            <label htmlFor="upload">
              <Avatar src={ this.state.foto===""? "http://localhost"+this.state.vistaPrevia.replace("xampp/htdocs/",""): this.state.vistaPrevia}>{this.state.vistaPrevia===""? "?": ""}</Avatar>
              </label>
              <input 
                id="upload" 
                accept="image/*" 
                type="file" 
                name="logo"  
                onChange={this.handleImageChange} 
                style={{display:'none'}}
              /> 
          <br />
          <br />
          <Button onClick={this.handleSubmit} variant="raised"  color="primary" style ={styles.boton}>
           Enviar
          <Send style={{marginLeft: 10}}/>
          </Button>
          
        </Paper>
  
        </div>
        
  
      );
    }
  }
  export default Editar_Estudiante;