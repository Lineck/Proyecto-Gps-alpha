import React from "react";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

class MenuT extends React.Component {
    constructor(props){
        super(props);
        this.state={
          anchorEl: null,
        }
        
      }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
   
  };

render(){
    const open = Boolean(this.state.anchorEl);

    return(
                <div >
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                  
                >
                  <AccountCircle style={{
                    height:"40px",
                    width:"40px"
                  }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={()=>{this.handleClose;this.props.SetLog(8)}}>Crear Perfil</MenuItem>
                  <MenuItem onClick={()=>{this.handleClose;this.props.SetLog(10)}}>Mi Perfil</MenuItem>
                  <MenuItem onClick={()=>{this.handleClose;this.props.SetLog(11)}}>Crear Tutoria</MenuItem>
                  <MenuItem onClick={()=>{this.handleClose;this.props.SetLog(9)}}>Editar perfil</MenuItem>
                  <MenuItem onClick={()=>this.props.cerrarSesion()}>Cerrar Sesion</MenuItem>
                </Menu>
              </div>
    );
}

}
export default (MenuT);