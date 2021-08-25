import React, { useState } from "react";
import "../../../App.css";
import { Label } from "reactstrap";
import { styled } from "@material-ui/core/styles";
import styles from "./Campos.module.css";
import decamelizeKeysDeep from "decamelize-keys-deep";
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
import { useQuery } from "../../../GraphQL/useQuery";
import { GetControllers } from "../../../GraphQL/Queries";

const Campo = styled(TextField)({
  background: "none",
});

//componente del formulario que consulta los controladores y permite seleccionar
//entre alguno de ellos
const Controlador = (props) => {
  const controller = props.state;
  const dispatch = props.dispatch;

  const [controladores, setControladores] = useState(null);
  const y_offset = "50%";
  const _align = "right";

  const controladoresQuery = useQuery(
    GetControllers,
    (data) => {
      setControladores(decamelizeKeysDeep(data.controllers));
    },
    { showDisabled: false }
  );

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
      <legend className="seccion">{"Controlador  "}</legend>
      <p>
        Si el modelo que está buscando no se encuentra disponible, favor de
        contactar al administrador para registrarlo
      </p>
      <TableContainer className={styles.form} style={{ width: "70%" }}>
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" align={_align}>
                <Label style={{ transform: "translateY(" + y_offset + ")" }}>
                  Marca
                </Label>
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
                    return <option key={marca}>{marca}</option>;
                  })}
                </Campo>
              </TableCell>
            </TableRow>
            {controller.model.company.name !== "" && (
              <TableRow>
                <TableCell component="th" scope="row" align={_align}>
                  <Label style={{ transform: "translateY(" + y_offset + ")" }}>
                    Modelo
                  </Label>
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
                    {getModelos().map((modelo, i) => {
                      return <option key={i}>{modelo}</option>;
                    })}
                  </Campo>
                </TableCell>
              </TableRow>
            )}

            {controller.model.model !== "" && (
              <>
                <TableRow>
                  <TableCell component="th" scope="row" align={_align}>
                    <Label
                      style={{ transform: "translateY(" + y_offset + ")" }}>
                      Versión de firmware
                    </Label>
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
                      {getVersions().map((version, i) => {
                        return <option key={i}>{version}</option>;
                      })}
                    </Campo>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" align={_align}>
                    <Label
                      style={{ transform: "translateY(" + y_offset + ")" }}>
                      Checksum
                    </Label>
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
              </>
            )}

            <TableRow>
              <TableCell component="th" scope="row" align={_align}>
                <Label>Instalación con GPS</Label>
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
