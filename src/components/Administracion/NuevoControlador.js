import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button } from "reactstrap";
import { List } from "@material-ui/core";

const NuevoControlador = (props) => {
  const controladores = props.controladores;
  const state = props.state;
  const dispatch = props.dispatch;
  const [marcas, setMarcas] = useState(new Set());
  const [modelos, setModelos] = useState(new Set());

  useEffect(() => {
    if (marcas.size == 0) get_marcas();
  });

  const get_marcas = () => {
    controladores.map((controlador) => {
      setMarcas(marcas.add(controlador.company));
    });
  };
  const get_modelos = () => {
    console.log("obteniendo modelos");

    var modelos = Array.from(controladores).filter(
      (controlador) => controlador.company === state.marca
    );

    if (modelos.length === 0) {
      setModelos([]);
    } else {
      var modelos_name = modelos[0].models.map((model) => model.name);
      setModelos(new Set(modelos_name));
    }
  };

  const registrar_boton = () => {
    console.log("checkeando campos");
    console.log("enviando");
    //respuesta del server
    //cerrar popup
  };

  return (
    <div style={{ width: 300 }}>
      <p>Puede registrar nuevas marcas, modelos y versiones</p>
      {/* <p>{"Marca" + state.marca}</p> */}
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={Array.from(marcas)}
        value={state.marca}
        disableClearable={true}
        autoComplete={true}
        autoSelect={true}
        onBlur={(e) => get_modelos()}
        onChange={(e, value) =>
          dispatch({
            type: "marca",
            payLoad: value === null ? "" : String(value).toUpperCase(),
          })
        }
        onInputChange={(e, value) =>
          dispatch({
            type: "marca",
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
            label="Marca"
            margin="normal"
            variant="outlined"
          />
        )}
      />

      {/* <p>{"Modelo" + state.modelo}</p> */}
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={Array.from(modelos)}
        value={state.modelo}
        disableClearable={true}
        autoComplete={true}
        autoSelect={true}
        onChange={(e, value) =>
          dispatch({
            type: "modelo",
            payLoad: value === null ? "" : String(value).toUpperCase(),
          })
        }
        onInputChange={(e, value) =>
          dispatch({
            type: "modelo",
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
        value={state.version}
        onChange={(e) =>
          dispatch({
            type: "version",
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
