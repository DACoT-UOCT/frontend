import React from "react";
import "../../../App.css";
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

      <TableContainer>
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
                  <option hidden></option>
                  {/* <option>Región de Arica y Parinacota</option>
                  <option>Región de Tarapacá</option>
                  <option>Región de Antofagasta</option>
                  <option>Región de Atacama</option>
                  <option>Región de Coquimbo</option>
                  <option>Región de Valparaíso</option> */}
                  <option value="Región Metropolitana de Santiago">
                    Región Metropolitana de Santiago
                  </option>
                  {/* <option>Región del Libertador General Bernardo O’Higgins</option>
                  <option>Región del Maule</option>
                  <option>Región del Ñuble</option>
                  <option>Región del Biobío</option>
                  <option>Región de La Araucanía</option>
                  <option>Región de Los Ríos</option>
                  <option>Región de Los Lagos</option> */}
                  {/* <option>
                    Región de Aysén del General Carlos Ibáñez del Campo
                  </option>
                  <option>Región de Magallanes y la Antártica Chilena</option> */}
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
                  selected={metadata.installation_date.$date}
                  onChange={(date) =>
                    dispatch({
                      type: "metadata",
                      fieldName: "installation_date",
                      payLoad: date.getTime(),
                    })
                  }
                />
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
