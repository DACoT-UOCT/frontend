import React from "react";
import "../../../App.css";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Campos.module.css";
import { Label } from "reactstrap";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  styled,
} from "@material-ui/core";

//COMPONENTE QUE CONTIENE INFORMACION DE LA OTU, CODIGO, TIPO DE ENLACE, NUMERO DE SERIE
//IP/MASCARA DE RED, NUMERO DE BITS DE CONTROL
const Campo = styled(TextField)({
  background: "none",
});

const OTU = (props) => {
  const otu = props.state;
  const dispatch = props.dispatch;
  const location = useLocation();
  const _align = "right";
  const y_offset = "50%";

  return (
    <>
      <legend className="seccion">OTU</legend>
      <p>
        Ingresar código de 6 dígitos que tendrá la instalación en el sistema,
        terminando en 0 (ej X123450)
      </p>

      <TableContainer className={styles.form} style={{ width: "80%" }}>
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" align={_align}>
                <Label style={{ transform: "translateY(" + y_offset + ")" }}>
                  Código en sistema
                </Label>{" "}
                {/* <PopOver mensaje="Código de 6 dígitos que tendrá la instalación en el sistema, terminando en 0 (ej X001260)" /> */}
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="codig-input"
                  disabled={[
                    "/nuevo/solicitud-actualizacion",
                    "/editar/instalacion",
                  ].includes(location.pathname)}
                  label="Código"
                  name="otu-codigo"
                  autoComplete="off"
                  value={props.oid}
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
              <TableCell component="th" scope="row" align={_align}>
                <Label style={{ transform: "translateY(" + y_offset + ")" }}>
                  Tipo de enlace de comunicación
                </Label>
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
                  value={otu.metadata.link_owner ? otu.metadata.link_owner : ""}
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
                  <option value="Analogo">Análogo</option>
                  <option value="3G">3G</option>
                  <option value="4G">4G</option>
                  <option value="5G">5G</option>
                </Campo>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row" align={_align}>
                <Label style={{ transform: "translateY(" + y_offset + ")" }}>
                  Número de serie OTU
                </Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="n-serie-input"
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
              <TableCell component="th" scope="row" align={_align}>
                <Label style={{ transform: "translateY(" + y_offset + ")" }}>
                  Dirección IP - Máscara de red
                </Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="ip-input"
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
                  id="netmask-input"
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
              <TableCell component="th" scope="row" align={_align}>
                <Label style={{ transform: "translateY(" + y_offset + ")" }}>
                  N° de bits de control y respuesta
                </Label>{" "}
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="control-input"
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
                  id="respuesta-input"
                  label="Respuesta"
                  placeholder="Respuesta"
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
