import React from 'react';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';

class  Publicacion extends React.Component{
    constructor(){
        super()
        this.state = {
           imagenes:{
               algebra:"https://i0.wp.com/matematicapositiva.com.ve/wp-content/uploads/2018/02/glencoe-algebra-1-online-textbook-help_135772_large.jpg?resize=750%2C379&ssl=1",
               programacion:"https://bbvaopen4u.com/sites/default/files/styles/big-image/public/img/new/bbva-open4u-javascript-programacion.png?itok=gEkJ5ryg",
               calculo:"https://thumb9.shutterstock.com/display_pic_with_logo/3577058/732474718/stock-photo-advanced-calculus-on-whiteboard-732474718.jpg",
               economia:"http://www.laserenaonline.cl/wp-content/uploads/2017/03/economia-pib-22032017.jpg"
           }
        }
    }

    getImagen(){
        switch(this.props.materia){
            case 'Algebra':
                return this.state.imagenes.algebra
                break;

            case 'Programacion':
                return this.state.imagenes.programacion
                break;
            
            case 'Calculo':
                return this.state.imagenes.calculo
                break;
        }
    }

    render(){
        console.log(this.state.imagenes)
        return(
            <div>
                 <Card >
                    <div style={{backgroundImage: "url("+this.getImagen()+")",
                                minHeight:"10vh"}}>
                        
                    </div>
                    <CardBody>
                        <h3>{this.props.titulo}</h3>
                        <h6>{this.props.materia}</h6>
                        <h5>{this.props.descripcion}</h5>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={()=>{this.props.expandirPublicacion(this.props.idAnuncio)}}
                        >
                        Ver</Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Publicacion;