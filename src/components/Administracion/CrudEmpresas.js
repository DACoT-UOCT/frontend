import React, { useState } from "react";
import { Table as TableReactstrap } from "reactstrap";
import { GQLclient } from "../App";
import { Button } from "reactstrap";
import styles from "./Administracion.module.css";
import PopUp from "../Shared/PopUp";
import { GetCompanies } from "../../GraphQL/Queries";
import { useQuery } from "../../GraphQL/useQuery";
import Loading from "../Shared/Loading";
import sortTable from "../Shared/Utils/SortTable";
import { useHistory } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import {
  createCompany,
  deleteCompany,
  enableCompany,
} from "../../GraphQL/Mutations";
import MotionDiv from "../Shared/MotionDiv";

const Campo = styled(TextField)({
  width: "100%",
  background: "none",
  display: "flex",
  justifyContent: "center",
});

/*Listado de empresas registradas, disponible en panel de administracion
Tambien permite registrar y desabilitar empresas */
const CrudEmpresas = (props) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const [empresas, setEmpresas] = useState([]);
  const history = useHistory();

  const companiesQuery = useQuery(
    GetCompanies,
    (data) => {
      setEmpresas(data.companies);
    },
    { showDisabled: true }
  );

  const try_submit = () => {
    if (newCompany === "") {
      alert("Nombre de empresa vacio");
      return;
    }
    if (empresas.includes(newCompany)) {
      alert("Empresa ya registrada");
      return;
    }

    GQLclient.request(createCompany, { data: { name: newCompany } })
      .then((response) => {
        alert("Cambios guardados");
        history.go(0);
      })
      .catch((err) => {
        alert("Error en el envio");
      });

    setNewOpen(false);
  };

  const enable_disable_company = () => {
    let name = empresas[newCompany].name;
    let disabled = empresas[newCompany].disabled;
    let mutation = disabled ? enableCompany : deleteCompany;
    GQLclient.request(mutation, { data: { name: name } })
      .then((response) => {
        alert("Cambios guardados");
        history.go(0);
      })
      .catch((err) => {
        alert("Error en el envio");
      });
  };

  if (companiesQuery.status === "loading" || companiesQuery.status === "idle") {
    return <Loading />;
  } else if (companiesQuery.status === "error") {
    return (
      <>
        <p>Error en la consulta</p>
      </>
    );
  }

  return (
    <MotionDiv keyProp={empresas}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
          marginTop: "1rem",
        }}>
        <p>Registro y eliminación de empresas </p>
        <Button
          style={{ float: "right" }}
          color="success"
          onClick={() => {
            setNewOpen(true);
            setNewCompany("");
          }}>
          <span>Registrar empresa</span>
        </Button>
      </div>
      <TableReactstrap id="myTable" hover responsive className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => sortTable(0)}>Nombre de la empresa</th>
            <th onClick={() => sortTable(1)}>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa, i) => {
            return (
              <tr key={i}>
                <td> {empresa.name}</td>
                <td> {empresa.disabled ? "Desabilitada" : "Habilitada"}</td>
                <td>
                  <Button
                    color="warning"
                    onClick={() => {
                      setNewCompany(i);
                      setDeleteOpen(true);
                    }}>
                    {empresa.disabled ? "Habilitar" : "Desabilitar"}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </TableReactstrap>
      <PopUp title="Nueva empresa" open={newOpen} setOpen={setNewOpen}>
        <>
          <TableContainer className={styles.popup}>
            <Table size="small" aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="left">
                    <Campo
                      id="nombre-input"
                      label=""
                      variant="standard"
                      autoComplete="off"
                      value={newCompany}
                      onChange={(e) =>
                        setNewCompany(e.currentTarget.value.toUpperCase())
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className={styles.buttonsGroup}>
            <>
              <Button onClick={() => setNewOpen(false)}>Cancelar</Button>
              <Button onClick={try_submit} color="info">
                <span>Guardar cambios</span>
              </Button>
            </>
          </div>
        </>
      </PopUp>

      {empresas[newCompany] && (
        <PopUp
          title={
            empresas[newCompany].disabled
              ? "Habilitar empresa"
              : "Desabilitar empresa"
          }
          open={deleteOpen}
          setOpen={setDeleteOpen}>
          <>
            <div className={styles.buttonsGroup}>
              <h5>
                {"¿Desea " +
                  (empresas[newCompany].disabled
                    ? "habilitar"
                    : "desabilitar") +
                  " la empresa " +
                  empresas[newCompany].name +
                  "?"}
              </h5>
            </div>
            <div className={styles.buttonsGroup}>
              <Button onClick={() => setDeleteOpen(false)}>Cancelar</Button>
              <Button color="warning" onClick={enable_disable_company}>
                {empresas[newCompany].disabled ? "Habilitar" : "Desabilitar"}
              </Button>
            </div>
          </>
        </PopUp>
      )}
    </MotionDiv>
  );
};

export default CrudEmpresas;
