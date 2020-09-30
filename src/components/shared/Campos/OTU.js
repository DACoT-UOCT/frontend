import React, { useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import "../../../App.css";
import { Col, Row, FormGroup, Label } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PopOver from "../../Shared/PopOver";

const OTU = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;
  const ancho_label = 4;

  return (
    <>
      <legend className="seccion">OTU</legend>

      <Row form>
        <Label sm={ancho_label}>Código en sistema</Label>
        <FormGroup>
          <TextField
            id="outlined"
            label="Código"
            variant="outlined"
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
        </FormGroup>
        <PopOver mensaje="Código de 6 dígitos que tendrá la instalación en el sistema (ej X001260)" />
      </Row>
      <Row form>
        <Label sm={ancho_label}>Región</Label>
        <Col sm={4}>
          <FormGroup>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Región"
              variant="outlined"
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
            </TextField>
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Label sm={ancho_label}>Comuna</Label>
        <Col sm={3}>
          <FormGroup>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Comuna"
              variant="outlined"
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
            </TextField>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Label sm={ancho_label}>Fecha de instalacion</Label>
        <Col>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            withPortal
            selected={state.installation_date}
            onChange={(date) =>
              dispatch({ type: "installation_date", payLoad: date.getTime() })
            }
          />
        </Col>
      </Row>

      <Row form>
        <Label sm={ancho_label}>Tipo de enlace</Label>
        <FormGroup>
          <TextField
            id="outlined-select-currency-native"
            select
            label="Tipo de Enlace"
            variant="outlined"
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
          </TextField>
        </FormGroup>
        <Col sm={1}></Col>
        <FormGroup>
          <TextField
            id="outlined-select-currency-native"
            select
            label="Tipo de Enlace"
            variant="outlined"
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
          </TextField>
        </FormGroup>

        {/* <Col sm={1}></Col>
        {state.enlace_pc === "Compartido" && (
          <Col sm={3}>
            <FormGroup>
              <TextField
                id="outlined"
                label="Nodo Concentrador"
                variant="outlined"
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
      </Row>
      <Row form>
        <Label sm={ancho_label}>Número de serie</Label>
        <FormGroup>
          <TextField
            id="outlined"
            label="N° Serie"
            variant="outlined"
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
        </FormGroup>
      </Row>

      <Row form>
        <Label sm={ancho_label}>Dirección IP - Máscara de red</Label>
        <FormGroup>
          <TextField
            id="outlined"
            label="Dirección IP"
            variant="outlined"
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
          />
        </FormGroup>

        <Col sm={1}></Col>
        <FormGroup>
          <TextField
            id="outlined"
            label="Mascara de Red"
            variant="outlined"
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
        </FormGroup>
      </Row>

      <Row form>
        <Label sm={ancho_label}>Número palabras de control y respuesta</Label>
        <FormGroup>
          <TextField
            id="outlined"
            label="Control"
            variant="outlined"
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
          />
        </FormGroup>
        <Col sm={1}></Col>
        <FormGroup>
          <TextField
            id="outlined"
            label="Respuesta"
            variant="outlined"
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
        </FormGroup>
      </Row>

      {/* <Row form>
        <FormGroup>
          <TextField
            id="outlined"
            label="N° Empalme"
            variant="outlined"
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
          <TextField
            id="outlined"
            label="Capacidad Empalme"
            variant="outlined"
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
            <TextField
              id="outlined"
              label="Señal Hito"
              variant="outlined"
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

      <Row form>
        <Label sm={ancho_label}>Detector scoot</Label>
        <Col sm={3}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
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
          </FormGroup>
        </Col>
      </Row>

      <Row form>
        <Label sm={ancho_label}>Detector local</Label>
        <Col sm={3}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
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
          </FormGroup>
        </Col>
      </Row>

      {/*<Row form>
            <Col sm={3}>
              <FormGroup>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Tipo de Enlace"
                  variant="outlined"
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
                </TextField>
              </FormGroup>
            </Col>
          </Row>*/}

      <FormGroup row>
        <Label sm={ancho_label}>Demanda Peatonal</Label>
        <Col sm={3}>
          <FormControlLabel
            control={
              <Checkbox
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
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={ancho_label}>Facilidad Peatonal</Label>
        <Col sm={3}>
          <FormControlLabel
            control={
              <Checkbox
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
        </Col>
      </FormGroup>
    </>
  );
};

export default React.memo(OTU);
