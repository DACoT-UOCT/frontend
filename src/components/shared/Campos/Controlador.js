import React, { useEffect, useState } from "react";
import "../../../App.css";
import { Label } from "reactstrap";
import { styled } from "@material-ui/core/styles";
import axios from "axios";
import Loading from "../Loading";
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

const Campo = styled(TextField)({
  background: "none",
});

const getFecha = (date) => {
  var temp = new Date(date);
  const string =
    temp.getDate() + "-" + (temp.getMonth() + 1) + "-" + temp.getFullYear();
  return string;
};

const modelos_dummy = [
  {
    company: "SIEMENS",
    models: [
      {
        name: "ST 900",
        firmware: [
          {
            version: "PB801 v13",
            checksum: "71 3A B4 A0",
            date: {
              $date: 1609383600000,
            },
          },
        ],
      },
    ],
  },
];

const Controlador = (props) => {
  const controller = props.state;
  const dispatch = props.dispatch;

  const [error, setError] = useState("");
  const [consultado, setConsultado] = useState(false);
  const [modelos, setModelos] = useState(null);

  useEffect(() => {
    if (!consultado) {
      consultar();
      setConsultado(true);
    }
  });

  const consultar = async () => {
    setError("");
    setModelos(modelos_dummy);

    return;
    try {
      await getData();
    } catch (error) {
      console.log(error);
      setError("Error en la consulta de los modelos");
    }
  };

  async function getData() {
    //consulta por id al backend
    var link = "";

    return new Promise((resolve, reject) => {
      axios
        .get(link)
        .then((response) => {
          //solicitud exitosa
          setModelos(response.data);
          console.log(response.data);
          resolve();
        })
        .catch((err) => {
          //error
          reject(err);
        });
    });
  }

  return (
    <>
      <legend className="seccion">Controlador</legend>
      {modelos === null ? (
        <>
          <p>Consultando modelos disponibles</p>
          <Loading />
        </>
      ) : (
        <TableContainer>
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
                    {modelos.map((company) => {
                      return <option>{company.company}</option>;
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
                      {modelos.map((marca) => {
                        if (marca.company === controller.model.company.name) {
                          return marca.models.map((modelo) => {
                            return <option>{modelo.name}</option>;
                          });
                        }
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
                      <Label>Versión</Label>
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
                            modelos: modelos,
                          })
                        }>
                        <option hidden></option>
                        {modelos.map((marca) => {
                          if (marca.company === controller.model.company.name) {
                            return marca.models.map((modelo) => {
                              return modelo.firmware.map((firmware) => {
                                return (
                                  modelo.name === controller.model.model && (
                                    <option>{firmware.version}</option>
                                  )
                                );
                              });
                            });
                          }
                        })}
                      </Campo>
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
                          controller.model.date.$date !== ""
                            ? getFecha(controller.model.date.$date)
                            : ""
                        }></Campo>
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
                </>
              )}

              <TableRow>
                <TableCell component="th" scope="row">
                  <Label>Ubicación</Label>
                </TableCell>
                <TableCell align="left">
                  <Campo
                    id="standard"
                    label="Ubicación"
                    variant="standard"
                    name="controlador_ubicacion"
                    autoComplete="off"
                    value={
                      controller.address_reference !== ""
                        ? controller.address_reference
                        : ""
                    }
                    onChange={(e) =>
                      dispatch({
                        type: "controller",
                        fieldName: "address_reference",
                        payLoad: e.currentTarget.value,
                      })
                    }
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  <Label>GPS</Label>
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
      )}
    </>
  );
};

export default React.memo(Controlador);
