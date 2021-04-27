import React from "react";

import "../../../App.css";
import styles from "./Campos.module.css";
import { Label } from "reactstrap";
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

const Postes = (props) => {
  const poles = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend className="seccion">Postes</legend>
      <h6>Ingresar cantidad para cada tipo de poste</h6>
      <TableContainer className={styles.form}>
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Ganchos</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  label="Ganchos"
                  variant="standard"
                  name="ganchos"
                  type="number"
                  autoComplete="off"
                  placeholder="0"
                  value={poles.hooks}
                  onChange={(e) => {
                    dispatch({
                      type: "poles",
                      fieldName: "hooks",
                      payLoad: parseInt(
                        e.currentTarget.value.replace(/\D/, "")
                      ),
                    });
                  }}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Vehiculares</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  label="Vehiculares"
                  variant="standard"
                  name="vehiculares"
                  type="number"
                  autoComplete="off"
                  placeholder="0"
                  value={poles.vehicular}
                  onChange={(e) => {
                    dispatch({
                      type: "poles",
                      fieldName: "vehicular",
                      payLoad: parseInt(
                        e.currentTarget.value.replace(/\D/, "")
                      ),
                    });
                  }}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Peatonales</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  label="Peatonales"
                  variant="standard"
                  name="peatonales"
                  type="number"
                  autoComplete="off"
                  placeholder="0"
                  value={poles.pedestrian}
                  onChange={(e) => {
                    dispatch({
                      type: "poles",
                      fieldName: "pedestrian",
                      payLoad: parseInt(
                        e.currentTarget.value.replace(/\D/, "")
                      ),
                    });
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default React.memo(Postes);
