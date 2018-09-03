import React from 'react';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';

class PublicacionTutor extends React.Component{
    constructor(){
        super()
        this.state = {
           
        }
    }

    render(){
        {console.log(this.props)}
        return(
            <div>
                 <Card >
                    <div style={{backgroundImage: "url(/static/media/landing-bg.f77c1438.jpg)",
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
                            onClick={()=>{this.props.expandirPublicacion(this.props.idClase)}}
                        >
                        Ver</Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default PublicacionTutor;