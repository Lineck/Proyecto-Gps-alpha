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
import MenuT from "../../components/MenuT/MenuT";


const styles = {
    root: {
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft:"5%",
      paddingRight:"5%",
      marginTop: "25vh",
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


class Vista1 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nombre: '',
      apellido: '',
      disponibilidad: '',
      disponibilidad_d: '',
      especialidad:'',
      fono: '',
      metodo:'universidad',
      ubicacion: '',
      foto: '',
      vistaPrevia: '',
      verVista2:'false',
      error_nombre: '',
      error_apellido: '',
      error_materia: '',
      error_fono: '',
      error_disponibilidad: '',
      error_disponibilidad_d: '',
      error_ubicacion: '',
      email: 'prueba',
    };


    this.handleSubmit = this.handleSubmit.bind(this);
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
    
    data.append('nombreT', this.state.nombre)
    data.append('apellidoT', this.state.apellido)
    data.append('disponibilidad', this.state.disponibilidad)
    data.append('ubicacion', this.state.ubicacion)
    data.append('telefono', this.state.fono)
    data.append('metodo', this.state.metodo)
    data.append('especialidad', this.state.especialidad)
    data.append('foto', this.state.foto)
    data.append('disponibilidad_d', this.state.disponibilidad_d)
    data.append('emailT',this.state.email)
    
    fetch("http://localhost/action_page.php",
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
        this.setState({error_nombre: ''})
        this.setState({error_apellido: ''})
        this.setState({error_fono: ''})
        this.setState({error_ubicacion: ''})
        this.setState({error_materia: ''})
        this.setState({error_disponibilidad: ''})
        this.setState({error_disponibilidad_d: ''})

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

        if(this.state.especialidad === ''){
          flagError=false;
          this.setState({error_materia : "Campo requerido"})
        }

        if(this.state.disponibilidad === ''){
          flagError=false;
          this.setState({error_disponibilidad : "Campo requerido"})
        }

        if(this.state.disponibilidad_d === ''){
          flagError=false;
          this.setState({error_disponibilidad_d : "Campo requerido"})
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
        changeColorOnScroll={{
          height: 80,
          color: "white"

          }}
        rightLinks={
          <List style={styles.list}>
            <ListItem style={styles.listItem}>
              <Button onClick={()=>this.props.SetLog(1)} style={{color:"#fff"}}>iniciar sesion</Button>
            </ListItem>
          <ListItem style={styles.listItem}>
          <MenuT  SetLog={this.props.SetLog} cerrarSesion={this.props.cerrarSesion}/>   
 
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
          Su perfil de tutor.
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
        <br />
        <InputLabel htmlFor="age-helper">Disponibilidad horaria</InputLabel>
        <br />
        <br />
        <TextField
        name="disponibilidad"
        onChange={this.handleChange}
        id="input"
        error={this.state.error_disponibilidad===''? false : true}
        helperText={this.state.error_disponibilidad}
        label="Fecha de inicio"
        type="datetime-local"
        value={this.state.disponibilidad}
        InputLabelProps={{
          shrink: true,
        }}
        />
      <TextField style={{marginLeft: 20}}
        name="disponibilidad_d"
        onChange={this.handleChange}
        id="input"
        error={this.state.error_disponibilidad_d===''? false : true}
        helperText={this.state.error_disponibilidad_d}
        label="Fecha de termino"
        type="datetime-local"
        value={this.state.disponibilidad_d}
        InputLabelProps={{
          shrink: true,
        }}
      />
        <br />
        <TextField
          value={this.state.materia}
          name="especialidad"
          onChange={this.handleChange}
          required
          id="input"
          label="Materia a dictar"
          type="text"
          margin="normal"
          placeholder="Materia a dictar"
          error={this.state.error_materia===''? false : true}
          helperText={this.state.error_materia}
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
        <InputLabel htmlFor="age-helper">Metodo</InputLabel>
        <br />
        <Select
         name="metodo"
         value={this.state.metodo}
         onChange={this.handleChange}>
            <MenuItem value='ciudad'>Domicilio</MenuItem>
            <MenuItem value='universidad'>Universidad</MenuItem>
          </Select>
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
            <Avatar src={this.state.vistaPrevia}>{this.state.vistaPrevia===""? "?": ""}</Avatar>
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
export default Vista1;