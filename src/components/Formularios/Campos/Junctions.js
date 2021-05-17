import React, { useState } from "react";
import "../../../App.css";
import { Button } from "reactstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Checkbox,
  TableRow,
  TextField,
  FormControlLabel,
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
        para la localización. Especificar si el cruce tendrá usará el entreverde
        vehicular por defecto en su programación.(4s) Tambien señalar las fases
        del cruce
      </h6>
      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableBody>
            {junctions.map((junction, index) => {
              return (
                <>
                  {/* <TableRow> */}
                  {/* <TableCell component="th" scope="row">
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
                    </TableCell> */}
                  <h2 className="junction-label">
                    {junction.jid ? junction.jid : "Código junction"}
                  </h2>
                  <div className="junction-info">
                    <TableRow>
                      <TableCell align="left">
                        <Campo
                          disabled
                          id="standard"
                          label="Especificar ubicación con el mapa"
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
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          onClick={() => {
                            setOpenMapa(true);
                            setIndex(index);
                          }}>
                          Mapa
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Entreverde vehicular</TableCell>
                      <TableCell align="left">
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={true}
                              // onChange={(e) =>
                              //   dispatch({
                              //     type: "entreverde_vehicular",
                              //     fieldName: "scoot_detector",
                              //     payLoad: !metadata.scoot_detector,
                              //   })
                              // }
                              name="gilad"
                            />
                          }
                        />
                      </TableCell>
                    </TableRow>
                    {[1, 2, 3].map((fase, faseIndex) => {
                      return (
                        <>
                          <TableRow>
                            <TableCell align="left">{"F" + fase}</TableCell>
                            <TableCell align="left">
                              <Campo
                                id="standard"
                                label="Definir cruce mediante mapa"
                                variant="standard"
                                name="cruce"
                                placeholder="Calle - Calle"
                                autoComplete="off"
                                style={{ width: "550px" }}
                                value={"A-B-C"}
                              />
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}

            {junctions.length < 9 && (
              <TableRow>
                <TableCell component="th" scope="row">
                  <Button
                    color="success"
                    onClick={() => {
                      dispatch({ type: "agregar_junction" });
                    }}>
                    Agregar junction
                  </Button>
                </TableCell>
              </TableRow>
            )}
            {junctions.length > 1 && (
              <>
                <TableRow>
                  <TableCell align="left">
                    <Button
                      onClick={() => dispatch({ type: "eliminar_junction" })}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              </>
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
