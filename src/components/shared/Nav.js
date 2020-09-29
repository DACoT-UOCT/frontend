import React, {useState, useContext} from 'react'
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';

import styles from './Nav.module.css';
import { DispatchContext } from "../App";

export default function Nav() {
    const [show, setShow] = useState(false);
    const dispatch = useContext(DispatchContext);

    return (
        <>
            <MenuIcon onClick={() => setShow(true)} className={styles.icon} fontSize="large"/>
            <div className={`${styles.menu} ${show && styles.show}`}>
                <Link onClick={() => setShow(false)} className={styles.link} to="/">
                    <span>Inicio</span>
                </Link>
                <Link onClick={() => setShow(false)} className={styles.link} to="/consulta">
                    <span>Consultar</span>
                </Link>
                <Link onClick={() => setShow(false)} className={styles.link} to="/nuevo/instalacion">
                    <span>Nuevo Formulario</span>
                </Link>
                <Link onClick={() => setShow(false)} className={styles.link} to="/nuevo/actualizacion">
                    <span>Solicitud actualizacion</span>
                </Link>
                <Link onClick={() => setShow(false)} className={styles.link} to="/administracion">
                    <span>Administracion</span>
                </Link>
                <Link onClick={() => setShow(false)} className={styles.link} to="/">
                    <button
                    color="inherit"
                    onClick={() => dispatch({ type: "logOut" })}>
                    SALIR
                    </button>
                </Link>
            </div>
            {show && <div onClick={() => setShow(false)} className={styles.back}></div>}
        </>
)
}
