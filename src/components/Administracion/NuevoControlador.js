import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button } from "reactstrap";
import { List } from "@material-ui/core";
import { createController } from "../../GraphQL/Mutations";
import { GQLclient } from "../App";
import { useHistory } from "react-router-dom";

const NuevoControlador = (props) => {
  const controladores = props.controladores;
  const state = props.state;
  const dispatch = props.dispatch;
  const [marcas, setMarcas] = useState(new Set());
  const [modelos, setModelos] = useState(new Set());
  const history = useHistory();

  useEffect(() => {
    if (marcas.size == 0) get_marcas();
  });

  const get_marcas = () => {
    controladores.map((controlador) => {
      setMarcas(marcas.add(controlador.company.name));
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
    if (
      state.marca == "" ||
      state.model == "" ||
      state.firmwareVersion == "" ||
      state.checksum == ""
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
        history.go(0);
        props.setOpen(false);
      })
      .catch((err) => {
        alert("Error en el envio");
      });
    //respuesta del server
    //cerrar popup
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
        value={state.marca}
        onBlur={(e) => get_modelos()}
        onChange={(e) =>
          dispatch({
            type: "marca",
            payLoad: e.currentTarget.value.toUpperCase(),
          })
        }>
        <option hidden></option>
        {Array.from(marcas).map((marca) => {
          return <option>{marca}</option>;
        })}
      </TextField>

      {/* <p>{"Modelo" + state.modelo}</p> */}
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={Array.from(modelos)}
        value={state.model}
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
        //   inputValue={inputValue}
        //   onInputChange={(event, newInputValue) => {
        //     setInputValue(newInputValue);
        //   }}
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
        value={state.firmwareVersion}
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
        value={state.checksum}
        onChange={(e) =>
          dispatch({
            type: "checksum",
            payLoad: e.currentTarget.value.toUpperCase(),
          })
        }></TextField>
      <Button
        onClick={() => {
          registrar_boton();
        }}>
        Registrar controlador
      </Button>
    </div>
  );
};

export default NuevoControlador;
