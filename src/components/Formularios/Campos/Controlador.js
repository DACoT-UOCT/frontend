import React, { useState } from "react";
import "../../../App.css";
import { Label, Button } from "reactstrap";
import { styled } from "@material-ui/core/styles";
import styles from "./Campos.module.css";
import PopOver from "../../Shared/PopOver";
import decamelizeKeysDeep from "decamelize-keys-deep";
import Geocode from "react-geocode";

import Loading from "../../Shared/Loading";
import {
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@material-ui/core";
import { getFecha } from "../../Shared/Utils/general_functions";
import { useQuery } from "../../../GraphQL/useQuery";
import { GetControllers } from "../../../GraphQL/Queries";
import { getDate } from "date-fns";
import MapaConsulta from "../../Inicio/MapaConsulta";
import MapaFormulario from "../MapaFormulario";

Geocode.setApiKey("AIzaSyA1-WTtheQWOcQSW4elD1bgWE_WZsCOous");
Geocode.setLanguage("sp");
Geocode.setRegion("cl");
Geocode.enableDebug();

const Campo = styled(TextField)({
  background: "none",
});

const Controlador = (props) => {
  const controller = props.state;
  const dispatch = props.dispatch;

  const [openMapa, setOpenMapa] = React.useState(false);
  const [error, setError] = useState("");
  const [consultado, setConsultado] = useState(false);
  const [controladores, setControladores] = useState(null);
  const [coordenadas, setCoordenadas] = useState("");

  const controladoresQuery = useQuery(GetControllers, (data) => {
    //guardar respuesta
    setControladores(decamelizeKeysDeep(data.controllerModels));
    //obtener coordenadas de la posicion actual del controlador
    Geocode.fromAddress("La moneda, Santiago").then(
      (response) => {
        setCoordenadas(response.results[0].geometry.location);
      },
      (error) => {
        setCoordenadas([-33.554039, -70.632627]);
        console.error("error consiguiendo coordenadas" + error);
      }
    );
  });

  const getMarcas = () => {
    let marcas = new Set();
    for (let i = 0; i < controladores.length; i++) {
      marcas.add(controladores[i].company.name);
    }
    return Array.from(marcas);
  };

  const getModelos = () => {
    let modelos = [];
    for (let i = 0; i < controladores.length; i++) {
      if (controller.model.company.name === controladores[i].company.name) {
        modelos.push(controladores[i].model);
      }
    }
    return modelos;
  };

  const getVersions = () => {
    let versions = [];
    for (let i = 0; i < controladores.length; i++) {
      if (
        controller.model.company.name === controladores[i].company.name &&
        controller.model.model === controladores[i].model
      ) {
        versions.push(controladores[i].firmware_version);
      }
    }
    return versions;
  };

  if (
    controladoresQuery.status === "idle" ||
    controladoresQuery.status === "loading"
  ) {
    return <Loading />;
  } else if (controladoresQuery.status === "error") {
    return <p>Error en la consulta</p>;
  }

  return (
    <>
      <legend className="seccion">
        {"Controlador  "}
        <PopOver mensaje="Si el modelo que está buscando no se encuentra disponible, favor de contactar al administrador para registrarlo"></PopOver>
      </legend>{" "}
      <TableContainer className={styles.form}>
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Marca</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard-select-currency-native"
                  select
                  label="Marca"
                  variant="standard"
                  name="modelo"
                  autoComplete="off"
                  SelectProps={{
                    native: true,
                  }}
                  value={
                    controller.model.company.name !== ""
                      ? controller.model.company.name
                      : ""
                  }
                  onChange={(e) =>
                    dispatch({
                      type: "controller_model",
                      fieldName: "company",
                      payLoad: e.currentTarget.value,
                    })
                  }>
                  <option hidden></option>
                  {getMarcas().map((marca) => {
                    return <option>{marca}</option>;
                  })}
                </Campo>
              </TableCell>
            </TableRow>
            {controller.model.company.name !== "" && (
              <TableRow>
                <TableCell component="th" scope="row">
                  <Label>Modelo</Label>
                </TableCell>
                <TableCell align="left">
                  <Campo
                    id="standard-select-currency-native"
                    select
                    label="Modelo"
                    variant="standard"
                    name="modelo"
                    autoComplete="off"
                    SelectProps={{
                      native: true,
                    }}
                    value={
                      controller.model.model !== ""
                        ? controller.model.model
                        : ""
                    }
                    onChange={(e) =>
                      dispatch({
                        type: "controller_model",
                        fieldName: "model",
                        payLoad: e.currentTarget.value,
                      })
                    }>
                    <option hidden></option>
                    {getModelos().map((modelo) => {
                      return <option>{modelo}</option>;
                    })}
                  </Campo>
                </TableCell>
              </TableRow>
            )}

            {controller.model.model !== "" && (
              <>
                {" "}
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Label>Versión de firmware</Label>
                  </TableCell>
                  <TableCell align="left">
                    <Campo
                      id="standard-select-currency-native"
                      select
                      label="Versión"
                      variant="standard"
                      name="modelo"
                      autoComplete="off"
                      SelectProps={{
                        native: true,
                      }}
                      value={
                        controller.model.firmware_version !== ""
                          ? controller.model.firmware_version
                          : ""
                      }
                      onChange={(e) =>
                        dispatch({
                          type: "controller_model",
                          fieldName: "firmware_version",
                          payLoad: e.currentTarget.value,
                          controladores: controladores,
                        })
                      }>
                      <option hidden></option>
                      {getVersions().map((version) => {
                        return <option>{version}</option>;
                      })}
                    </Campo>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Label>Checksum</Label>
                  </TableCell>
                  <TableCell align="left">
                    <Campo
                      disabled
                      id="standard-select-currency-native"
                      label="Checksum"
                      variant="standard"
                      name="modelo"
                      autoComplete="off"
                      value={
                        controller.model.checksum !== ""
                          ? controller.model.checksum
                          : ""
                      }></Campo>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Label>Fecha de versión</Label>
                  </TableCell>
                  <TableCell align="left">
                    <Campo
                      disabled
                      id="standard-select-currency-native"
                      label="Fecha"
                      variant="standard"
                      name="modelo"
                      autoComplete="off"
                      value={
                        controller.model.date !== ""
                          ? getFecha(controller.model.date)
                          : ""
                      }></Campo>
                  </TableCell>
                </TableRow>
              </>
            )}

            {/* <TableRow>
              <TableCell component="th" scope="row">
                <Label>Ubicación</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  disabled
                  id="standard"
                  label="Ubicación"
                  variant="standard"
                  name="controlador_ubicacion"
                  autoComplete="off"
                  style={{ width: "550px" }}
                  value={
                    controller.address_reference !== ""
                      ? controller.address_reference
                      : ""
                  }
                />
                <Button
                  onClick={() => {
                    setOpenMapa(true);
                  }}>
                  Seleccionar ubicación
                </Button>
              </TableCell>
              {openMapa && (
                <MapaFormulario
                  dispatch={dispatch}
                  setPin={(_coordenada) => {
                    setCoordenadas(_coordenada);
                  }}
                  // index={0}
                  address={controller.address_reference}
                  open={openMapa}
                  setOpen={setOpenMapa}
                  // buscar={() => console.log("Buscando mapa consulta")}
                  controlador={true}
                  pins={[
                    {
                      jid: "Controlador",
                      coordinates: coordenadas,
                    },
                  ]}
                />
              )}
            </TableRow> */}

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>
                  GPS
                  <PopOver mensaje="¿Cuenta el controlador con GPS?" />
                </Label>
              </TableCell>
              <TableCell align="left">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={controller.gps}
                      onChange={(e) =>
                        dispatch({
                          type: "controller",
                          fieldName: "gps",
                          payLoad: !controller.gps,
                        })
                      }
                      name="gilad"
                    />
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default React.memo(Controlador);
