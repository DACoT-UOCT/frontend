import React from "react";

import "../../../App.css";
import { Label } from "reactstrap";
import PopOver from "../../Shared/PopOver";
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

const Cabezales = (props) => {
  const headers = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend className="seccion">Cabezales</legend>
      <h6>
        Ingresar cantidad de cabezales halógenos y led de cada tipo,
        considerando el total para todos los junctions.
      </h6>
      <TableContainer style={{ width: "70%", overflowX: "hidden" }}>
        <Table size="small" aria-label="simple table">
          <TableBody>
            {headers.map((header, index) => {
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <Label>{header.type}</Label>
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    <PopOver mensaje="">
                      <img src={"/cabezales/" + header.type + ".png"} alt="" />
                    </PopOver>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Label>Led</Label>
                  </TableCell>
                  <TableCell align="left">
                    <Campo
                      id={index + "led"}
                      variant="standard"
                      name="cabezales-l1-hal"
                      type="number"
                      autoComplete="off"
                      style={{ width: "75px" }}
                      value={header.led}
                      onChange={(e) => {
                        dispatch({
                          type: "header",
                          index: index,
                          fieldName: "led",
                          payLoad: parseInt(
                            e.currentTarget.value.replace(/\D/, "")
                          ),
                        });
                      }}
                    />
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Label>Halógeno</Label>
                  </TableCell>
                  <TableCell align="left">
                    <Campo
                      id={index + "hal"}
                      variant="standard"
                      name="cabezales-l1-hal"
                      type="number"
                      autoComplete="off"
                      style={{ width: "75px" }}
                      value={header.hal}
                      onChange={(e) => {
                        dispatch({
                          type: "header",
                          index: index,
                          fieldName: "hal",
                          payLoad: parseInt(
                            e.currentTarget.value.replace(/\D/, "")
                          ),
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default React.memo(Cabezales);
