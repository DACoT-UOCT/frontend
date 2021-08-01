import React, { useEffect, useState, useContext } from "react";
import { Table as TableReactstrap } from "reactstrap";
import { GQLclient, StateContext as GlobalContext } from "../App";
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
import { createCompany, deleteCompany } from "../../GraphQL/Mutations";

const Campo = styled(TextField)({
  width: "100%",
  background: "none",
  display: "flex",
  justifyContent: "center",
});

const CrudEmpresas = (props) => {
  const global_state = useContext(GlobalContext);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const [empresas, setEmpresas] = useState([]);
  const history = useHistory();

  const companiesQuery = useQuery(GetCompanies, (data) => {
    setEmpresas(
      data.companies.map((empresa) => {
        return empresa.name;
      })
    );
  });

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

  const desabilitar_empresa = () => {
    GQLclient.request(deleteCompany, { data: { name: newCompany } })
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
    <>
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
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa) => {
            return (
              <tr>
                <td> {empresa}</td>
                <td>
                  <Button
                    onClick={() => {
                      //   dispatch({ type: "editar", payLoad: usuario });
                      setNewCompany(empresa);
                      setDeleteOpen(true);
                    }}>
                    Desabilitar empresa
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
                      id="standard"
                      label=""
                      variant="standard"
                      name="otu-serie"
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
      <PopUp
        title={"¿Desabilitar empresa?"}
        open={deleteOpen}
        setOpen={setDeleteOpen}>
        <>
          <div className={styles.buttonsGroup}>
            <h5>{"¿Desea desabilitar la empresa " + newCompany + "?"}</h5>
          </div>
          <div className={styles.buttonsGroup}>
            <Button onClick={() => setDeleteOpen(false)}>Cancelar</Button>
            <Button color="danger" onClick={desabilitar_empresa}>
              Desabilitar
            </Button>
          </div>
        </>
      </PopUp>
    </>
  );
};

export default CrudEmpresas;
