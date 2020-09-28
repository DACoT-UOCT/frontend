import React, { useContext, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import MenuIcon from '@material-ui/icons/Menu';

import "../../App.css";
import styles from './Header.module.css';

import { DispatchContext } from "../App";
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

  const [show, setShow] = useState(false);
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
          
          {show ? 
            <>
            <div className={styles.menu}>
              <Link className={styles.link} href="/">
                <span>Inicio</span>
              </Link>
              <Link className={styles.link} href="/consulta">
                <span>Consultar</span>
              </Link>
              <Link className={styles.link} href="/nuevo/instalacion">
                <span>Nuevo Formulario</span>
              </Link>
              <Link className={styles.link} href="/nuevo/actualizacion">
                <span>Solicitud actualizacion</span>
              </Link>
              <Link className={styles.link} href="/administracion">
                <span>Administracion</span>
              </Link>
              <Link className={styles.link} href="/">
                <button
                  color="inherit"
                  onClick={() => dispatch({ type: "logOut" })}>
                  SALIR
                </button>
              </Link>
            </div>
            <div onClick={() => setShow(false)} className={styles.back}></div>
            </>
          : <MenuIcon onClick={() => setShow(true)} className={styles.icon} fontSize="large"/>}

        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
