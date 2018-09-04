import React from 'react';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import PublicacionTutorDetalle from './PublicacionTutorDetalle';
import PublicacionTutor from './PublicacionTutor';

class MuroClases extends React.Component{
    constructor(){
        super()
        this.state = {
            publicaciones:null,
            vista : 0,
            prop : null
        }
        this.expandirPublicacion = this.expandirPublicacion.bind(this)
        this.volverMuro = this.volverMuro.bind(this)
    }

    componentDidMount(){
        this.LoadData()
    }

    volverMuro(){
        console.log("dede")
        this.setState({
            vista : 0
        })
    }

    expandirPublicacion(idAnuncio){
        this.setState({
            vista : 1,
            prop : idAnuncio
        })
    }

    LoadData(){
        fetch("http://localhost/build/server/cesarScripts/ClaseControlador.php",{
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'cmd=ListarDetalle'
        })
        .then((response)=>{
            return response.json()
        })
        .then((json)=>{
            console.log(json)
            this.setState({
                publicaciones:json
            })
        })
    }

    buildMuro(){
        var muro = []
        var i = 0
        var max_lenght = 100

        if(this.state.publicaciones!=null){
            for(i; i<Object.keys(this.state.publicaciones).length;i++){

                var descripcion = this.state.publicaciones[i].Descripcion.substring(0,max_lenght) + "...";

                muro.push(
                    <div key={i}>
                        <PublicacionTutor
                            idClase={this.state.publicaciones[i].idClase}
                            titulo={this.state.publicaciones[i].Titulo}
                            materia={this.state.publicaciones[i].Materia}
                            descripcion={descripcion}
                            expandirPublicacion={this.expandirPublicacion}
                        />
                    </div>
                )
            }
        }else{
            muro = <p>Cargando...</p>
        }

        return muro;

    }

    controladorVista(){
        var vista;

        var muro = <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <GridContainer justify="center">
                                    <GridItem xs={12} sm={12} md={9}>
                                        <h2>Tutores ofreciendo clases</h2>
                                        <p>Anuncios publicados por tutores de alguna materia particular</p>
                                        {this.buildMuro()}
                                    </GridItem>
                                </GridContainer>
                            </Card>
                        </GridItem>
                    </GridContainer>

        this.state.vista==0 ? vista = muro : vista = <PublicacionTutorDetalle correo={this.props.correo} idClase={this.state.prop} volverMuro={this.volverMuro}/>

        return vista;
    }

    render(){
        return(
            <div>
                {this.controladorVista()}
            </div>
        )
    }
}

export default MuroClases;