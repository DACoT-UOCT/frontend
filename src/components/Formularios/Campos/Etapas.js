import React from "react";

import "../../../App.css";
import { Button } from "reactstrap";
import styles from "./Campos.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  styled,
} from "@material-ui/core";

const Campo = styled(TextField)({
  background: "none",
});

const Etapas = (props) => {
  const etapas = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend>Etapas</legend>
      <h6>
        Asignar sigla de identificación y tipo para las etapas de todos los
        junctions.
      </h6>

      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableBody>
            {etapas.map((etapa, index) => {
              return (
                <>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Campo
                        id="standard"
                        label="Identificador"
                        variant="standard"
                        autoComplete="off"
                        placeholder=""
                        value={etapa[0]}
                        onChange={(e) =>
                          dispatch({
                            type: "stage",
                            index: index,
                            fieldName: 0,
                            payLoad: e.currentTarget.value.toUpperCase(),
                          })
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Campo
                        id="standard-select-currency-native"
                        select
                        label="Tipo"
                        variant="standard"
                        name="tipo"
                        autoComplete="off"
                        SelectProps={{
                          native: true,
                        }}
                        value={etapa[1]}
                        onChange={(e) =>
                          dispatch({
                            type: "stage",
                            index: index,
                            fieldName: 1,
                            payLoad: e.currentTarget.value,
                          })
                        }>
                        <option value="" hidden></option>
                        <option value="Vehicular">Vehicular</option>
                        <option value="Ciclista">Ciclista</option>
                        <option value="Peatonal">Peatonal</option>
                        <option value="Flecha Verde">Flecha Verde</option>
                      </Campo>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
            <TableRow>
              <TableCell component="th" scope="row">
                <Button
                  variant="standard"
                  size="small"
                  className="botonAgregar"
                  onClick={() => {
                    dispatch({ type: "agregar_stage" });
                  }}>
                  Agregar etapa
                </Button>
              </TableCell>
              {etapas.length > 1 && (
                <TableCell align="left">
                  <Button
                    size="sm"
                    onClick={() => dispatch({ type: "eliminar_stage" })}>
                    Eliminar
                  </Button>
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default React.memo(Etapas);
