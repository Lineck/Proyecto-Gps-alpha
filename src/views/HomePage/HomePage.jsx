import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core 
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";
import MenuE from "../../components/MenuE/MenuE";
import MenuT from "../../components/MenuT/MenuT";
import { Button } from "@material-ui/core";
import MuroAnuncioAlumno from '../MuroAnuncioAlumno/MuroAnuncioAlumno';
import MuroClases from '../MuroClases/MuroClases';
import About from '../About/About';

const styles = {
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
};

class HomePage extends React.Component{
  
 
  

  render() {
    const { classes} = this.props;
   
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
          {this.props.tipo==='UE'?<MenuE  SetLog={this.props.SetLog} cerrarSesion={this.props.cerrarSesion}/>:
           this.props.tipo==='UT'? <MenuT SetLog={this.props.SetLog} cerrarSesion={this.props.cerrarSesion}/>:null    

          }
             
          </ListItem>
         
                </List>
        }
        
        changeColorOnScroll={{
          height: 400,
          color: "primary"
        }}
        
      />
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container} >
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title} >Tu Historia Comienza con nosotros.</h1>
              <h4>
                Bienvenido a la plataforma lider en aprendisaje online.
              </h4>
              <br />
              
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
      <br/>
      <GridContainer justify="center">
        
        {this.props.tipo==='UE'?<MuroClases correo={this.props.correo}/>:
        this.props.tipo==='UT'?<MuroAnuncioAlumno/>:<MuroClases correo={this.props.correo}/>


        }
        
        </GridContainer><br/><br/>
          </div>
      
      <Footer />
    </div>
  );
}
}
export default withStyles(landingPageStyle)(HomePage);
