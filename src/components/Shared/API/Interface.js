import { initialState as initial } from "../Reducers/FormularioReducer";
import decamelizeKeys from "@puuuudding/decamelize-keys";
// import decamelizeKeysDeep from "decamelize-keys-deep";
import camelcaseKeysDeep from "camelcase-keys-deep";

//Interfaz de comunicacion entre la api y el frontend para enviar formularios de instalaciones
//notar que el backend trabaja con variables camelcase y el frontend con snake case
const initialState = JSON.parse(JSON.stringify(initial));

export const date_format = (date) => {
  let temp_date = new Date(date);
  return (
    temp_date.getFullYear() +
    "-" +
    ("0" + (temp_date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + temp_date.getDate()).slice(-2)
  );
};

//procesa el json consultado para mostrarlo en el formulario
export const procesar_json_recibido = (aux) => {
  var temp = decamelizeKeys(JSON.parse(JSON.stringify(aux)), { deep: true });

  if (!temp.ups) {
    delete temp.ups;
  }

  temp.metadata.pdf_data = !temp.metadata.pdf_data.data
    ? null
    : temp.metadata.pdf_data.data.slice(2, -1);

  if (!temp.poles) {
    temp.poles = {
      hooks: 0,
      vehicular: 0,
      pedestrian: 0,
    };
  }

  temp.metadata.pedestrian_demand = !temp.metadata.pedestrian_demand
    ? false
    : temp.metadata.pedestrian_demand;
  temp.metadata.pedestrian_facility = !temp.metadata.pedestrian_facility
    ? false
    : temp.metadata.pedestrian_facility;
  temp.metadata.local_detector = !temp.metadata.local_detector
    ? false
    : temp.metadata.local_detector;
  temp.metadata.scoot_detector = !temp.metadata.scoot_detector
    ? false
    : temp.metadata.scoot_detector;

  temp.controller = !temp.controller //REVISAR TODO
    ? initialState.controller
    : {
        gps: !temp.controller.gps
          ? initialState.controller.gps
          : temp.controller.gps,
        model: !temp.controller.model
          ? initialState.controller.model
          : temp.controller.model,
      };

  temp.otu.metadata = temp.otu.metadata
    ? temp.otu.metadata
    : JSON.parse(JSON.stringify(initialState.otu.metadata));

  if (!temp.otu.metadata.control) {
    temp.otu.metadata.control = 0;
  }
  if (!temp.otu.metadata.answer) {
    temp.otu.metadata.answer = 0;
  }
  temp.headers = !temp.headers
    ? initialState.headers
    : temp.headers.length === 0
    ? initialState.headers
    : temp.headers;

  temp.metadata.img = !temp.metadata.img.data
    ? "/no_image.png"
    : "data:image/png;base64," + temp.metadata.img.data.slice(2, -1);

  temp.observation = temp.observation.message;

  var junctions = temp.otu.junctions;
  for (var i = 0; i < junctions.length; i++) {
    if (junctions[i].phases.length === 0) {
      junctions[i].phases = [""];
    }
  }

  //variables de control
  temp.errors = [];
  temp.vista = 1;
  temp.submit = false;
  temp.isLoading = true;
  temp.success = false;
  return temp;
};

//procesa el json antes de envio al backend
export const procesar_json_envio = (state_copy, url) => {
  if (
    url === "/editar/instalacion" ||
    url === "/nuevo/solicitud-actualizacion" ||
    url === "/editar/info-programaciones"
  ) {
    //SI EL ADMIN O UN FUNCIONARIO UOCT ESTA EDITANDO DIRECTAMENTE
    state_copy.status = "UPDATE";
  } else if (
    url === "/nuevo/digitalizacion" ||
    url === "/nuevo/solicitud-integracion"
  ) {
    state_copy.status = "NEW";
  }

  if (state_copy.otu.programs.length === 0) {
    delete state_copy.otu.programs;
  }
  for (let i = 0; i < state_copy.otu.junctions.length; i++) {
    if (state_copy.otu.junctions[i].intergreens.length === 0)
      delete state_copy.otu.junctions[i].intergreens;
    if (state_copy.otu.junctions[i].plans.length === 0)
      delete state_copy.otu.junctions[i].plans;
    if (state_copy.otu.junctions[i].sequence.length === 0)
      delete state_copy.otu.junctions[i].sequence;
  }

  // state_copy.status = state_copy.metadata.status;
  delete state_copy.metadata.status;
  delete state_copy.metadata.version;
  delete state_copy.metadata.status_date;
  delete state_copy.metadata.status_user;

  //detalles graphql mutation
  state_copy.controller.model.company =
    state_copy.controller.model.company.name;
  // delete state_copy.controller.model.date;

  //SE ENVIA EL CÓDIGO DE LA COMUNA, NO EL NOMBRE
  state_copy.metadata.commune = state_copy.metadata.commune.code;
  delete state_copy.ups_backup;

  for (let i = 0; i < state_copy.otu.junctions.length; i++) {
    state_copy.otu.junctions[i].metadata.coordinates =
      state_copy.otu.junctions[i].metadata.location.coordinates;
    delete state_copy.otu.junctions[i].metadata.location;
  }

  //eliminar variables de control
  delete state_copy.errors;
  delete state_copy.vista;
  delete state_copy.submit;
  delete state_copy.isLoading;
  delete state_copy.success;

  return camelcaseKeysDeep(state_copy);
};
