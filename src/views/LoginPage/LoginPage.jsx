import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons

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
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import IconButton from '@material-ui/core/IconButton';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};
const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark+'!important',
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent  (props)  {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};
const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          email:'',
          contraseña:'',
          cardAnimaton: "cardHidden",
          errorU:'',
          errorC:''    
    };
    
    this.login=this.login.bind(this);
    this.onChange=this.onChange.bind(this);
  }
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ errorU: false });
  }
  handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ errorC: false });
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
            }
            if(mytext==="EU"){
              this.setState({errorU:true});
            }
            if(mytext==="EC"){
              this.setState({errorC:true});
            }
          }          
        }
    })
    
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
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
            
            
          </div >
        
          <br/>
          <br/>
          <div >
          <Footer/>
          </div>
          
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.errorC}
          autoHideDuration={3000}
          onClose={this.handleClose2}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose2}
            variant="error"
            message="Contraseña Incorrecta"
          />
        </Snackbar>
        <Snackbar
     
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.errorU}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="error"
            message="Usuario Incorrecto"
          />
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
