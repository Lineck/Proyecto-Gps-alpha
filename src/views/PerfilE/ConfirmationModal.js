import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
  root: {
    paddingLeft:theme.spacing.unit * 5,
    paddingRight:theme.spacing.unit * 5,
  },
});

class ConfirmationModal extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleSubmit = () => {
        this.props.onSubmit();
        this.handleClose();
  };

  render() {
    var {classes, children} = this.props
    return (
      <div>
        <div onClick={this.handleClickOpen}>
            {children}
        </div>
        <Dialog 
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
            <DialogContent className={classes.root}>
                {this.props.message}
            </DialogContent>
            <DialogActions
                className={classes.root}>
                <Button 
                color="primary"
                onClick={this.handleSubmit} 
                >
                Aceptar
                </Button>
                className={classes.root}>
                <Button 
                variant="raised"
                color="primary"
                onClick={this.handleClose} 
                >
                Cancelar
                </Button>
            </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(ConfirmationModal);