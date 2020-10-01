import React from "react";
import "../../../App.css";
import "react-datepicker/dist/react-datepicker.css";
import PopOver from "../../Shared/PopOver";
import DatePicker from "react-datepicker";
import { Label } from "reactstrap";
import {  Checkbox,
          FormControlLabel,
          Table,
          TableBody,
          TableCell,
          TableContainer,
          TableRow,
          TextField,
          styled } from '@material-ui/core';

const Campo = styled(TextField)({
  background: "none",
});

const OTU = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend className="seccion">OTU</legend>

      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Código en sistema</Label>{" "}
                <PopOver mensaje="Código de 6 dígitos que tendrá la instalación en el sistema (ej X001260)" />
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  label="Código"
                  name="otu-codigo"
                  autoComplete="off"
                  value={props.codigo}
                  onChange={(e) =>
                    dispatch({
                      type: "oid",
                      payLoad: e.currentTarget.value.toUpperCase(),
                    })
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Región</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard-select-currency-native"
                  select
                  label="Región"
                  variant="standard"
                  name="region"
                  autoComplete="off"
                  style={{ width: "350px" }}
                  SelectProps={{
                    native: true,
                  }}
                  value={state.region}
                  onChange={(e) =>
                    dispatch({
                      type: "metadata",
                      fieldName: "region",
                      payLoad: e.currentTarget.value,
                    })
                  }>
                  <option hidden></option>
                  {/* <option>Región de Arica y Parinacota</option>
                  <option>Región de Tarapacá</option>
                  <option>Región de Antofagasta</option>
                  <option>Región de Atacama</option>
                  <option>Región de Coquimbo</option>
                  <option>Región de Valparaíso</option> */}
                  <option>Región Metropolitana de Santiago</option>
                  {/* <option>Región del Libertador General Bernardo O’Higgins</option>
                  <option>Región del Maule</option>
                  <option>Región del Ñuble</option>
                  <option>Región del Biobío</option>
                  <option>Región de La Araucanía</option>
                  <option>Región de Los Ríos</option>
                  <option>Región de Los Lagos</option> */}
                  {/* <option>
                    Región de Aysén del General Carlos Ibáñez del Campo
                  </option>
                  <option>Región de Magallanes y la Antártica Chilena</option> */}
                </Campo>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Comuna</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard-select-currency-native"
                  select
                  label="Comuna"
                  variant="standard"
                  name="comuna"
                  autoComplete="off"
                  SelectProps={{
                    native: true,
                  }}
                  value={state.commune}
                  onChange={(e) =>
                    dispatch({
                      type: "metadata",
                      fieldName: "commune",
                      payLoad: e.currentTarget.value,
                    })
                  }>
                  <option hidden></option>
                  <option>Cerrillos</option>
                  <option>Cerro Navia</option>
                  <option>Conchalí</option>
                  <option>El Bosque</option>
                  <option>Estación Central</option>
                  <option>Huechuraba</option>
                  <option>Independencia</option>
                  <option>La Cisterna</option>
                  <option>La Florida</option>
                  <option>La Granja</option>
                  <option>La Pintana</option>
                  <option>La Reina</option>
                  <option>Las Condes</option>
                  <option>Lo Barnechea</option>
                  <option>Lo Espejo</option>
                  <option>Lo Prado</option>
                  <option>Macul</option>
                  <option>Maipú</option>
                  <option>Ñuñoa</option>
                  <option>Pedro Aguirre Cerda</option>
                  <option>Peñalolén</option>
                  <option>Providencia</option>
                  <option>Pudahuel</option>
                  <option>Quilicura</option>
                  <option>Quinta Normal</option>
                  <option>Recoleta</option>
                  <option>Renca</option>
                  <option>San Joaquín</option>
                  <option>San Miguel</option>
                  <option>San Ramón</option>
                  <option>Santiago</option>
                  <option>Vitacura</option>
                </Campo>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Fecha de instalacion</Label>
              </TableCell>
              <TableCell align="left">
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  withPortal
                  selected={state.installation_date}
                  onChange={(date) =>
                    dispatch({
                      type: "installation_date",
                      payLoad: date.getTime(),
                    })
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Tipo de enlace</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard-select-currency-native"
                  select
                  label="Tipo de Enlace"
                  variant="standard"
                  name="enlace_pc"
                  autoComplete="off"
                  SelectProps={{
                    native: true,
                  }}
                  value={state.link_owner}
                  onChange={(e) => {
                    dispatch({
                      type: "metadata",
                      fieldName: "link_owner",
                      payLoad: e.currentTarget.value,
                    });
                  }}>
                  <option value="" hidden></option>
                  <option value="Propio">Propio</option>
                  <option value="Compartido">Compartido</option>
                </Campo>{" "}
                <Campo
                  id="standard-select-currency-native"
                  select
                  label="Tipo de Enlace"
                  variant="standard"
                  name="enlace_pc"
                  autoComplete="off"
                  SelectProps={{
                    native: true,
                  }}
                  value={state.link_type}
                  onChange={(e) => {
                    dispatch({
                      type: "metadata",
                      fieldName: "link_type",
                      payLoad: e.currentTarget.value,
                    });
                  }}>
                  <option value="" hidden></option>
                  <option value="Digital">Digital</option>
                  <option value="Analogo">Análogo</option>
                </Campo>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Número de serie OTU</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  label="N° Serie"
                  variant="standard"
                  name="otu-serie"
                  autoComplete="off"
                  value={state.serial}
                  onChange={(e) =>
                    dispatch({
                      type: "metadata",
                      fieldName: "serial",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Dirección IP - Máscara de red</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  label="Dirección IP"
                  variant="standard"
                  name="otu-ip"
                  autoComplete="off"
                  value={state.ip_address}
                  onChange={(e) =>
                    dispatch({
                      type: "metadata",
                      fieldName: "ip_address",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />{" "}
                <Campo
                  id="standard"
                  label="Mascara de Red"
                  variant="standard"
                  name="otu-netmask"
                  autoComplete="off"
                  value={state.netmask}
                  onChange={(e) =>
                    dispatch({
                      type: "metadata",
                      fieldName: "netmask",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Número palabras de</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  label="Control"
                  variant="standard"
                  type="number"
                  name="otu-control"
                  autoComplete="off"
                  value={state.control}
                  onChange={(e) =>
                    dispatch({
                      type: "metadata",
                      fieldName: "control",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />{" "}
                <Campo
                  id="standard"
                  label="Respuesta"
                  variant="standard"
                  type="number"
                  name="otu-respuesta"
                  autoComplete="off"
                  value={state.answer}
                  onChange={(e) =>
                    dispatch({
                      type: "metadata",
                      fieldName: "answer",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Detector scoot</Label>
              </TableCell>
              <TableCell align="left">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={state.detector_scoot}
                      onChange={(e) =>
                        dispatch({
                          type: "metadata",
                          fieldName: "detector_scoot",
                          payLoad: !state.detector_scoot,
                        })
                      }
                      name="gilad"
                    />
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Detector local</Label>
              </TableCell>
              <TableCell align="left">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={state.detector_local}
                      onChange={(e) =>
                        dispatch({
                          type: "metadata",
                          fieldName: "detector_local",
                          payLoad: !state.detector_local,
                        })
                      }
                      name="gilad"
                    />
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Demanda Peatonal</Label>
              </TableCell>
              <TableCell align="left">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={state.demanda_peatonal}
                      onChange={(e) =>
                        dispatch({
                          type: "metadata",
                          fieldName: "demanda_peatonal",
                          payLoad: !state.demanda_peatonal,
                        })
                      }
                      name="gilad"
                    />
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Facilidad Peatonal</Label>
              </TableCell>
              <TableCell align="left">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={state.facilidad_peatonal}
                      onChange={(e) =>
                        dispatch({
                          type: "metadata",
                          fieldName: "facilidad_peatonal",
                          payLoad: !state.facilidad_peatonal,
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

      {/*{state.enlace_pc === "Compartido" && (
          <Col sm={3}>
            <FormGroup>
              <Campo
                id="standard"
                label="Nodo Concentrador"
                variant="standard"
                name="nodo_concentrador"
                autoComplete="off"
                value={state.nodo_concentrador}
                onChange={(e) => {
                  dispatch({
                    type: "otu",
                    fieldName: "nodo_concentrador",
                    payLoad: e.currentTarget.value,
                  });
                }}
              />
            </FormGroup>
          </Col>
        )} */}

      {/* <Row form>
        <FormGroup>
          <Campo
            id="standard"
            label="N° Empalme"
            variant="standard"
            name="otu-empalme"
            autoComplete="off"
            value={state.n_empalme}
            onChange={(e) =>
              dispatch({
                type: "otu",
                fieldName: "n_empalme",
                payLoad: e.currentTarget.value,
              })
            }
          />
        </FormGroup>
        <Col sm={1}></Col>
        <FormGroup>
          <Campo
            id="standard"
            label="Capacidad Empalme"
            variant="standard"
            name="cap-empalme"
            autoComplete="off"
            value={state.capacidad_empalme}
            onChange={(e) =>
              dispatch({
                type: "otu",
                fieldName: "capacidad_empalme",
                payLoad: e.currentTarget.value,
              })
            }
          />
        </FormGroup>
      </Row> */}

      {/* <Row form>
        <Col sm={3}>
          <FormGroup>
            <Campo
              id="standard"
              label="Señal Hito"
              variant="standard"
              name="senal_hito"
              type="number"
              autoComplete="off"
              placeholder="0"
              value={state.senal_hito}
              onChange={(e) => {
                dispatch({
                  type: "metadata",
                  fieldName: "senal_hito",
                  payLoad: e.currentTarget.value,
                });
              }}
            />
          </FormGroup>
        </Col>
      </Row> */}

      {/*<Row form>
            <Col sm={3}>
              <FormGroup>
                <Campo
                  id="standard-select-currency-native"
                  select
                  label="Tipo de Enlace"
                  variant="standard"
                  name="enlace_da"
                  autoComplete="off"
                  SelectProps={{
                    native: true,
                  }}
                  value={state.enlace_da}
                  onChange={(e) => {
                    dispatch({
                      type: "metadata",
                      fieldName: "enlace_da",
                      payLoad: e.currentTarget.value,
                    });
                  }}>
                  <option value="" hidden></option>
                  <option value="Digital">Digital</option>
                  <option value="Análogo">Análogo</option>
                </Campo>
              </FormGroup>
            </Col>
          </Row>*/}
    </>
  );
};

export default React.memo(OTU);
