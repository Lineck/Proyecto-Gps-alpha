import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import InfoOutline from "@material-ui/icons/InfoOutline";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";
// core components
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";



class LoginPage extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          email:'',
          contraseña:'',
          cardAnimaton: "cardHidden",
          error:1      
    };
    
    this.login=this.login.bind(this);
    this.onChange=this.onChange.bind(this);
  }
  
  login(){

    // fetch("../../../server/checklogin.php",{
    fetch("http://localhost/build/server/checklogin.php",{
      method:"POST",
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "email="+this.state.email+"&contrasenia="+this.state.contraseña
    })
    .then((result)=>{
      return result.text()
    })
    .then((mytext)=>{
        if(mytext==="UE"){ 
          this.props.IniciarSesion(this.state.email,mytext);  
          this.props.SetLog(0);
              
        }else{

          if(mytext=="UT"){
            this.props.IniciarSesion(this.state.email,mytext);
            this.props.SetLog(0);
             
          }else{

            if(mytext==="EV"){
              this.props.SetLog(2);
            }else{
              this.errorDidMount(mytext);
            }
          }          
        }
    })
    
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  } 

  errorDidMount(usuario) {
   this.setState({error:usuario}) 
    setTimeout(
      
      function() {
        this.setState({ error: "" });
      }.bind(this),
      3000
    );
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  render() {
    const { classes} = this.props;
    
    return (
      <div >
       
        <div
          className={classes.pageHeader}
          style={{
            // backgroundImage: "url(" + image + ")",
            // backgroundSize: "auto",
            // backgroundPosition: "top center"
            backgroundColor:'#212139'
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h3>Login</h3>
                      <div className={classes.socialLine}>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-twitter"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-facebook"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-google-plus-g"} />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardBody>
                     
                      <CustomInput
                        labelText="Correo"
                        id="email"
                        
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "email",
                          onChange: (e)=>this.onChange(e),
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Contraseña"
                        id="pass"
                        
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name:"contraseña",
                          onChange:(e)=>this.onChange(e),
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <LockOutline
                                className={classes.inputIconsColor}
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button style={{fontSize:'15px'}} simple color="primary" size="lg" onClick={()=>this.login()}>
                        Iniciar sesión
                      </Button>
                      <Button style={{fontSize:'15px'}}simple color="primary" size="lg" onClick={() => this.props.SetLog(3)}>
                        Registrarse
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
            <div style={{minHeight:'20vh'}}>
              { this.state.error === "EC"? <SnackbarContent
              message={
                  <span><b>INFO ALERT:</b>Contraseña incorrecta</span>
              }
              close={true}
              color="danger"
              icon={InfoOutline}
              /> :
              this.state.error === "EU"? <SnackbarContent
              message={
                <span><b>INFO ALERT:</b> Usuario incorrecto</span>
              }
              close={true}
              color="danger"
              icon={InfoOutline}
              /> :""}
            </div>
            
          </div >
          
          <div >
          <Footer/>
          </div>
          
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
