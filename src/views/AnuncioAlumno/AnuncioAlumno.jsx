import React from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import purple from "@material-ui/core/colors/purple"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Header from "components/Header/Header.jsx";
import MenuE from "../../components/MenuE/MenuE";

//Core
import Card from "components/Card/Card.jsx"
import CardHeader from "components/Card/CardHeader.jsx"

const theme = createMuiTheme({
    palette: {
      primary: purple,
      
    },
  });


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      fullWidth: true,
      display: 'flex'
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });
  const styless ={
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
  }

class AnuncioAlumno extends React.Component{

    constructor(){
        super()
        this.state = {
            rutEstudiante: "",
            materia: "",
            titulo: "",
            descripcion: "",
            email: "",
            telefono: "",
            ciudad: "",
            materias:null
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    componentDidMount(){
        console.log(this.props)
        this.LoadData()
    }

    LoadData(){
        fetch("../server/cesarScripts/MateriaControlador.php",{
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'cmd=Listar'
        })
        .then((response)=>{
            return response.json()
        })
        .then((json)=>{
            this.setState({
                materias: json
            })
            console.log(this.state.materias)
        })
    }

    EnviarAnuncio(){

        if(this.state.titulo=="" ||
            this.state.descripcion=="" ||
            this.state.materia==null ||
            this.state.email=="" ||
            this.state.telefono=="" ||
            this.state.direccion=="")
        {
            alert("Rellenar todos los campos")
        }else{
            fetch("../server/cesarScripts/PublicacionAlumnoControlador.php",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'cmd=Insertar'+
                '&correo='+this.props.correo+
                '&materia='+this.state.materia+
                '&titulo='+this.state.titulo+
                '&descripcion='+this.state.descripcion+
                '&email='+this.state.email+
                '&telefono='+this.state.telefono+
                '&direccion='+this.state.ciudad
            })
            .then((response)=>{
                console.log(response.text())
                alert("Publicacion exitosa");
            })
        }

        
    }

    BuildSelect(){
        var select = []
        var i = 0;

        for(i; i<Object.keys(this.state.materias).length;i++){
            select.push(
                <MenuItem value={this.state.materias[i].nombre}>{this.state.materias[i].nombre}</MenuItem>
            )
        }

        return select;
    }

    render(){
        
        console.log(this.state)
        return(
            <div>
                <Header        
        SetLog={this.props.SetLog}
        color="primary"
        brand="Tutorias UBB"
        fixed
        rightLinks={
          <List style={styless.list}>
            <ListItem style={styless.listItem}>
              <Button onClick={()=>this.props.SetLog(1)} style={{color:"#fff"}}>iniciar sesion</Button>
            </ListItem>
          <ListItem style={styless.listItem}>
          <MenuE  SetLog={this.props.SetLog} cerrarSesion={this.props.cerrarSesion}/>   

          
             
          </ListItem>
         
                </List>
        }
        
        

        
        
      />
                 <MuiThemeProvider theme={theme}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={5}>
                        <br/><br/><br/><br/>
                        <Card>
                            <CardHeader color="primary" >   
                                <h3>Nuevo aviso como alumno para solicitar clases particulares</h3>
                            </CardHeader>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={4} md={7} >
                                    <InputLabel htmlFor="materia">Materia</InputLabel>
                                    <Select
                                        fullWidth = {true}
                                        value={this.state.materia}
                                        onChange={this.handleChange}
                                        inputProps={{
                                        name: 'materia',
                                        id: 'materia',
                                        }}
                                    >
                                    {(this.state.materias!=null)?this.BuildSelect():"Loading"}
                                    </Select>
                                </GridItem>
                            </GridContainer>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={4} md={7} >
                                    <CustomInput
                                        labelText="Titulo"
                                        id="titulo"

                                        formControlProps={{
                                            fullWidth:true
                                        }}

                                        inputProps={{
                                            name:"titulo",
                                            onChange:(e) => this.handleChange(e)
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={4} md={7} >
                                    <TextField
                                    fullWidth={true}
                                        label="Descripcion"
                                        name="descripcion"
                                        multiline={true}
                                        rows={10}
                                        onChange={this.handleChange}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={4} md={7} >
                                <CustomInput
                                        labelText="Email de contacto"
                                        id="email"

                                        formControlProps={{
                                            fullWidth:true
                                        }}

                                        inputProps={{
                                            name:"email",
                                            onChange:(e) => this.handleChange(e)
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={4} md={7} >
                                <CustomInput
                                        labelText="Fono de contacto"
                                        id="telefono"

                                        formControlProps={{
                                            fullWidth:true
                                        }}

                                        inputProps={{
                                            name:"telefono",
                                            onChange:(e) => this.handleChange(e)
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={4} md={7} >
                                <CustomInput
                                        labelText="Ciudad"
                                        id="ciudad"

                                        formControlProps={{
                                            fullWidth:true
                                        }}

                                        inputProps={{
                                            name:"ciudad",
                                            onChange:(e) => this.handleChange(e)
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <br/><br/>
                            <GridContainer justify="center">
                                <Button
                                    style={{width: '40vh',height:'5vh'}}
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    onClick={()=>this.EnviarAnuncio()}
                                >
                                Publicar        
                                </Button>
                            </GridContainer>
                        </Card>
                    </GridItem>
                </GridContainer>
                
                </MuiThemeProvider>                             
            </div>
        )
    }
    
}

export default withStyles(styles)(AnuncioAlumno);