import React, { useContext } from "react";
import { DispatchContext, StateContext } from "./NuevaInstalacion";
import "../App.css";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import FormularioJunction from "./FormularioJunction";

const NuevaInstalacionVista1 = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const siguiente = () => {
    console.log(state);

    dispatch({ type: "siguiente" });
  };
  return (
    <>
      <div className="grid-item nuevo-semaforo">
        <h4>Formulario para nuevo semaforo</h4>
        <Form>
          <FormularioJunction />
          <hr className="separador"></hr>
          <Row>
            <Col sm={4}>
              <FormGroup>
                <Label>Comuna</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="comuna"
                  placeholder="Comuna"
                  value={state.metadata.comuna}
                  onChange={(e) =>
                    dispatch({
                      type: "metadata",
                      fieldName: "comuna",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
          </Row>

          <hr className="separador"></hr>
          <legend>Controlador</legend>

          <Row form>
            <Col sm={4}>
              <FormGroup>
                <Label>Marca</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="controlador"
                  placeholder="Marca"
                  value={state.metadata.controlador.marca}
                  onChange={(e) =>
                    dispatch({
                      type: "marca controlador",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col sm={4}>
              <FormGroup>
                <Label>Modelo</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="controlador"
                  placeholder="Modelo"
                  value={state.metadata.controlador.modelo}
                  onChange={(e) =>
                    dispatch({
                      type: "modelo controlador",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
          </Row>

          <hr className="separador"></hr>

          <Row form>
            <Col sm={4}>
              <FormGroup>
                <Label>Mod. Potencia</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="mod-potencia"
                  placeholder="0"
                  value={state.metadata.mod_potencia}
                  onChange={(e) =>
                    dispatch({
                      type: "metadata",
                      fieldName: "mod_potencia",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col sm={1}></Col>
            <Col sm={3}>
              <FormGroup>
                <Label>Detectores</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="detectores"
                  placeholder="0"
                  value={state.metadata.detectores}
                  onChange={(e) =>
                    dispatch({
                      type: "metadata",
                      fieldName: "detectores",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
          </Row>

          <hr className="separador"></hr>

          <legend>OTU</legend>
          <Row form>
            <Col sm={3}>
              <FormGroup>
                <Label>Marca</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="otu-marca"
                  placeholder=""
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
            </Col>
            <Col sm={1}></Col>
            <Col sm={3}>
              <FormGroup>
                <Label>Tipo</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="otu-tipo"
                  placeholder="TC-12"
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
            </Col>
            <Col sm={1}></Col>
            <Col sm={3}>
              <FormGroup>
                <Label>N° Serie</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="otu-serie"
                  placeholder=""
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
            </Col>
          </Row>

          <Row form>
            <Col sm={10}>
              <FormGroup>
                <Label>Equipamientos</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="otu-equipamientos"
                  placeholder=""
                  value={state.metadata.otu.equipamientos}
                  onChange={(e) =>
                    dispatch({
                      type: "otu",
                      fieldName: "equipamientos",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col sm={7}>
              <FormGroup>
                <Label>Direccion IP</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="otu-ip"
                  placeholder=""
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
            </Col>
          </Row>

          <hr className="separador"></hr>

          <Row form>
            <Col sm={3}>
              <FormGroup>
                <Label>N° Empalme</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="otu-empalme"
                  placeholder=""
                  value={state.metadata.n_empalme}
                  onChange={(e) => {
                    dispatch({
                      type: "metadata",
                      fieldName: "n_empalme",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col sm={1}></Col>
            <Col sm={3}>
              <FormGroup>
                <Label>Capacidad Empalme</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="cap-empalme"
                  placeholder=""
                  value={state.metadata.capacidad_empalme}
                  onChange={(e) => {
                    dispatch({
                      type: "metadata",
                      fieldName: "capacidad_empalme",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
          </Row>

          <hr className="separador"></hr>

          <legend>UPS</legend>
          <Row form>
            <Col sm={3}>
              <FormGroup>
                <Label>Marca</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="ups-marca"
                  placeholder=""
                  value={state.metadata.ups.marca}
                  onChange={(e) => {
                    dispatch({
                      type: "ups",
                      fieldName: "marca",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col sm={1}></Col>
            <Col sm={3}>
              <FormGroup>
                <Label>Modelo</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="ups-modelo"
                  placeholder=""
                  value={state.metadata.ups.modelo}
                  onChange={(e) => {
                    dispatch({
                      type: "ups",
                      fieldName: "modelo",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col sm={1}></Col>
            <Col sm={3}>
              <FormGroup>
                <Label>N° Serie</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="ups-serie"
                  placeholder=""
                  value={state.metadata.ups.n_serie}
                  onChange={(e) => {
                    dispatch({
                      type: "ups",
                      fieldName: "n_serie",
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
                <Label>N° Capacidad</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="ups-capacidad"
                  placeholder="1 KVA"
                  value={state.metadata.ups.capacidad}
                  onChange={(e) => {
                    dispatch({
                      type: "ups",
                      fieldName: "capacidad",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col sm={1}></Col>
            <Col sm={4}>
              <FormGroup>
                <Label>Duración Carga</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="ups-duracion"
                  placeholder=""
                  value={state.metadata.ups.duracion_carga}
                  onChange={(e) => {
                    dispatch({
                      type: "ups",
                      fieldName: "duracion_carga",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
          </Row>

          <hr className="separador"></hr>

          {/* <Row form>
              <FormGroup row>
                <Label sm={5}> GPS </Label>
                <Col sm={4}>
                  <FormGroup check>
                    <Label check>
                      {" "}
                      <Input type="radio" name="gps" />
                      Sí
                    </Label>
                  </FormGroup>
                </Col>
                <Col sm={3}>
                  <FormGroup check>
                    <Label check>
                      {" "}
                      <Input type="radio" name="gps" />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </FormGroup>
            </Row> */}

          <legend>Postes</legend>
          <Row form>
            <Col sm={2}>
              <FormGroup>
                <Label>Ganchos</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="ganchos"
                  placeholder="0"
                  value={state.metadata.postes_ganchos}
                  onChange={(e) => {
                    dispatch({
                      type: "metadata",
                      fieldName: "postes_ganchos",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col sm={1}></Col>
            <Col sm={2}>
              <FormGroup>
                <Label>Vehiculares</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="vehiculares"
                  placeholder="0"
                  value={state.metadata.postes_vehiculares}
                  onChange={(e) => {
                    dispatch({
                      type: "metadata",
                      fieldName: "postes_vehiculares",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col sm={1}></Col>
            <Col sm={2}>
              <FormGroup>
                <Label>Peatonales</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="peatonales"
                  placeholder="0"
                  value={state.metadata.postes_peatonales}
                  onChange={(e) => {
                    dispatch({
                      type: "metadata",
                      fieldName: "postes_peatonales",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
          </Row>

          <hr className="separador"></hr>

          <legend>Cabezales</legend>
          <Label sm={{ offset: 4 }}>Halogeno Led</Label>
          <Row form>
              <FormGroup row>
                <Label sm={4}>Vehiculo L1</Label>
                <Col sm={2}>
                <Input
                  bsSize="sm"
                  type="text"
                  name="cabezales-l1-hal"
                  placeholder="0"
                  value={state.metadata.cabezales.l1.hal}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l1",
                      fieldName: "hal",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
                </Col>
                <Col sm={2}>
                <Input
                  bsSize="sm"
                  type="text"
                  name="cabezales-l1-led"
                  placeholder="0"
                  value={state.metadata.cabezales.l1.led}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l1",
                      fieldName: "led",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
                </Col>
              </FormGroup>
          </Row>

          <Row form>
              <FormGroup row>
                <Label sm={4}>Vehiculo L2</Label>
                <Col sm={2}>
                <Input
                  bsSize="sm"
                  type="text"
                  name="cabezales-l2-hal"
                  placeholder="0"
                  value={state.metadata.cabezales.l2.hal}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l2",
                      fieldName: "hal",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
                </Col>
                <Col sm={2}>
                <Input
                  bsSize="sm"
                  type="text"
                  name="cabezales-l2-led"
                  placeholder="0"
                  value={state.metadata.cabezales.l2.led}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l2",
                      fieldName: "led",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
                </Col>
              </FormGroup>
          </Row>

          <Row form>
              <FormGroup row>
                <Label sm={4}>Vehiculo L3-L4</Label>
                <Col sm={2}>
                <Input
                  bsSize="sm"
                  type="text"
                  name="cabezales-l3_l4-hal"
                  placeholder="0"
                  value={state.metadata.cabezales.l3_l4.hal}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l3_l4",
                      fieldName: "hal",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
                </Col>
                <Col sm={2}>
                <Input
                  bsSize="sm"
                  type="text"
                  name="cabezales-l3_l4-led"
                  placeholder="0"
                  value={state.metadata.cabezales.l3_l4.led}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l3_l4",
                      fieldName: "led",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
                </Col>
              </FormGroup>
          </Row>

          <Row form>
              <FormGroup row>
                <Label sm={4}>Vehiculo L5</Label>
                <Col sm={2}>
                <Input
                  bsSize="sm"
                  type="text"
                  name="cabezales-l5-hal"
                  placeholder="0"
                  value={state.metadata.cabezales.l5.hal}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l5",
                      fieldName: "hal",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
                </Col>
                <Col sm={2}>
                <Input
                  bsSize="sm"
                  type="text"
                  name="cabezales-l5-led"
                  placeholder="0"
                  value={state.metadata.cabezales.l5.led}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l5",
                      fieldName: "led",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
                </Col>
              </FormGroup>
          </Row>

          <Row form>
              <FormGroup row>
                <Label sm={4}>Vehiculo L6</Label>
                <Col sm={2}>
                <Input
                  bsSize="sm"
                  type="text"
                  name="cabezales-l6-hal"
                  placeholder="0"
                  value={state.metadata.cabezales.l6.hal}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l6",
                      fieldName: "hal",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
                </Col>
                <Col sm={2}>
                <Input
                  bsSize="sm"
                  type="text"
                  name="cabezales-l6-led"
                  placeholder="0"
                  value={state.metadata.cabezales.l6.led}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l6",
                      fieldName: "led",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
                </Col>
              </FormGroup>
          </Row>

          <Row form>
              <FormGroup row>
                <Label sm={4}>Peatonal</Label>
                <Col sm={2}>
                <Input
                  bsSize="sm"
                  type="text"
                  name="cabezales-peatonal-hal"
                  placeholder="0"
                  value={state.metadata.cabezales.peatonal.hal}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.peatonal",
                      fieldName: "hal",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
                </Col>
                <Col sm={2}>
                <Input
                  bsSize="sm"
                  type="text"
                  name="cabezales-peatonal-led"
                  placeholder="0"
                  value={state.metadata.cabezales.peatonal.led}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.peatonal",
                      fieldName: "led",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
                </Col>
              </FormGroup>
          </Row>

          <hr className="separador"></hr>

          <Row form>
            <Col sm={3}>
              <FormGroup>
                <Label>Botoneras</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="botoneras"
                  placeholder="0"
                  value={state.metadata.botoneras}
                  onChange={(e) => {
                    dispatch({
                      type: "metadata",
                      fieldName: "botoneras",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col sm={1}></Col>
            <Col sm={4}>
              <FormGroup>
                <Label>Señal Hito</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="senal_hito"
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
                <Label>Espira Local</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="espira_local"
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
            <Col sm={4}>
              <FormGroup>
                <Label>Espira Scoot</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="espira_scoot"
                  placeholder=""
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

          <Row form>
            <Col sm={4}>
              <FormGroup>
                <Label>Tipo de Enlace</Label>
                <Input
                  bsSize="sm"
                  type="select"
                  name="enlace_da"
                  value={state.metadata.enlace_da}            // NO ESTA FUNCANDO SI SE ENVIA SIN ALTERAR LA OPCION
                  onChange={(e) => {
                    dispatch({
                      type: "metadata",
                      fieldName: "enlace_da",
                      payLoad: e.currentTarget.value,
                    });
                  }}>
                <option value="Digital">Digital</option>
                <option value="Análogo">Análogo</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col sm={4}>
              <FormGroup>
              <Label>Tipo de Enlace</Label>
                <Input
                  bsSize="sm"
                  type="select"
                  name="enlace_pc"
                  value={state.metadata.enlace_pc}           // NO ESTA FUNCANDO SI SE ENVIA SIN ALTERAR LA OPCION
                  onChange={(e) => {
                    dispatch({
                      type: "metadata",
                      fieldName: "enlace_pc",
                      payLoad: e.currentTarget.value,
                    });
                  }}>
                <option value="Propio">Propio</option>
                <option value="Compartido">Compartido</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm={1}></Col>
            <Col sm={5}>
              <FormGroup>
                <Label>Nodo Concentrador</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="nodo_concentrador"
                  placeholder=""
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
          </Row>

          <FormGroup>
            <Col sm={{ offset: 9 }}>
              <Button size="sm" onClick={siguiente}>
                Siguiente
              </Button>
            </Col>
          </FormGroup>

        </Form>
      </div>
    </>
  );
};

export default NuevaInstalacionVista1;
