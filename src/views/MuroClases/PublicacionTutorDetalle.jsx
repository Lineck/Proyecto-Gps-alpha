import React from 'react';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';

class PublicacionTutorDetalle extends React.Component{
    constructor(){
        super()
        this.state = {
           publicacion : null,
           usuario:null
        }
    }



    componentDidMount(){
        this.initSesion()
        this.LoadData()
    }

    initSesion(){
        fetch("../server/cesarScripts/initSession.php",{
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'cmd=Buscar'
        })
        .then((response)=>{
            return response.json()
        })
        .then((json)=>{
            console.log(json)
        })
    }

    LoadData(){
        fetch("../server/cesarScripts/ClaseControlador.php",{
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'cmd=Buscar&idClase='+this.props.idClase
        })
        .then((response)=>{
            return response.json()
        })
        .then((json)=>{
            console.log(json)
            this.setState({
                publicacion:json[0]
            })
        })
    }

    Registrar(){
        if(this.props.correo==''){
            alert('Por favor inicie sesion')
        }else{
            fetch("../server/cesarScripts/InscripcionControlador.php",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                credentials: 'include',
                body: 'cmd=Insertar&idClase='+this.state.publicacion.idClase+'&correo='+this.props.correo
            })
            .then((response)=>{
                return response.text()
            })
            .then((text)=>{
                if(text=="1"){
                    alert("Inscripcion Exitosa");
                }else{
                    alert('Ya se encuentra inscrito en la clase')
                }
                console.log(text)
            })
        }
    }

    vistaHandler(){
        var vista;

        if(this.state.publicacion != null){
            vista = <GridContainer justify="center">
                <GridItem xs={12} sm={7} md={7}>
                    <Card>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={9} md={9}>
                                <Card>
                                    <br/>
                                    <GridContainer justify="flex-end">
                                        <GridItem xs={12} sm={3} md={3}>
                                            <Button 
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={()=>this.props.volverMuro()}
                                            >
                                            Volver</Button>
                                        </GridItem>
                                    </GridContainer>
                                    
                                    <CardBody>
                                        <GridContainer justify="center">
                                            <GridItem xs={12} sm={12} md={12}>
                                                <h3>{this.state.publicacion.Titulo}</h3>
                                            </GridItem>
                                        </GridContainer>
                                        <br/>
                                        <p><i>Tutor: {this.state.publicacion.NombreT} {this.state.publicacion.ApellidoT}</i></p>
                                        <br/>
                                        <p><b>Imparto clases de:</b> {this.state.publicacion.Materia}</p>
                                        <br/>
                                        <hr/>
                                        <h4>Informacion Adicional</h4>
                                        <p>{this.state.publicacion.Descripcion}</p>
                                        <hr/>
                                        <h4>Informacion de contacto</h4>
                                        <p><b>Fono:</b> {this.state.publicacion.Telefono}</p>
                                        <p><b>Ciudad:</b> {this.state.publicacion.ubicacion}</p>
                                        <p><b>Email:</b> {this.state.publicacion.EmailT}</p>
                                        <GridContainer justify="flex-end">
                                            <GridItem xs={12} sm={12} md={12}>
                                                <Button 
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={()=>this.Registrar()}
                                                >Registrar
                                                </Button>
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </Card>
                </GridItem>
            </GridContainer>
        }else{
            vista = <h3></h3>
        }

        return vista;
    }

    render(){
        return(

            <div>
                {this.vistaHandler()}
            </div>
        )
    }
}

export default PublicacionTutorDetalle;