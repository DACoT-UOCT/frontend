import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button } from "reactstrap";
import { createController } from "../../GraphQL/Mutations";
import { GQLclient } from "../App";
import { useHistory } from "react-router-dom";
import { GetCompanies } from "../../GraphQL/Queries";

//POPUP EN PANEL DE ADMINISTRACION, PARA REGISTRAR UN NUEVO CONTROLADOR
const NuevoControlador = (props) => {
  const controladores = props.controladores;
  const state = props.state;
  const dispatch = props.dispatch;
  const [marcas, setMarcas] = useState(new Set());
  const [modelos, setModelos] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (marcas.size === 0) get_marcas();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const get_marcas = () => {
    GQLclient.request(GetCompanies)
      .then((data) => setMarcas(data.companies.map((empresa) => empresa.name)))
      .catch((err) => {
        alert("Error al consultar marcas");
      });
  };
  const get_modelos = () => {
    var modelos = Array.from(controladores).filter(
      (controlador) => controlador.company.name === state.marca
    );

    if (modelos.length === 0) {
      setModelos([]);
    } else {
      var modelos_name = modelos.map((model) => model.model);
      setModelos(new Set(modelos_name));
    }
  };

  const registrar_boton = () => {
    setLoading(true);
    if (
      state.marca === "" ||
      state.model === "" ||
      state.firmwareVersion === "" ||
      state.checksum === ""
    ) {
      alert("Favor de rellenar todos los campos");
      return;
    }

    GQLclient.request(createController, {
      data: {
        company: state.marca,
        model: state.model,
        firmwareVersion: state.firmwareVersion,
        checksum: state.checksum,
      },
    })
      .then((response) => {
        alert("Controlador registrado");
        // setLoading(false);
        history.go(0);
        props.setOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("Error en el envio");
      });
  };

  return (
    <div style={{ width: 300 }}>
      <p>
        Puede registrar nuevas marcas, modelos y versiones, o elegir entre las
        opciones existentes.
      </p>
      {/* <p>{"Marca" + state.marca}</p> */}
      <TextField
        id="standard-select-currency-native"
        select
        label="Modelo"
        variant="standard"
        name="modelo"
        autoComplete="off"
        SelectProps={{
          native: true,
        }}
        value={state.marca || ""}
        onBlur={(e) => get_modelos()}
        onChange={(e) =>
          dispatch({
            type: "marca",
            payLoad: e.currentTarget.value.toUpperCase(),
          })
        }>
        <option hidden></option>
        {Array.from(marcas).map((marca, i) => {
          return <option key={i}>{marca}</option>;
        })}
      </TextField>

      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={Array.from(modelos)}
        value={state.model || ""}
        disableClearable={true}
        autoComplete={false}
        autoSelect={true}
        onChange={(e, value) =>
          dispatch({
            type: "model",
            payLoad: value === null ? "" : String(value).toUpperCase(),
          })
        }
        onInputChange={(e, value) =>
          dispatch({
            type: "model",
            payLoad: value === null ? "" : String(value).toUpperCase(),
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Modelo"
            margin="normal"
            variant="outlined"
          />
        )}
      />

      <TextField
        label="Versión"
        variant="outlined"
        margin="normal"
        value={state.firmwareVersion || ""}
        onChange={(e) =>
          dispatch({
            type: "firmwareVersion",
            payLoad: e.currentTarget.value.toUpperCase(),
          })
        }></TextField>
      <TextField
        label="Checksum"
        variant="outlined"
        margin="normal"
        value={state.checksum || ""}
        onChange={(e) =>
          dispatch({
            type: "checksum",
            payLoad: e.currentTarget.value.toUpperCase(),
          })
        }></TextField>
      <Button
        disabled={loading}
        onClick={() => {
          registrar_boton();
        }}>
        Registrar controlador
      </Button>
    </div>
  );
};

export default NuevoControlador;
