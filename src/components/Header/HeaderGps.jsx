import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { defaultFont  } from "assets/jss/material-kit-react.jsx";
import Header from "components/Header/Header.jsx";
import Button from '@material-ui/core/Button';

const styles={
    list: {
        ...defaultFont,
        fontSize: "14px",
        margin: 0,
        paddingLeft: "0",
        listStyle: "none",
        paddingTop: "0",
        paddingBottom: "0",
        color: "inherit"
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
      navLink: {
        color: "inherit",
        position: "relative",
        padding: "0.9375rem",
        fontWeight: "400",
        fontSize: "12px",
        textTransform: "uppercase",
        borderRadius: "3px",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex",
        "&:hover,&:focus": {
          color: "inherit",
          background: "rgba(200, 200, 200, 0.2)"
        }
        
      },
      socialIcons: {
        position: "relative",
        fontSize: "20px !important",
        marginRight: "4px"
      },
}


class HeaderGps extends React.Component {

    render(){
        const { classes } = this.props;

        return(
            <Header        
                SetLog={this.props.SetLog}
                color="primary"
                brand="Tutorias UBB"
                fixed
               
                rightLinks={
                <List className={classes.list}>
                    <ListItem className={classes.listItem}>
                    <Button
                        color="inherit"
                        className={
                        classes.navLink + " " + classes.socialIconsButton
                        }
                    >
                        <i className={
                            classes.socialIcons +
                            " " +
                            classes.marginRight5 +
                            " fab fa-twitter"
                        }
                        />{" "}
                        
                    </Button>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                    <Button
                        color="inherit"
                        className={
                        classes.navLink + " " + classes.socialIconsButton
                        }
                    >
                        <i
                        className={
                            classes.socialIcons +
                            " " +
                            classes.marginRight5 +
                            " fab fa-facebook"
                        }
                        />{" "}
                        
                    </Button>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                    <Button
                        color="inherit"
                        className={
                        classes.navLink + " " + classes.socialIconsButton
                        }
                    >
                        <i
                        className={
                            classes.socialIcons +
                            " " +
                            classes.marginRight5 +
                            " fab fa-instagram"
                        }
                        />{" "}
                        
                    </Button>
                    </ListItem>
                </List>
                }
        
                />

        );

    }


}
export default withStyles(styles)(HeaderGps);