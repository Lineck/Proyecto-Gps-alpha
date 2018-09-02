import React, { Component } from 'react';
import './form.css';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Header from "components/Header/Header.jsx";
import Button from '@material-ui/core/Button';
import MenuT from "../../components/MenuT/MenuT";


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


}

class Blog extends Component {

  constructor(args){
    super(args)
    this.state = {
      materia:"",
      titulo:"",
      descripcion:"",
      rut:"",
      date:"",
      showStore:false
    }

  }


  handleCleanState(e){
    console.log("pase por auqi");

    this.setState({
      materia:"",
      titulo:"",
      descripcion:"",
      rut:"",
      date:"",
      showStore:"true"
    });

  }




  insertClase(e) {
    e.preventDefault();

    for (var i = 0; i < document.getElementsByClassName("error").length; i++) {
        document.getElementsByClassName("error")[i].style.display="none";
    }

    if (this.state.materia === "")  {
      console.log("LLena los campos porfavor");
      document.getElementsByClassName("error")[0].style.display="Block";
    }
    if (this.state.titulo === "")  {
      console.log("LLena los campos porfavor");
      document.getElementsByClassName("error")[1].style.display="Block";
    }
    if (this.state.descripcion === "")  {
      console.log("LLena los campos porfavor");
      document.getElementsByClassName("error")[2].style.display="Block";
    }
    if (this.state.rut === "")  {
      console.log("LLena los campos porfavor");
      document.getElementsByClassName("error")[3].style.display="Block";
    }if (this.state.date === "")  {
      console.log("LLena los campos porfavor");
      document.getElementsByClassName("error")[4].style.display="Block";
    }


  if (this.state.materia !== "" && this.state.titulo !== "" && this.state.descripcion !== ""&& this.state.rut !== ""&& this.state.date !== "") {


    fetch('http://146.83.198.35/~grupocold/Parte_Lucas/server/insert.php', {

          method:'POST',
          headers: {


            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json'
          },
          mode: 'no-cors',  //consultar
          body:JSON.stringify({Materia:this.state.materia, Titulo:this.state.titulo, Descripcion:this.state.descripcion, fecha:this.state.date,  RutT:this.state.rut})

        })
        .then(function() {
    		console.log("creada")

    	})
        .then(this.handleCleanState.bind(this));

        for (var i = 0; i < document.getElementsByClassName("error").length; i++) {
            document.getElementsByClassName("error")[i].style.display="none";
        }

}
}









  handleChange(e){
      this.setState({
        [e.target.name]: e.target.value
      })
  }

  render() {
    return (
      <div className="form">
          <Header        
        SetLog={this.props.SetLog}
        color="transparent"
        brand="Tutorias UBB"
        fixed
        changeColorOnScroll={{
          height: 80,
          color: "white"

          }}
        rightLinks={
          <List style={styles.list}>
            <ListItem style={styles.listItem}>
              <Button onClick={()=>this.props.SetLog(1)} style={{color:"#fff"}}>iniciar sesion</Button>
            </ListItem>
          <ListItem style={styles.listItem}>
          <MenuT  SetLog={this.props.SetLog} cerrarSesion={this.props.cerrarSesion}/>   
 
          </ListItem>
         
          </List>
        }
        
        changeColorOnScroll={{
          height: 400,
          color: "primary"
        }}

        
        
      />



          <label htmlFor="materia"> Materia</label> <span className="error" > *debes agregar un nombre a la materia</span>
          <input name="materia" id="materia" type="text"  value={this.state.materia} onChange={this.handleChange.bind(this)} />
          <label htmlFor="titulo"> Titulo</label> <span className="error" > *debes agregar un titulo </span>
          <input name="titulo" id="titulo" type="text" value={this.state.titulo} onChange={this.handleChange.bind(this)} />
          <label htmlFor="descripcion"> Descripcion</label> <span className="error" > *debes agregar una descripcion </span>
          <textarea name="descripcion" id="descripcion" type="text" value={this.state.descripcion} onChange={this.handleChange.bind(this)} />
          <label htmlFor="rut"> Rut</label> <span className="error" > *debes agregar tu rut </span>
          <input name="rut" id="rut" type="number" value={this.state.rut} onChange={this.handleChange.bind(this)} />
          <label htmlFor="date"> Fecha</label> <span className="error" > *debes agregar la fecha de inicio </span>
          <input name="date" id="date" type="date" value={this.state.date} onChange={this.handleChange.bind(this)} />
          <input type="submit" name="button" value="Agregar" onClick={this.insertClase.bind(this)}/>

          <div className="success" style={{display: this.state.showStore ? 'block' : 'none' }}> Su clase ha sido publicada exitosamente </div>

          {JSON.stringify(this.state)}



      </div>
    );
  }
}

export default Blog;
