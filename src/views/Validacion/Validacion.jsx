 import React from 'react'
 import Button from '@material-ui/core/Button';
 import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import HeaderGps from "components/Header/HeaderGps.jsx"
import Footer from "components/Footer/Footer.jsx";

 class Validacion extends React.Component {
   constructor(props){
      super(props);
      this.state = {          
        token:'',
        token_error:''          
       };     
   }

   validacion(){    
    fetch("http://localhost/build/server/token.php",{
    // fetch("Proyecto-Gps/server/token.php",{
      method:"POST",
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "token="+this.state.token
    }).then((result)=>{
        return result.text()
    }).then((mytext)=>{
      if(mytext==="true"){
        this.setState({token_error:''});
        this.props.SetLog(3);
      }else{
        this.setState({token_error:"Token no coincide"})
      }
    })
    
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {    
    return (
      <div>
        
        <HeaderGps SetLog={this.props.SetLog}/>
        <Dialog
          open={true}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Proceso de verificación</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Para finalizar el proceso de verificación introduzca a continuación el código que enviamos a su correo
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="token"
              id="name"
              label="Codigo de verificacion"
              type="text"
              fullWidth
              onChange={(e) => this.handleChange(e)}
              error={this.state.token_error === ''? false : true}
              helperText={this.state.token_error}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.props.SetLog(0)} color="primary">
              Cancel
            </Button>
            <Button onClick={()=>this.validacion()} color="primary">
              Validar
            </Button>
          </DialogActions>
        </Dialog>
        <div >
          <Footer style={{marginTop:'9vh'}}/>
        </div>        
      </div>
    )
  }
}
  export default Validacion;