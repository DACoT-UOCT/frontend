import React, { useContext } from "react";
import { DispatchContext, StateContext } from "./NuevaInstalacion";
import "../App.css";
import { Col, Row, FormGroup, Button } from "reactstrap";
import TextField from '@material-ui/core/TextField';

const FormularioEquipamiento = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <legend className="subseccion">Equipamientos</legend>
      {state.metadata.otu.equipamientos.map((equip, index) => {
        return (
          <Row form>
            <FormGroup>
              <TextField
                id="outlined"
                label="Descripcion"
                variant="outlined"
                name="equip_descripcion"
                placeholder=""
                autoComplete="off"
                value={equip.desc}
                onChange={(e) =>
                  dispatch({
                    type: "equipamiento",
                    index: index,
                    fieldName: "desc",
                    payLoad: e.currentTarget.value,
                  })
                }
              />
            </FormGroup>
            <Col sm={1}></Col>
            <FormGroup>
              <TextField
                id="outlined"
                label="Dirección IP"
                variant="outlined"
                name="equip_ip"
                placeholder=""
                autoComplete="off"
                value={equip.ip}
                onChange={(e) =>
                  dispatch({
                    type: "equipamiento",
                    index: index,
                    fieldName: "ip",
                    payLoad: e.currentTarget.value,
                  })
                }
              />
            </FormGroup>
          </Row>
        );
      })}
      
        <Col sm={3}>
          <FormGroup>
            <Button
              onClick={() => {
                dispatch({ type: "agregar_equip" });
              }}>
              Agregar Equipamiento
            </Button>
          </FormGroup>
        </Col>
        <Col>
          {state.metadata.otu.equipamientos.length > 1 && (
            <FormGroup>
              <Button
                onClick={() => dispatch({ type: "eliminar_equip" })}>
                Eliminar
              </Button>
            </FormGroup>
          )}
        </Col>
    </>
  );
};

export default FormularioEquipamiento;
