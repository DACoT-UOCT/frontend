import React from "react";
import "../../../App.css";
import "react-datepicker/dist/react-datepicker.css";
import PopOver from "../../Shared/PopOver";
import DatePicker from "react-datepicker";
import styles from "./Campos.module.css";
import { Label } from "reactstrap";
import { useLocation } from "react-router-dom";

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

const OTU = (props) => {
  const otu = props.state;
  const dispatch = props.dispatch;
  const location = useLocation();

  return (
    <>
      <legend className="seccion">OTU</legend>

      <TableContainer className={styles.form}>
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Código en sistema</Label>{" "}
                <PopOver mensaje="Código de 6 dígitos que tendrá la instalación en el sistema (ej X001260)" />
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  disabled={[
                    "/actualizar/instalacion",
                    "/editar/instalacion",
                  ].includes(location.pathname)}
                  label="Código"
                  name="otu-codigo"
                  autoComplete="off"
                  value={otu.oid}
                  onChange={(e) =>
                    dispatch({
                      type: "oid",
                      payLoad: e.currentTarget.value.toUpperCase(),
                    })
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Tipo de enlace</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard-select-currency-native"
                  select
                  label="Tipo de Enlace"
                  variant="standard"
                  name="enlace_pc"
                  autoComplete="off"
                  SelectProps={{
                    native: true,
                  }}
                  value={
                    otu.metadata.link_owner !== ""
                      ? otu.metadata.link_owner
                      : ""
                  }
                  onChange={(e) => {
                    dispatch({
                      type: "otu_metadata",
                      fieldName: "link_owner",
                      payLoad: e.currentTarget.value,
                    });
                  }}>
                  <option value="" hidden></option>
                  <option value="Propio">Propio</option>
                  <option value="Compartido">Compartido</option>
                </Campo>{" "}
                <Campo
                  id="standard-select-currency-native"
                  select
                  label="Tipo de Enlace"
                  variant="standard"
                  name="enlace_pc"
                  autoComplete="off"
                  SelectProps={{
                    native: true,
                  }}
                  value={
                    otu.metadata.link_type !== "" ? otu.metadata.link_type : ""
                  }
                  onChange={(e) => {
                    dispatch({
                      type: "otu_metadata",
                      fieldName: "link_type",
                      payLoad: e.currentTarget.value,
                    });
                  }}>
                  <option value="" hidden></option>
                  <option value="Digital">Digital</option>
                  <option value="Analogo">Analogo</option>
                </Campo>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Número de serie OTU</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  label="N° Serie"
                  variant="standard"
                  name="otu-serie"
                  autoComplete="off"
                  value={otu.metadata.serial !== "" ? otu.metadata.serial : ""}
                  onChange={(e) =>
                    dispatch({
                      type: "otu_metadata",
                      fieldName: "serial",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Dirección IP - Máscara de red</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  label="Dirección IP"
                  variant="standard"
                  name="otu-ip"
                  autoComplete="off"
                  value={
                    otu.metadata.ip_address !== ""
                      ? otu.metadata.ip_address
                      : ""
                  }
                  onChange={(e) =>
                    dispatch({
                      type: "otu_metadata",
                      fieldName: "ip_address",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />{" "}
                <Campo
                  id="standard"
                  label="Mascara de Red"
                  variant="standard"
                  name="otu-netmask"
                  autoComplete="off"
                  value={
                    otu.metadata.netmask !== "" ? otu.metadata.netmask : ""
                  }
                  onChange={(e) =>
                    dispatch({
                      type: "otu_metadata",
                      fieldName: "netmask",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Bits de control y respuesta</Label>{" "}
                <PopOver mensaje="Ingresar cantidad de bits" />
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  label="Control"
                  variant="standard"
                  type="number"
                  name="otu-control"
                  autoComplete="off"
                  value={otu.metadata.control}
                  onChange={(e) =>
                    dispatch({
                      type: "otu_metadata",
                      fieldName: "control",
                      payLoad: parseInt(
                        e.currentTarget.value.replace(/\D/, "")
                      ),
                    })
                  }
                />{" "}
                <Campo
                  id="standard"
                  label="Respuesta"
                  variant="standard"
                  type="number"
                  name="otu-respuesta"
                  autoComplete="off"
                  value={otu.metadata.answer}
                  onChange={(e) =>
                    dispatch({
                      type: "otu_metadata",
                      fieldName: "answer",
                      payLoad: parseInt(
                        e.currentTarget.value.replace(/\D/, "")
                      ),
                    })
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

export default React.memo(OTU);
