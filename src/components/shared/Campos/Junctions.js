import React from "react";

import "../../../App.css";
import { Button } from "reactstrap";
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

const Junctions = (props) => {
  const junctions = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend className="seccion">Junctions</legend>
      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableBody>
            {junctions.map((junction, index) => {
              return (
                <>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Campo
                        disabled
                        id="standard"
                        label="Código en Sistema"
                        variant="standard"
                        name="junction"
                        placeholder="J000000"
                        autoComplete="off"
                        value={junction.jid}
                        // onChange={(e) =>
                        //   dispatch({
                        //     type: "junctions",
                        //     index: index,
                        //     fieldName: "jid",
                        //     payLoad: e.currentTarget.value,
                        //   })
                        // }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Campo
                        id="standard"
                        label="Cruce"
                        variant="standard"
                        name="cruce"
                        placeholder="Calle - Calle"
                        autoComplete="off"
                        style={{ width: "550px" }}
                        value={
                          junction.metadata.address_reference !== ""
                            ? junction.metadata.address_reference
                            : ""
                        }
                        onChange={(e) =>
                          dispatch({
                            type: "junctions",
                            index: index,
                            fieldName: "address_reference",
                            payLoad: e.currentTarget.value,
                          })
                        }
                      />
                    </TableCell>
                  </TableRow>
                </>
              );
            })}

            {junctions.length < 9 && (
              <TableRow>
                <TableCell component="th" scope="row">
                  <Button
                    onClick={() => {
                      dispatch({ type: "agregar_junction" });
                    }}>
                    Agregar junction
                  </Button>
                </TableCell>
              </TableRow>
            )}
            {junctions.length > 1 && (
              <TableRow>
                <TableCell align="left">
                  <Button
                    onClick={() => dispatch({ type: "eliminar_junction" })}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default React.memo(Junctions);
