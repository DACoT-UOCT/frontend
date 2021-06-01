import React, { useContext, useState } from "react";
import { DispatchContext } from "../../Formularios/NuevaInstalacion";
import "../../../App.css";
import { Label } from "reactstrap";
import PopOver from "../../Shared/PopOver";
import styles from "./Campos.module.css";
import {
  Checkbox,
  FormControlLabel,
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

const UPS = (props) => {
  const ups = props.state;
  const dispatch = useContext(DispatchContext);
  const [checkbox, setCheckbox] = useState(ups != undefined);

  return (
    <>
      <legend className="seccion">UPS</legend>
      <Label style={{ marginRight: "2rem" }}>¿Aplica a esta instalación?</Label>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={checkbox}
            onChange={(e) => {
              dispatch({
                type: "ups_checkbox",
              });
              setCheckbox(!checkbox);
            }}
            name="gilad"
          />
        }
      />
      <TableContainer className={styles.form} style={{ width: "50%" }}>
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" align="right"></TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
            {checkbox && (
              <>
                <TableRow>
                  <TableCell component="th" scope="row" align="right">
                    <Label style={{ transform: "translateY(-40%)" }}>
                      Marca
                    </Label>
                  </TableCell>
                  <TableCell align="left">
                    <Campo
                      id="standard"
                      variant="standard"
                      name="ups-marca"
                      autoComplete="off"
                      value={ups.brand !== "" ? ups.brand : ""}
                      onChange={(e) => {
                        dispatch({
                          type: "ups",
                          fieldName: "brand",
                          payLoad: e.currentTarget.value,
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" align="right">
                    <Label style={{ transform: "translateY(-40%)" }}>
                      Modelo
                    </Label>
                  </TableCell>
                  <TableCell align="left">
                    <Campo
                      id="standard"
                      variant="standard"
                      name="ups-modelo"
                      autoComplete="off"
                      value={ups.model !== "" ? ups.model : ""}
                      onChange={(e) => {
                        dispatch({
                          type: "ups",
                          fieldName: "model",
                          payLoad: e.currentTarget.value,
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" align="right">
                    <Label style={{ transform: "translateY(-40%)" }}>
                      N° Serie
                    </Label>
                  </TableCell>
                  <TableCell align="left">
                    <Campo
                      id="standard"
                      variant="standard"
                      name="ups-serie"
                      autoComplete="off"
                      value={ups.serial !== "" ? ups.serial : ""}
                      onChange={(e) => {
                        dispatch({
                          type: "ups",
                          fieldName: "serial",
                          payLoad: e.currentTarget.value,
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" align="right">
                    <Label style={{ transform: "translateY(-40%)" }}>
                      Capacidad
                    </Label>
                  </TableCell>
                  <TableCell align="left">
                    <Campo
                      id="standard"
                      variant="standard"
                      name="ups-capacidad"
                      autoComplete="off"
                      value={ups.capacity !== "" ? ups.capacity : ""}
                      onChange={(e) => {
                        dispatch({
                          type: "ups",
                          fieldName: "capacity",
                          payLoad: e.currentTarget.value,
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" align="right">
                    <Label style={{ transform: "translateY(-40%)" }}>
                      Duración Carga [kWh]
                    </Label>{" "}
                  </TableCell>
                  <TableCell align="left">
                    <Campo
                      id="standard"
                      variant="standard"
                      name="ups-duracion"
                      autoComplete="off"
                      value={
                        ups.charge_duration !== "" ? ups.charge_duration : ""
                      }
                      onChange={(e) => {
                        dispatch({
                          type: "ups",
                          fieldName: "charge_duration",
                          payLoad: e.currentTarget.value,
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default React.memo(UPS);
