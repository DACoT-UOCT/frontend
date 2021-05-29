import React, { useState, useContext } from "react";
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
import { useQuery } from "../../../GraphQL/useQuery";
import { GetCommunes, GetCompanies } from "../../../GraphQL/Queries";
import Loading from "../../Shared/Loading";
import { StateContext } from "../../App";

const Campo = styled(TextField)({
  background: "none",
});

const General = (props) => {
  const metadata = props.state;
  const dispatch = props.dispatch;
  const [comunas, setComunas] = useState([]);
  const [companies, setCompanies] = useState([]);
  const global_context = useContext(StateContext);
  const comunasQuery = useQuery(GetCommunes, (data) => {
    setComunas(data.communes);
  });
  const empresasQuery = useQuery(GetCompanies, (data) => {
    console.log(data);
    setCompanies(
      data.companies.map((company) => {
        return company.name;
      })
    );
  });

  return (
    <>
      <legend className="seccion">Información general del proyecto</legend>
      <h6>
        Los siguientes campos son requeridos para el registro de nuevas
        instalaciones.
        {global_context.rol == "Personal UOCT" &&
          "Al ingresar los datos con una cuenta UOCT, estos quedarán guardados sin revisiones posteriores. Para instalaciones antiguas con información faltante en este sistema, se recomienda mantener los campos de imagen de cruce, modelo de controlador, etapas y entreverdes vehiculares actualizados."}
      </h6>
      <TableContainer className={styles.form}>
        <Table size="small" aria-label="simple table">
          <TableBody>
            {/* <TableRow>
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
              </TableRow> */}

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Comuna</Label>
              </TableCell>
              <TableCell align="left">
                {comunasQuery.status == "success" ? (
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
                    {comunas.map((comuna) => {
                      return (
                        <option value={JSON.stringify(comuna)}>
                          {comuna.name}
                        </option>
                      );
                    })}
                  </Campo>
                ) : (
                  <Loading />
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Empresa instaladora</Label>
              </TableCell>
              <TableCell align="left">
                {empresasQuery.status == "success" ? (
                  <Campo
                    id="standard-select-currency-native"
                    select
                    label="Instalador"
                    variant="standard"
                    name="instalador"
                    autoComplete="off"
                    SelectProps={{
                      native: true,
                    }}
                    value={metadata.installation_company}
                    onChange={(e) =>
                      dispatch({
                        type: "metadata",
                        fieldName: "installation_company",
                        payLoad: e.currentTarget.value,
                      })
                    }>
                    <option hidden></option>
                    <option value={metadata.installation_company}>
                      {metadata.installation_company}
                    </option>
                    {companies.map((company) => {
                      return <option value={company}>{company}</option>;
                    })}
                  </Campo>
                ) : (
                  <Loading />
                )}
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
                    metadata.installation_date == undefined
                      ? Date.now()
                      : metadata.installation_date
                  }
                  onChange={(date) =>
                    dispatch({
                      type: "metadata",
                      fieldName: "installation_date",
                      payLoad: date,
                    })
                  }
                />
                {metadata.installation_date == undefined && (
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
