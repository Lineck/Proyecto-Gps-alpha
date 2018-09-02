import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import InfoOutline from "@material-ui/icons/InfoOutline";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import purple from "@material-ui/core/colors/purple"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { container, title  } from "assets/jss/material-kit-react.jsx";


// core 
import MenuItem from '@material-ui/core/MenuItem';
import HeaderGps from "components/Header/HeaderGps.jsx"
import Select from '@material-ui/core/Select';
import Footer from "components/Footer/Footer.jsx";
import Card from "components/Card/Card.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import InputLabel from "@material-ui/core/InputLabel"


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
    textAlign:"center"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container
    
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  
};
const theme = createMuiTheme({
  palette: {
    primary: purple,
    
  },
});


class RegistroPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          rut:'',
          rut_error : '',
          nombre:'',
          nombre_error : '',
          apellido:'',
          apellido_error:'',
          correo:'',
          correo_error:'',
          contrasenia:'',
          contrasenia_error:'',
          localidad:'Concepcion',
          localidad_error:''
    
        }
        this.validar2=this.validar2.bind(this);        
    }

    checkRut(rut) {
        // Despejar Puntos
        var valor = rut.replace('.','');
        // Despejar Guión
        valor = valor.replace('-','');        
        // Aislar Cuerpo y Dígito Verificador
        var cuerpo = valor.slice(0,-1);
        var dv = valor.slice(-1).toUpperCase();      
        // Formatear RUN
        rut = cuerpo + '-'+ dv      
        // Si no cumple con el mínimo ej. (n.nnn.nnn)
        if(cuerpo.length < 7) { this.setState({rut_error:"RUT Incompleto"}); return false;}      
      // Calcular Dígito Verificador
      var suma = 0;
      var multiplo = 2;      
      // Para cada dígito del Cuerpo
      for(var i=1;i<=cuerpo.length;i++) {      
          // Obtener su Producto con el Múltiplo Correspondiente
          var index = multiplo * valor.charAt(cuerpo.length - i);          
          // Sumar al Contador General
          suma = suma + index;          
          // Consolidar Múltiplo dentro del rango [2,7]
          if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }    
      }      
      // Calcular Dígito Verificador en base al Módulo 11
      var dvEsperado = 11 - (suma % 11);      
      // Casos Especiales (0 y K)
      dv = (dv == 'K')?10:dv;
      dv = (dv == 0)?11:dv;      
      // Validar que el Cuerpo coincide con su Dígito Verificador
      if(dvEsperado != dv) {this.setState({rut_error:"RUT Invalido"}); return false; }      
      // Si todo sale bien, eliminar errores (decretar que es válido)
      return true;
    }

    validarCorreo(){
      var array=this.state.correo;     
      var res = array.split('@');
      if(res[1]==="alumnos.ubiobio.cl"){
        return true;
      }else{
        this.setState({correo_error:'Correo no valido'}); 
        return false;        
      }
    }

    validar2(){
        var flag=true;        
        this.setState({rut_error:'', nombre_error:'',apellido_error:'',correo_error:'',contrasenia_error:'',localidad_error:''}); 
        
        if(this.state.rut===''){
          flag=false;
          this.setState({rut_error:'Campo requerido'}); 
        }
        if(this.state.nombre===''){
          flag=false;
          this.setState({nombre_error:'Campo requerido'}); 
        }
        if(this.state.apellido===''){
          flag=false;
          this.setState({apellido_error:'Campo requerido'}); 
        }
        if(this.state.correo===''){
          flag=false;
          this.setState({correo_error:'Campo requerido'}); 
        }
        if(this.state.contrasenia===''){
          flag=false;
          this.setState({contrasenia_error:'Campo requerido'}); 
        }
        if(this.state.localidad===''){
          flag=false;
          this.setState({localidad_error:'Campo requerido'}); 
        }
        if(this.validarCorreo()===false){
          flag=false;
          this.setState({correo_error:'Correo no valido'})
        }
        if(this.checkRut(this.state.rut)===false){
          flag=false;
          this.setState({rut_error:'Rut no valido'})
        }
        return flag;
    }

    handleChange(e) {
      this.setState({[e.target.name]: e.target.value})
    }

    registrar(){
 
      fetch("http://localhost/build/server/registro.php",{
        // fetch("../../server/registro.php",{
        method:"POST",
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "rut="+this.state.rut+"&nombre="+this.state.nombre+"&apellido="+this.state.apellido+"&email="+this.state.correo+"&contrasenia="+this.state.contrasenia+"&localidad="+this.state.localidad
      })
      .then(()=>{
        this.props.SetLog(1); 
      })
    }

    validar(){
 
    fetch("http://localhost/build/server/checkrut.php",{
      // fetch("../../server/checkrut.php",{
        method:"POST",
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "rut="+this.state.rut
      })
      .then((result)=>{
        return result.text();        
      })
      .then((text)=>{
        if(text==="false"){          
          this.setState({rut_error:'Rut Existente'});
        }else{       
          if(this.validar2()===true){                    
            this.registrar(); 
          }
        }
      })     
    }


  render() {
    const { classes } = this.props;
  return (
    <div >      
          <HeaderGps SetLog={this.props.SetLog}/>      
      <br/><br/>
      
        <MuiThemeProvider theme={theme}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={5}>
          <br/><br/><br/><br/>
          <Card > 
            <CardHeader className={classes.flex} color="primary" >   
              <h3>Registro De Estudiante</h3>
            </CardHeader>
            <br/>
            <GridContainer justify="center">
              <GridItem xs={12} sm={4} md={7} >
              <CustomInput
                  
                  labelText="Nombre"
                  id="Nombre"
                  success={this.state.nombre_error === ''  && this.state.nombre!== ''? true  : false}
                  error={this.state.nombre_error === ''? false : true}
                 
                  formControlProps={{
                    fullWidth: true
                    
                  }}
                  inputProps={{
                   
                    name:"nombre",
                    onChange:(e) => this.handleChange(e)
                  }}
                />
                
              </GridItem>
              </GridContainer>
              <br/>
              <GridContainer justify="center">
              <GridItem xs={12} sm={4} md={7} >
                <CustomInput
                  labelText="Apellido"
                  id="Apellido"
                  success={this.state.apellido_error === '' && this.state.apellido!== ''? true  : false}
                  error={this.state.apellido_error === ''? false : true}
                  helperText={this.state.apellido_error}
                  formControlProps={{
                    fullWidth: true
                    
                  }}
                  inputProps={{
                   
                    name:"apellido",
                    onChange:(e) => this.handleChange(e)
                  }}
                />
              </GridItem>
              </GridContainer>
              <br/>
              <GridContainer justify="center">
                <GridItem xs={12} sm={4} md={7}>
                  <CustomInput
                    labelText="Rut"
                    id="Rut"
                    success={this.state.rut_error=== ''  && this.state.rut!== ''? true  : false}
                    error={this.state.rut_error === ''? false : true}
                  
                    formControlProps={{
                      fullWidth: true
                      
                    }}
                    inputProps={{
                    
                      name:"rut",
                      onChange:(e) => this.handleChange(e)
                    }}
                  />
                </GridItem>
                </GridContainer>
                <br/>
                <GridContainer justify="center">
              <GridItem xs={12} sm={4} md={7}>
                  <CustomInput
                    labelText="Correo"
                    id="Correo"
                    success={this.state.correo !== '' && this.state.correo!== ''? true  : false}
                    error={this.state.correo_error === ''? false : true}
                  
                    formControlProps={{
                      fullWidth: true
                      
                    }}
                    inputProps={{
                    
                      name:"correo",
                      onChange:(e) => this.handleChange(e)
                    }}
                  />
                </GridItem>
              </GridContainer>
              <br/>
              <GridContainer justify="center">
                <GridItem xs={12} sm={4} md={7}>
                  <CustomInput
                    labelText="Contraseña"
                    id="Contraseña"
                    
                    success={this.state.contrasenia_error === ''&& this.state.contrasenia !== '' ? true  : false}
                    error={this.state.contrasenia_error === ''? false : true}
                  
                    formControlProps={{
                      fullWidth: true
                      
                    }}
                    inputProps={{
                    type:"password",
                      name:"contrasenia",
                      onChange:(e) => this.handleChange(e)
                    }}
                  />
                </GridItem>
                </GridContainer>
                <br/>
                <GridContainer justify="center">
                <GridItem xs={12} sm={4} md={7} style={{marginTop:'2vh'}}>
                
                <InputLabel  htmlFor="age-helper">Ubicacion</InputLabel>
                  <Select
                    fullWidth= {true}
                    name="localidad"
                    value={this.state.localidad}
                    onChange={(e) =>this.handleChange(e)}
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
                  </Select><br/><br/><br/><br/>
                </GridItem> 
                    
                 
              </GridContainer> 
              <GridContainer justify="center">
                   
                  <Button style={{width: '40vh',height:'5vh'}} variant="contained" size="large" color="primary" onClick={()=>this.validar()} >REGISTRAR</Button>
              
              </GridContainer>
            
              <br/>
              <br/>
              
          </Card>  
          
        </GridItem >  
       </GridContainer>
        </ MuiThemeProvider>
       <SnackbarContent
              message={
                  <span>
                    <b>ALERTA DE INFORMACION:</b> Porfavor llene todos los campos
                  </span>
              }
              close={true}
              color="warning"
              icon={InfoOutline}
              />
        
      <br/><br/> <br/><br/>
      
      <Footer />
    </div>
  );
}
  


}
export default withStyles(styles)(RegistroPage);