import React, { useContext } from "react";

import "../../../App.css";
import { Label } from "reactstrap";
import {  Table,
          TableBody,
          TableCell,
          TableContainer,
          TableRow,
          TextField,
          styled } from '@material-ui/core';

const Campo = styled(TextField)({
background: 'none',
});

const Postes = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend className="seccion">Postes</legend>

      <TableContainer>
        <Table size='small' aria-label="simple table">
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
                  value={state.ganchos}
                  onChange={(e) => {
                    dispatch({
                      type: "postes",
                      fieldName: "ganchos",
                      payLoad: e.currentTarget.value,
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
                  value={state.vehiculares}
                  onChange={(e) => {
                    dispatch({
                      type: "postes",
                      fieldName: "vehiculares",
                      payLoad: e.currentTarget.value,
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
                  value={state.peatonales}
                  onChange={(e) => {
                    dispatch({
                      type: "postes",
                      fieldName: "peatonales",
                      payLoad: e.currentTarget.value,
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
