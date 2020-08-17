import React, { useContext, useState } from "react";
import { DispatchContext, StateContext } from "./NuevaInstalacion";
import "../App.css";
import { Col,Row,Form,FormGroup,Label,Button } from "reactstrap";
import FormularioJunction from "./FormularioJunction";
import FormularioEquipamiento from "./FormularioEquipamiento";
import {TextField,
        Dialog,
        DialogActions,
        DialogContent, 
        DialogContentText, 
        DialogTitle, 
        Slide, 
        Switch, 
        Collapse, 
        FormControlLabel} from '@material-ui/core';
import ButtonMaterial from '@material-ui/core/Button';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NuevaInstalacionVista1 = () => {
  /*Mensaje error*/
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const validar_entrada = (str, nombre, expresion = /.+/) => {
    if (!expresion.test(str)) {
      //si no se cumple la expresion regular
      setOpen(true);
      dispatch({ type: "error", payLoad: nombre });
    }
  };
  const validar_formulario = () => {
    //revisar las variables 1 a una
    dispatch({ type: "reset_errores" });

    state.junctions.map((junction, index) => {
      validar_entrada(junction.id, "Código en Sistema");
      validar_entrada(junction.addr, "Cruce");
    });
    validar_entrada(state.metadata.comuna, "Comuna");
    validar_entrada(state.metadata.controlador.modelo, " Controlador - Modelo");
    validar_entrada(state.metadata.controlador.marca, "Controlador - Marca");
    validar_entrada(state.metadata.mod_potencia, "Mod Potencia");
    validar_entrada(state.metadata.detectores, "Detectores");
    validar_entrada(state.metadata.otu.n_serie, "OTU - N Serie");
    validar_entrada(state.metadata.otu.marca, "OTU - Marca");
    validar_entrada(state.metadata.otu.tipo, "OTU - Tipo");
    validar_entrada(state.metadata.otu.direccion_ip, "OTU - Dirección IP");
    validar_entrada(state.metadata.otu.equipamientos, "OTU - Equipamientos");
    validar_entrada(state.metadata.n_empalme, "N Empalme");
    validar_entrada(state.metadata.capacidad_empalme, "Capacidad Empalme");
    /*validar_entrada(state.metadata.ups.marca, "UPS - Marca");
    validar_entrada(state.metadata.ups.modelo, "UPS - Modelo");
    validar_entrada(state.metadata.ups.n_serie, "UPS - N Serie");
    validar_entrada(state.metadata.ups.capacidad, "UPS - Capacidad");
    validar_entrada(state.metadata.ups.duracion_carga,"UPS - Duración de Carga");
    validar_entrada(state.metadata.postes_ganchos, "Postes Ganchos");
    validar_entrada(state.metadata.postes_vehiculares, "Postes Vehiculares");
    validar_entrada(state.metadata.postes_peatonales, "Postes Peatonales");
    for (let cabezal in state.metadata.cabezales) {
      validar_entrada(
        state.metadata.cabezales[cabezal].hal,
        `${cabezal} Halogeno`
      );
      validar_entrada(state.metadata.cabezales[cabezal].led, `${cabezal} Led`);
    }
    validar_entrada(state.metadata.botoneras, "Botoneras");
    validar_entrada(state.metadata.espira_local, "Espira Local");
    validar_entrada(state.metadata.espira_scoot, "Espira Scoot");
    validar_entrada(state.metadata.senal_hito, "Señal Hito");
    validar_entrada(state.metadata.enlace_pc, "Tipo de Enlace 1");
    if (state.metadata.enlace_pc === "Compartido")
      validar_entrada(state.metadata.nodo_concentrador, "Nodo Concentrador");
    validar_entrada(state.metadata.enlace_da, "Tipo de Enlace 2");*/

    dispatch({ type: "siguiente" });
  };
  return (
    <>
      
      <div className="grid-item nuevo-semaforo">
        <h4 className="form-titulo">Formulario para nuevo semaforo</h4>
        <Form>
          
          <hr className="separador"></hr>

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
                  style={{width: "350px"}}
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
                  <option>Región de Aysén del General Carlos Ibáñez del Campo</option>
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
                  <option></option>
                </TextField>
              </FormGroup>
            </Col>
          </Row>

          <hr className="separador"></hr>

          <legend className="seccion">OTU</legend>
          <Row form>
            <Col sm={3}>
              <FormGroup>
                <TextField
                  disabled
                  id="outlined"
                  label="Código"
                  variant="outlined"
                  name="otu-codigo"
                  autoComplete="off"
                  value= {"X"+state.junctions[0].id.substring(1,state.junctions[0].id.length-1)+"0"}
                  onChange={(e) =>
                    dispatch({
                      type: "otu",
                      fieldName: "codigo",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col sm={3}>
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
            </Col>
            <Col sm={1}></Col>
            <Col sm={3}>
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
            </Col>
            <Col sm={1}></Col>
            <Col sm={3}>
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
            </Col>
          </Row>

          <Row form>
            <Col sm={3}>
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
            </Col>
            <Col sm={1}></Col>
            <Col sm={3}>
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
            </Col>
          </Row>

          <Row form>
            <Col sm={3}>
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
            </Col>
            <Col sm={1}></Col>
            <Col sm={3}>
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
            </Col>
          </Row>

          <Row form>
            <Col sm={3}>
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
            </Col>
            <Col sm={1}></Col>
            <Col sm={3}>
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
            </Col>
          </Row>

          <FormularioEquipamiento />

          <hr className="separador"></hr>

          <legend className="seccion">Controlador</legend>

          <Row form>
            <Col sm={3}>
              <FormGroup>
                <TextField
                  id="outlined"
                  label="Marca"
                  variant="outlined"
                  name="controlador_marca"
                  autoComplete="off"
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
            <Col sm={1}></Col>
            <Col sm={3}>
              <FormGroup>
                <TextField
                  id="outlined"
                  label="Modelo"
                  variant="outlined"
                  name="controlador_modelo"
                  autoComplete="off"
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
            <Col sm={1}></Col>
            <Col sm={3}>
              <FormGroup>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Ubicación"
                  variant="outlined"
                  name="controlador_ubicacion"
                  autoComplete="off"
                    SelectProps={{
                      native: true,
                    }}
                  value={state.metadata.controlador.ubicacion}
                  onChange={(e) =>
                    dispatch({
                      type: "ubicacion controlador",
                      payLoad: e.currentTarget.value,
                    })
                  }>
                  <option value="" hidden></option>
                  {state.junctions.map((junction) => {
                    return(
                      <option>{junction.id}</option>
                    )
                  })}
                </TextField>
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col sm={3}>
              <FormGroup>
                <TextField
                  disabled
                  id="outlined"
                  label="Mod. Potencia"
                  variant="outlined"
                  name="mod-potencia"
                  autoComplete="off"
                  placeholder="0"
                  type="number"
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
                <TextField
                  id="outlined"
                  label="Detectores"
                  variant="outlined"
                  type="number"
                  name="detectores"
                  autoComplete="off"
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

          <FormularioJunction />

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

          <legend className="seccion">Postes</legend>
          <Row form>
            <Col sm={3}>
              <FormGroup>
                <TextField
                  id="outlined"
                  label="Ganchos"
                  variant="outlined"
                  name="ganchos"
                  type="number"
                  autoComplete="off"
                  placeholder="0"
                  type="number"
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
            <Col sm={3}>
              <FormGroup>
                <TextField
                  id="outlined"
                  label="Vehiculares"
                  variant="outlined"
                  name="vehiculares"
                  type="number"
                  autoComplete="off"
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
            <Col sm={3}>
              <FormGroup>
                <TextField
                  id="outlined"
                  label="Peatonales"
                  variant="outlined"
                  name="peatonales"
                  type="number"
                  autoComplete="off"
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

          <legend className="seccion">Cabezales</legend>
          <FormGroup row>
            <Label sm={2}></Label>
            <Label sm={2}>Halógeno</Label>
            <Label sm={2}>Led</Label>
          </FormGroup>

          <FormGroup row>
            <Label sm={2}>Vehiculo L1</Label>
            <Col sm={2}>
              <TextField
                  id="outlined"
                  variant="outlined"
                  name="cabezales-l1-hal"
                  type="number"
                  autoComplete="off"
                  
                  style={{width: "75px"}}
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
              <TextField
                  id="outlined"
                  variant="outlined"
                  name="cabezales-l1-led"
                  type="number"
                  autoComplete="off"
                
                  style={{width: "75px"}}
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

          <FormGroup row>
            <Label sm={2}>Vehiculo L2</Label>
            <Col sm={2}>
              <TextField
                  id="outlined"
                  variant="outlined"
                  name="cabezales-l2-hal"
                  type="number"
                  autoComplete="off"
              
                  style={{width: "75px"}}
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
              <TextField
                  id="outlined"
                  variant="outlined"
                  name="cabezales-l2-led"
                  type="number"
                  autoComplete="off"
                  
                  style={{width: "75px"}}
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

          <FormGroup row>
            <Label sm={2}>Vehiculo L3-L4</Label>
            <Col sm={2}>
              <TextField
                  id="outlined"
                  variant="outlined"
                  name="cabezales-l3_l4-hal"
                  type="number"
                  autoComplete="off"
                
                  style={{width: "75px"}}
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
              <TextField
                  id="outlined"
                  variant="outlined"
                  name="cabezales-l3_l4-led"
                  type="number"
                  autoComplete="off"
            
                  style={{width: "75px"}}
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

          <FormGroup row>
            <Label sm={2}>Vehiculo L5</Label>
            <Col sm={2}>
              <TextField
                  id="outlined"
                  variant="outlined"
                  name="cabezales-l5-hal"
                  type="number"
                  autoComplete="off"
                
                  style={{width: "75px"}}
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
              <TextField
                  id="outlined"
                  variant="outlined"
                  name="cabezales-l5-led"
                  type="number"
                  autoComplete="off"
                
                  style={{width: "75px"}}
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

          <FormGroup row>
            <Col sm={2}>
              <Label>Vehiculo L6</Label>
            </Col>
            <Col sm={2}>
              <TextField
                  id="outlined"
                  variant="outlined"
                  name="cabezales-l6-hal"
                  type="number"
                  autoComplete="off"
                
                  style={{width: "75px"}}
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
              <TextField
                  id="outlined"
                  variant="outlined"
                  name="cabezales-l6-led"
                  type="number"
                  autoComplete="off"
                
                  style={{width: "75px"}}
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

          <FormGroup row>
            <Col sm={2}>
              <Label>Peatonal</Label>
            </Col>
            <Col sm={2}>
              <TextField
                  id="outlined"
                  variant="outlined"
                  name="cabezales-peatonal-hal"
                  type="number"
                  autoComplete="off"
                  
                  style={{width: "75px"}}
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
              <TextField
                  id="outlined"
                  variant="outlined"
                  name="cabezales-peatonal-led"
                  type="number"
                  autoComplete="off"
              
                  style={{width: "75px"}}
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

          <hr className="separador"></hr>

          <legend className="seccion">Dispositivo de Facilidad Peatonal</legend>

          <FormGroup row>
            <Label sm={4}>Demanda Peatonal</Label>
            <Col sm={3}>
              <TextField
                id="outlined"
                variant="outlined"
                name="d_peatonal"
                type="number"
                autoComplete="off"
                style={{width: "75px"}}
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
                style={{width: "75px"}}
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

          <hr className="separador"></hr>

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

          <hr className="separador"></hr>

          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Campos No Obligatorios"
          />
          <Collapse in={checked}>
            <legend className="seccion">UPS</legend>
            <Row form>
              <Col sm={3}>
                <FormGroup>
                  <TextField
                    id="outlined"
                    label="Marca"
                    variant="outlined"
                    name="ups-marca"
                    autoComplete="off"
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
                  <TextField
                    id="outlined"
                    label="Modelo"
                    variant="outlined"
                    name="ups-modelo"
                    autoComplete="off"
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
                  <TextField
                    id="outlined"
                    label="N° Serie"
                    variant="outlined"
                    name="ups-serie"
                    autoComplete="off"
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
                  <TextField
                    id="outlined"
                    label="Capacidad"
                    variant="outlined"
                    name="ups-capacidad"
                    autoComplete="off"
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
              <Col sm={3}>
                <FormGroup>
                  <TextField
                    id="outlined"
                    label="Duración Carga"
                    variant="outlined"
                    name="ups-duracion"
                    autoComplete="off"
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
          </Collapse>
      

          <FormGroup>
            <Row>
              <Col sm={{ offset: 5 }}>
                <ButtonMaterial variant="contained" color="primary" onClick={validar_formulario}>
                  Siguiente
                </ButtonMaterial>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description">
                  <DialogTitle id="alert-dialog-slide-title">
                    Error en los siguientes campos:
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {state.errors.map((error) => {
                        return <li>{error}</li>;
                      })}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      className="boton-mensaje-error"
                      onClick={handleClose}>
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </div>
    </>
  );
};
export default NuevaInstalacionVista1;
