import React from "react";
import "../../../App.css";
import styles from "./Campos.module.css";
import { Label } from "reactstrap";
import { styled } from "@material-ui/core/styles";
import DatePicker from "react-datepicker";
import {
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@material-ui/core";

const Campo = styled(TextField)({
  background: "none",
});

const General = (props) => {
  const metadata = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend className="seccion">Información general del proyecto</legend>

      <TableContainer className={styles.form}>
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Región</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard-select-currency-native"
                  select
                  disbled
                  label="Región"
                  variant="standard"
                  name="region"
                  autoComplete="off"
                  style={{ width: "350px" }}
                  SelectProps={{
                    native: true,
                  }}
                  value={metadata.region}
                  onChange={(e) =>
                    dispatch({
                      type: "metadata",
                      fieldName: "region",
                      payLoad: e.currentTarget.value,
                    })
                  }>
                  <option value="Región Metropolitana de Santiago">
                    Región Metropolitana de Santiago
                  </option>
                </Campo>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Comuna</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard-select-currency-native"
                  select
                  label="Comuna"
                  variant="standard"
                  name="comuna"
                  autoComplete="off"
                  SelectProps={{
                    native: true,
                  }}
                  value={metadata.commune}
                  onChange={(e) =>
                    dispatch({
                      type: "metadata",
                      fieldName: "commune",
                      payLoad: e.currentTarget.value,
                    })
                  }>
                  <option hidden></option>
                  <option value={metadata.commune}>{metadata.commune}</option>
                  <option>Cerrillos</option>
                  <option>Cerro Navia</option>
                  <option>Conchalí</option>
                  <option>El Bosque</option>
                  <option>Estación Central</option>
                  <option>Huechuraba</option>
                  <option>Independencia</option>
                  <option>La Cisterna</option>
                  <option>La Florida</option>
                  <option>La Granja</option>
                  <option>La Pintana</option>
                  <option>La Reina</option>
                  <option>Las Condes</option>
                  <option>Lo Barnechea</option>
                  <option>Lo Espejo</option>
                  <option>Lo Prado</option>
                  <option>Macul</option>
                  <option>Maipú</option>
                  <option>Ñuñoa</option>
                  <option>Pedro Aguirre Cerda</option>
                  <option>Peñalolén</option>
                  <option>Providencia</option>
                  <option>Pudahuel</option>
                  <option>Quilicura</option>
                  <option>Quinta Normal</option>
                  <option>Recoleta</option>
                  <option>Renca</option>
                  <option>San Joaquín</option>
                  <option>San Miguel</option>
                  <option>San Ramón</option>
                  <option>Santiago</option>
                  <option>Vitacura</option>
                </Campo>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Última modificación del controlador</Label>
              </TableCell>
              <TableCell align="left">
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  withPortal
                  selected={
                    metadata.installation_date === undefined
                      ? Date.now()
                      : metadata.installation_date.$date
                  }
                  onChange={(date) =>
                    dispatch({
                      type: "metadata",
                      fieldName: "installation_date",
                      payLoad: date.getTime(),
                    })
                  }
                />
                {metadata.installation_date === undefined && (
                  <p>Campo no ingresado</p>
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Detector scoot</Label>
              </TableCell>
              <TableCell align="left">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={metadata.scoot_detector}
                      onChange={(e) =>
                        dispatch({
                          type: "metadata",
                          fieldName: "scoot_detector",
                          payLoad: !metadata.scoot_detector,
                        })
                      }
                      name="gilad"
                    />
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Detector local</Label>
              </TableCell>
              <TableCell align="left">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={metadata.local_detector}
                      onChange={(e) =>
                        dispatch({
                          type: "metadata",
                          fieldName: "local_detector",
                          payLoad: !metadata.local_detector,
                        })
                      }
                      name="gilad"
                    />
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Facilidad Peatonal</Label>
              </TableCell>
              <TableCell align="left">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={metadata.pedestrian_facility}
                      onChange={(e) =>
                        dispatch({
                          type: "metadata",
                          fieldName: "pedestrian_facility",
                          payLoad: !metadata.pedestrian_facility,
                        })
                      }
                      name="gilad"
                    />
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Demanda Peatonal</Label>
              </TableCell>
              <TableCell align="left">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={metadata.pedestrian_demand}
                      onChange={(e) =>
                        dispatch({
                          type: "metadata",
                          fieldName: "pedestrian_demand",
                          payLoad: !metadata.pedestrian_demand,
                        })
                      }
                      name="gilad"
                    />
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default React.memo(General);
