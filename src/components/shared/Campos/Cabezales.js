import React, { useContext } from "react";

import "../../../App.css";
import { Col, FormGroup, Label } from "reactstrap";
import TextField from "@material-ui/core/TextField";

const Cabezales = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      {console.log("render cabezales")}
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
        </Col>
        <Col sm={2}>
          <TextField
            id="outlined"
            variant="outlined"
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
        </Col>
        <Col sm={2}>
          <TextField
            id="outlined"
            variant="outlined"
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
        </Col>
        <Col sm={2}>
          <TextField
            id="outlined"
            variant="outlined"
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
        </Col>
        <Col sm={2}>
          <TextField
            id="outlined"
            variant="outlined"
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
        </Col>
        <Col sm={2}>
          <TextField
            id="outlined"
            variant="outlined"
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
        </Col>
        <Col sm={2}>
          <TextField
            id="outlined"
            variant="outlined"
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
        </Col>
      </FormGroup>
    </>
  );
};

export default React.memo(Cabezales);
