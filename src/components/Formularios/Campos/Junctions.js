import React, { useState } from "react";
import "../../../App.css";
import { Button } from "reactstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Slide,
  styled,
} from "@material-ui/core";
import MapaFormulario from "../MapaFormulario";

const Campo = styled(TextField)({
  background: "none",
});

const Junctions = (props) => {
  const junctions = props.state;
  const dispatch = props.dispatch;
  const [indexJunction, setIndex] = useState(null);
  const [openMapa, setOpenMapa] = React.useState(false);

  return (
    <>
      <legend className="seccion">Junctions</legend>
      <h6>
        Identificar y ubicar los junctions presentes en el proyecto. Usar mapa
        para la localización
      </h6>
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
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Campo
                        disabled
                        id="standard"
                        label="Definir cruce mediante mapa"
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
                      />
                      <Button
                        onClick={() => {
                          setOpenMapa(true);
                          setIndex(index);
                        }}>
                        Mapa
                      </Button>
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
      {openMapa && (
        <MapaFormulario
          dispatch={dispatch}
          junction={true}
          address={junctions[indexJunction].metadata.address_reference}
          index={indexJunction}
          open={openMapa}
          setOpen={setOpenMapa}
          jid={junctions[indexJunction].jid}
          pins={junctions
            .map((junction) => {
              return {
                jid: junction.jid,
                coordinates: junction.metadata.coordinates,
              };
            })
            .filter((junction) => junction.coordinates !== "pointField")}
        />
      )}
    </>
  );
};

export default React.memo(Junctions);
