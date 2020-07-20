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
