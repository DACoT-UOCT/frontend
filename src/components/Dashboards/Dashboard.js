import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import PanelInstalacion from "../Shared/PanelInstalacion";
import { StateContext } from "../App";
import Loading from "../Shared/Loading";
import { ipAPI } from "../Shared/ipAPI";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "flex-start",
  },
  column: {
    flexBasis: "37%",
  },
  column2: {
    flexBasis: "40%",
    textAlign: "center",
  },
  column3: {
    flexBasis: "23%",
    padding: theme.spacing(1, 2),
    marginTop: "10px",
  },
  hordivider: {
    borderBottom: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  divider: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    borderRight: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
}));

const Dashboard = () => {
  const state = useContext(StateContext);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [listado, setListado] = useState([]);
  const [consultado, setConsultado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!consultado) {
      consultar();
      setConsultado(true);
    }
  });

  async function getData() {
    //consulta por id al backend
    var link; // = ipAPI + "request" + "?user=" + state.email;

    link = ipAPI + "requests" + "?user_email=" + state.email;

    return new Promise((resolve, reject) => {
      axios
        .get(link)
        .then((response) => {
          //solicitud exitosa
          setListado(response.data);
          console.log(response.data);
          resolve();
        })
        .catch((err) => {
          //error
          reject(err);
        });
    });
  }
  const consultar = async () => {
    setLoading(true);
    setError("");

    try {
      await getData();
    } catch (error) {
      console.log(error);
      setError("Error en la consulta");
    }
    setLoading(false);
    // setListado([
    //   { id: "x01", type: "Solicitud de integración" },
    //   { id: "x02", type: "Solicitud de actualización" },
    // ]);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const estados = {
    NEW: "Solicitud de integración",
    UPDATE: "Solicitud de actualización",
    APPROVED: "Instalación en funcionamiento",
  };

  return (
    <div className="grid-item dashboard-empresa">
      {state.rol === "Empresa" ? (
        <h3>Instalaciones operativas</h3>
      ) : (
        <h3>Solicitudes pendientes</h3> //para los funcionarios
      )}
      <div className={classes.root}>
        {!loading ? (
          <>
            <p>{error}</p>
            {listado.map((i) => {
              return (
                <>
                  <PanelInstalacion
                    expanded={expanded}
                    id={i.oid} //ahi ingresar el X
                    type={estados[i.metadata.status]}
                    handleChange={handleChange}
                  />
                </>
              );
            })}
          </>
        ) : (
          <>
            <Loading />
          </>
        )}
        {/* <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header">
            <div className={classes.column}>
              <Typography className={classes.heading}>Location</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>
                Select trip destination
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <div className={classes.column}>
              <legend className={classes.hordivider}>
                {" "}
                Información del Cruce{" "}
              </legend>
              <span>Codigo OTU:</span>
              <br />
              <div className="info-acordeon">codiguito</div>
              <span>Ubicacion:</span>
              <br />
              <div className="info-acordeon">lugarcito</div>
              <span>Empresa instaladora:</span>
              <br />
              <div className="info-acordeon">empresita</div>
              <span>Empresa encargada:</span>
              <br />
              <div className="info-acordeon">empresita</div>
              <span>Fecha de instalacion:</span>
              <br />
              <div className="info-acordeon">fechita</div>
            </div>
            <div className={clsx(classes.column2, classes.divider)}>
              <img
                style={{ "margin-top": "10px" }}
                height="320"
                width="312"
                src="/logo_transportes.png"
                alt="Cruce"
              />
            </div>
            <div className={classes.column3}>
              <Button className="boton-dashboard">
                {" "}
                Información de Instalación{" "}
              </Button>{" "}
              <br></br>
              <Button className="boton-dashboard">
                {" "}
                PDF de Respaldo{" "}
              </Button>{" "}
              <br></br>
              <Button className="boton-dashboard"> Programaciones </Button>{" "}
              <br></br>
              <Button className="boton-dashboard">
                {" "}
                Historial de Cambios{" "}
              </Button>{" "}
              <br></br>
              <Button className="boton-dashboard">
                {" "}
                Solicitar Modificación{" "}
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header">
            <div className={classes.column}>
              <Typography className={classes.heading}>Location</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>
                Select trip destination
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <div className={classes.column} />
            <div className={classes.column}>IMAGEN</div>
            <div className={clsx(classes.column, classes.helper)}>BOTONES</div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header">
            <div className={classes.column}>
              <Typography className={classes.heading}>Location</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>
                Select trip destination
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <div className={classes.column} />
            <div className={classes.column}>IMAGEN</div>
            <div className={clsx(classes.column, classes.helper)}>BOTONES</div>
          </AccordionDetails>
        </Accordion> */}
      </div>
    </div>
  );
};

export default Dashboard;
