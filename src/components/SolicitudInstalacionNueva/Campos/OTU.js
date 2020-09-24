import React, { useContext } from "react";
import { DispatchContext, StateContext } from "../NuevaInstalacion";
import "../../../App.css";
import { Col, Row, FormGroup, Label } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import PopOver from "../../Shared/PopOver";

const OTU = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <legend className="seccion">OTU</legend>

      <Row form>
        <FormGroup>
          <TextField
            id="outlined"
            label="Código"
            variant="outlined"
            name="otu-codigo"
            autoComplete="off"
            value={state.metadata.otu.codigo}
            onChange={(e) =>
              dispatch({
                type: "otu",
                fieldName: "codigo",
                payLoad: e.currentTarget.value,
              })
            }
          />
        </FormGroup>
        <PopOver mensaje="Código de 6 dígitos que tendrá la instalación en el sistema (ej X001260)" />
      </Row>
      <Row form>
        <FormGroup>
          <TextField
            id="outlined"
            label="Marca"
            variant="outlined"
            name="marca"
            autoComplete="off"
            value={state.metadata.otu.marca}
            onChange={(e) =>
              dispatch({
                type: "otu",
                fieldName: "marca",
                payLoad: e.currentTarget.value,
              })
            }
          />
        </FormGroup>
        <Col sm={1}></Col>
        <FormGroup>
          <TextField
            id="outlined"
            label="Tipo"
            variant="outlined"
            name="otu-tipo"
            autoComplete="off"
            value={state.metadata.otu.tipo}
            onChange={(e) =>
              dispatch({
                type: "otu",
                fieldName: "tipo",
                payLoad: e.currentTarget.value,
              })
            }
          />
        </FormGroup>
        <Col sm={1}></Col>
        <FormGroup>
          <TextField
            id="outlined"
            label="N° Serie"
            variant="outlined"
            name="otu-serie"
            autoComplete="off"
            value={state.metadata.otu.n_serie}
            onChange={(e) =>
              dispatch({
                type: "otu",
                fieldName: "n_serie",
                payLoad: e.currentTarget.value,
              })
            }
          />
        </FormGroup>
      </Row>

      <Row form>
        <FormGroup>
          <TextField
            id="outlined"
            label="Dirección IP"
            variant="outlined"
            name="otu-ip"
            autoComplete="off"
            value={state.metadata.otu.direccion_ip}
            onChange={(e) =>
              dispatch({
                type: "otu",
                fieldName: "direccion_ip",
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
            value={state.metadata.otu.netmask}
            onChange={(e) =>
              dispatch({
                type: "otu",
                fieldName: "netmask",
                payLoad: e.currentTarget.value,
              })
            }
          />
        </FormGroup>
      </Row>

      <Row form>
        <FormGroup>
          <TextField
            id="outlined"
            label="Palabras de Ctrl"
            variant="outlined"
            type="number"
            name="otu-control"
            autoComplete="off"
            value={state.metadata.otu.control}
            onChange={(e) =>
              dispatch({
                type: "otu",
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
            label="Palabra de Resp"
            variant="outlined"
            type="number"
            name="otu-respuesta"
            autoComplete="off"
            value={state.metadata.otu.respuesta}
            onChange={(e) =>
              dispatch({
                type: "otu",
                fieldName: "respuesta",
                payLoad: e.currentTarget.value,
              })
            }
          />
        </FormGroup>
      </Row>

      <Row form>
        <FormGroup>
          <TextField
            id="outlined"
            label="N° Empalme"
            variant="outlined"
            name="otu-empalme"
            autoComplete="off"
            value={state.metadata.n_empalme}
            onChange={(e) =>
              dispatch({
                type: "metadata",
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
            value={state.metadata.capacidad_empalme}
            onChange={(e) =>
              dispatch({
                type: "metadata",
                fieldName: "capacidad_empalme",
                payLoad: e.currentTarget.value,
              })
            }
          />
        </FormGroup>
      </Row>
      <Row form>
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
              value={state.metadata.region}
              onChange={(e) =>
                dispatch({
                  type: "metadata",
                  fieldName: "region",
                  payLoad: e.currentTarget.value,
                })
              }>
              <option hidden></option>
              <option>Región de Arica y Parinacota</option>
              <option>Región de Tarapacá</option>
              <option>Región de Antofagasta</option>
              <option>Región de Atacama</option>
              <option>Región de Coquimbo</option>
              <option>Región de Valparaíso</option>
              <option>Región Metropolitana de Santiago</option>
              <option>Región del Libertador General Bernardo O’Higgins</option>
              <option>Región del Maule</option>
              <option>Región del Ñuble</option>
              <option>Región del Biobío</option>
              <option>Región de La Araucanía</option>
              <option>Región de Los Ríos</option>
              <option>Región de Los Lagos</option>
              <option>
                Región de Aysén del General Carlos Ibáñez del Campo
              </option>
              <option>Región de Magallanes y la Antártica Chilena</option>
            </TextField>
          </FormGroup>
        </Col>
      </Row>
      <Row form>
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
              value={state.metadata.comuna}
              onChange={(e) =>
                dispatch({
                  type: "metadata",
                  fieldName: "comuna",
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
      <Row form>
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
              value={state.metadata.senal_hito}
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
      </Row>

      <Row form>
        <Col sm={3}>
          <FormGroup>
            <TextField
              id="outlined"
              label="Espira Local"
              variant="outlined"
              name="espira_local"
              type="number"
              autoComplete="off"
              placeholder="0"
              value={state.metadata.espira_local}
              onChange={(e) => {
                dispatch({
                  type: "metadata",
                  fieldName: "espira_local",
                  payLoad: e.currentTarget.value,
                });
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={1}></Col>
        <Col sm={3}>
          <FormGroup>
            <TextField
              id="outlined"
              label="Espira Scoot"
              variant="outlined"
              name="espira_scoot"
              type="number"
              autoComplete="off"
              placeholder="0"
              value={state.metadata.espira_scoot}
              onChange={(e) => {
                dispatch({
                  type: "metadata",
                  fieldName: "espira_scoot",
                  payLoad: e.currentTarget.value,
                });
              }}
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
                  value={state.metadata.enlace_da}
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

      <Row form>
        <Col sm={3}>
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
              value={state.metadata.enlace_pc}
              onChange={(e) => {
                dispatch({
                  type: "metadata",
                  fieldName: "enlace_pc",
                  payLoad: e.currentTarget.value,
                });
              }}>
              <option value="" hidden></option>
              <option value="Propio">Propio</option>
              <option value="Compartido">Compartido</option>
            </TextField>
          </FormGroup>
        </Col>
        <Col sm={1}></Col>
        {state.metadata.enlace_pc === "Compartido" && (
          <Col sm={3}>
            <FormGroup>
              <TextField
                id="outlined"
                label="Nodo Concentrador"
                variant="outlined"
                name="nodo_concentrador"
                autoComplete="off"
                value={state.metadata.nodo_concentrador}
                onChange={(e) => {
                  dispatch({
                    type: "metadata",
                    fieldName: "nodo_concentrador",
                    payLoad: e.currentTarget.value,
                  });
                }}
              />
            </FormGroup>
          </Col>
        )}
      </Row>

      <FormGroup row>
        <Label sm={4}>Demanda Peatonal</Label>
        <Col sm={3}>
          <TextField
            id="outlined"
            variant="outlined"
            name="d_peatonal"
            type="number"
            autoComplete="off"
            style={{ width: "75px" }}
            value={state.metadata.d_peatonal}
            onChange={(e) => {
              dispatch({
                type: "metadata",
                fieldName: "d_peatonal",
                payLoad: e.currentTarget.value,
              });
            }}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={4}>Demanda y Facilidad Peatonal</Label>
        <Col sm={3}>
          <TextField
            id="outlined"
            variant="outlined"
            name="dyf_peatonal"
            type="number"
            autoComplete="off"
            style={{ width: "75px" }}
            value={state.metadata.dyf_peatonal}
            onChange={(e) => {
              dispatch({
                type: "metadata",
                fieldName: "dyf_peatonal",
                payLoad: e.currentTarget.value,
              });
            }}
          />
        </Col>
      </FormGroup>
    </>
  );
};

export default OTU;
