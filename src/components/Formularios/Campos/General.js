import React, { useState, useContext } from "react";
import "../../../App.css";
import styles from "./Campos.module.css";
import { Label } from "reactstrap";
import { styled } from "@material-ui/core/styles";
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
import { useQuery } from "../../../GraphQL/useQuery";
import { GetCommunes } from "../../../GraphQL/Queries";
import Loading from "../../Shared/Loading";
import { StateContext } from "../../App";
import { date_format } from "../../Shared/API/Interface";

//COMPONENTE DEL FORMULARIO QUE CONTIENE INFORMACION GENERAL DE LA INSTALACION
//COMUNA, EMPRESA MANTENEDORA , EMPRESA INSTALADORA, DETECTORES
const Campo = styled(TextField)({
  background: "none",
});
const General = (props) => {
  const metadata = props.state;
  const dispatch = props.dispatch;
  const [comunas, setComunas] = useState([]);
  const global_context = useContext(StateContext);
  const comunasQuery = useQuery(GetCommunes, (data) => {
    setComunas(data.communes);
  });

  const _align = "right";
  return (
    <>
      <legend className="seccion">Información general del proyecto</legend>
      <h6>
        Los siguientes campos son requeridos para el registro de nuevas
        instalaciones.
        {global_context.rol === "Personal UOCT" &&
          "Al ingresar los datos con una cuenta UOCT, estos quedarán guardados sin revisiones posteriores. Para instalaciones antiguas con información faltante en este sistema, se recomienda mantener los campos de imagen de cruce, modelo de controlador, etapas y entreverdes vehiculares actualizados."}
      </h6>
      <TableContainer
        className={styles.form}
        style={{ width: "70%", paddingTop: "2rem" }}>
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align={_align}>
                <Label>Comuna</Label>
              </TableCell>
              <TableCell align="left">
                {comunasQuery.status === "success" ? (
                  <div className="comuna-input">
                    <Campo
                      id="standard-select-currency-native"
                      select
                      placeholder="Comuna"
                      variant="standard"
                      style={{
                        transform: "translateY(14%)",
                        paddingRight: "2rem",
                      }}
                      name="comuna"
                      autoComplete="off"
                      SelectProps={{
                        native: true,
                      }}
                      value={metadata.commune.name}
                      onChange={(e) =>
                        dispatch({
                          type: "metadata",
                          fieldName: "commune",
                          payLoad: e.currentTarget.value,
                        })
                      }>
                      {metadata.commune.name === "" && <option hidden></option>}
                      <option value={JSON.stringify(metadata.commune)}>
                        {metadata.commune.name}
                      </option>
                      {comunas.map((comuna, index) => {
                        return (
                          <option
                            key={comuna + index}
                            value={JSON.stringify(comuna)}>
                            {comuna.name}
                          </option>
                        );
                      })}
                    </Campo>
                    <Campo
                      id="standard-select-currency-native"
                      placeholder="Mantenedor"
                      label="Mantenedor"
                      disabled
                      variant="standard"
                      style={{
                        transform: "translateY(-18%)",
                      }}
                      name="comuna"
                      autoComplete="off"
                      SelectProps={{
                        native: true,
                      }}
                      value={
                        metadata.commune.name !== ""
                          ? metadata.commune.maintainer == null
                            ? "Comuna sin mantenedor"
                            : metadata.commune.maintainer.name
                          : ""
                      }></Campo>
                  </div>
                ) : (
                  <Loading />
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row" align={_align}>
                <Label
                  style={{ paddingTop: "0.8rem", paddingBottom: "0.8rem" }}>
                  Última modificación del registro
                </Label>
              </TableCell>
              <TableCell align="left">
                {date_format(metadata.status_date) ||
                  "Información no disponible"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row" align={_align}>
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
              <TableCell component="th" scope="row" align={_align}>
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
              <TableCell component="th" scope="row" align={_align}>
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
              <TableCell component="th" scope="row" align={_align}>
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
