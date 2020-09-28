import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
// import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import "../../App.css";

import { DispatchContext } from "../App";
import Nav from "./Nav"
import { unstable_batchedUpdates } from "react-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "grid-area": "header",
    color: "white",
    "& hr": {
      margin: theme.spacing(2, 2),
    },
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const dispatch = useContext(DispatchContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" classes={{ "background-color": "#006cb8" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img
              className="logo-dacot"
              height="50"
              width="50"
              src="/logo_dacot.png"
              alt="Logo"
            />{" "}
            DACoT
          </Typography>
          <Nav/>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
