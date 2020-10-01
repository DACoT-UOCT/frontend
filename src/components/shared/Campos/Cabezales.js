import React, { useContext } from "react";

import "../../../App.css";
import { Label } from "reactstrap";
import {  Checkbox,
          FormControlLabel,
          Table,
          TableBody,
          TableCell,
          TableContainer,
          TableRow,
          TextField,
          styled } from '@material-ui/core';

const Campo = styled(TextField)({
  background: "none",
});

const Cabezales = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend className="seccion">Cabezales</legend>

      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row"><Label></Label></TableCell>
              <TableCell align="left"><Label className='inputCabezales'>Vehiculo L1</Label></TableCell>
              <TableCell align="left"><Label className='inputCabezales'>Vehiculo L2</Label></TableCell>
              <TableCell align="left"><Label className='inputCabezales'>Vehiculo L3-L4</Label></TableCell>
              <TableCell align="left"><Label className='inputCabezales'>Vehiculo L5</Label></TableCell>
              <TableCell align="left"><Label className='inputCabezales'>Vehiculo L6</Label></TableCell>
              <TableCell align="left"><Label className='inputCabezales'>Peatonal</Label></TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row"><Label>Halógeno</Label></TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  variant="standard"
                  name="cabezales-l1-hal"
                  type="number"
                  autoComplete="off"
                  style={{ width: "75px" }}
                  value={state.l1.hal}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l1",
                      fieldName: "hal",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </TableCell>
              <TableCell align="left">
                <Campo
                id="standard"
                variant="standard"
                name="cabezales-l2-hal"
                type="number"
                autoComplete="off"
                style={{ width: "75px" }}
                value={state.l2.hal}
                onChange={(e) => {
                  dispatch({
                    type: "cabezales.l2",
                    fieldName: "hal",
                    payLoad: e.currentTarget.value,
                  });
                }}
              />
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  variant="standard"
                  name="cabezales-l3_l4-hal"
                  type="number"
                  autoComplete="off"
                  style={{ width: "75px" }}
                  value={state.l3_l4.hal}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l3_l4",
                      fieldName: "hal",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  variant="standard"
                  name="cabezales-l5-hal"
                  type="number"
                  autoComplete="off"
                  style={{ width: "75px" }}
                  value={state.l5.hal}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l5",
                      fieldName: "hal",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  variant="standard"
                  name="cabezales-l6-hal"
                  type="number"
                  autoComplete="off"
                  style={{ width: "75px" }}
                  value={state.l6.hal}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l6",
                      fieldName: "hal",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  variant="standard"
                  name="cabezales-peatonal-hal"
                  type="number"
                  autoComplete="off"
                  style={{ width: "75px" }}
                  value={state.peatonal.hal}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.peatonal",
                      fieldName: "hal",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row"><Label>Led</Label></TableCell>
              <TableCell align="left">
                <Campo
                id="standard"
                variant="standard"
                name="cabezales-l1-led"
                type="number"
                autoComplete="off"
                style={{ width: "75px" }}
                value={state.l1.led}
                onChange={(e) => {
                  dispatch({
                    type: "cabezales.l1",
                    fieldName: "led",
                    payLoad: e.currentTarget.value,
                  });
                }}
              />
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  variant="standard"
                  name="cabezales-l2-led"
                  type="number"
                  autoComplete="off"
                  style={{ width: "75px" }}
                  value={state.l2.led}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l2",
                      fieldName: "led",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  variant="standard"
                  name="cabezales-l3_l4-led"
                  type="number"
                  autoComplete="off"
                  style={{ width: "75px" }}
                  value={state.l3_l4.led}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l3_l4",
                      fieldName: "led",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  variant="standard"
                  name="cabezales-l5-led"
                  type="number"
                  autoComplete="off"
                  style={{ width: "75px" }}
                  value={state.l5.led}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l5",
                      fieldName: "led",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  variant="standard"
                  name="cabezales-l6-led"
                  type="number"
                  autoComplete="off"
                  style={{ width: "75px" }}
                  value={state.l6.led}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.l6",
                      fieldName: "led",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  variant="standard"
                  name="cabezales-peatonal-led"
                  type="number"
                  autoComplete="off"
                  style={{ width: "75px" }}
                  value={state.peatonal.led}
                  onChange={(e) => {
                    dispatch({
                      type: "cabezales.peatonal",
                      fieldName: "led",
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

export default React.memo(Cabezales);
