import React, { Component } from 'react';

import '../AddTutoria/form.css';
import HeaderGps from "components/Header/HeaderGps.jsx"




class Fpass extends Component {

  constructor(args){
    super(args)
    this.state = {
      email:"",
    }

  }


  handleCleanState(e){
    console.log("pase por auqi");

    this.setState({
      email:""
    });

  }




  select(e) {
    e.preventDefault();

    fetch('http://localhost/build/server/lucas/selectCont.php', {

          method:'POST',
          headers: {

            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json'
          },
          mode: 'no-cors',  //consultar
          body:JSON.stringify({email:this.state.email})

        })
        .then(function() {
    		console.log("creada")

    	})
        .then(this.handleCleanState.bind(this));
        document.getElementById("error").style.display="Block";
}




  handleChange(e){
      this.setState({
        [e.target.name]: e.target.value
      })
  }

  render() {
    return (
      <div className="form">
          <HeaderGps SetLog={this.props.SetLog}/>    

          <label htmlFor="email"> Ingresa tu Email</label>
          <input name="email" id="email" type="text"  value={this.state.email} onChange={this.handleChange.bind(this)} />
          <input type="submit" name="button" value="Agregar" onClick={this.select.bind(this)}/>

          <span id="error" style={{display:'none'}} > Mensaje Enviado!</span>



      </div>
    );
  }
}

export default Fpass;
