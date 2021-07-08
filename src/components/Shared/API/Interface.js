import { reducer, initialState } from "../Reducers/FormularioReducer";
import decamelizeKeysDeep from "decamelize-keys-deep";
import camelcaseKeysDeep from "camelcase-keys-deep";
import { GQLclient } from "../../App";

//Interfaz de comunicacion entre la api y el frontend

export const procesar_json_recibido = (aux) => {
  //procesa el json consultado para mostrarlo en el formulario
  // var temp = JSON.parse(JSON.stringify(props.state.actualizando));
  var temp = decamelizeKeysDeep(aux);

  // temp.metadata.commune.maintainer =
  //   temp.metadata.commune.maintainer == null
  //     ? "Comuna sin mantenedor"
  //     : temp.metadata.commune.maintainer.name;
  if (temp.ups == null) {
    delete temp.ups;
  }
  temp.metadata.installation_date = temp.metadata.installation_date
    ? Date.parse(temp.metadata.installation_date)
    : Date.now();

  temp.metadata.installation_company =
    temp.metadata.installation_company == null
      ? "Sin asignar"
      : temp.metadata.installation_company.name;

  temp.metadata.pdf_data =
    temp.metadata.pdf_data.data == null
      ? null
      : temp.metadata.pdf_data.data.slice(2, -1);

  if (temp.poles == undefined) {
    temp.poles = {
      hooks: 0,
      vehicular: 0,
      pedestrian: 0,
    };
  }

  temp.metadata.pedestrian_demand =
    temp.metadata.pedestrian_demand == undefined
      ? false
      : temp.metadata.pedestrian_demand;
  temp.metadata.pedestrian_facility =
    temp.metadata.pedestrian_facility == undefined
      ? false
      : temp.metadata.pedestrian_facility;
  temp.metadata.local_detector =
    temp.metadata.local_detector == undefined
      ? false
      : temp.metadata.local_detector;
  temp.metadata.scoot_detector =
    temp.metadata.scoot_detector == undefined
      ? false
      : temp.metadata.scoot_detector;

  temp.controller = //REVISAR TODO
    temp.controller == undefined
      ? initialState.controller
      : {
          gps:
            temp.controller.gps == undefined
              ? initialState.controller.gps
              : temp.controller.gps,
          model:
            temp.controller.model == undefined
              ? initialState.controller.model
              : temp.controller.model,
        };

  temp.otu.metadata =
    temp.otu.metadata == null
      ? {
          serial: "",
          ip_address: "",
          netmask: "",
          control: 0,
          answer: 0,
          link_type: "",
          link_owner: "",
        }
      : {
          serial:
            temp.otu.metadata.serial == undefined
              ? ""
              : temp.otu.metadata.serial,
          ip_address:
            temp.otu.metadata.ip_address == undefined
              ? ""
              : temp.otu.metadata.ip_address,
          netmask:
            temp.otu.metadata.netmask == undefined
              ? ""
              : temp.otu.metadata.netmask,
          control:
            temp.otu.metadata.control == undefined
              ? 0
              : temp.otu.metadata.control,
          answer:
            temp.otu.metadata.answer == undefined
              ? 0
              : temp.otu.metadata.answer,
          link_type:
            temp.otu.metadata.link_type == undefined
              ? ""
              : temp.otu.metadata.link_type,
          link_owner:
            temp.otu.metadata.link_owner == undefined
              ? ""
              : temp.otu.metadata.link_owner,
        };

  temp.headers =
    temp.headers == undefined
      ? initialState.headers
      : temp.headers.length == 0
      ? initialState.headers
      : temp.headers;

  temp.metadata.img =
    temp.metadata.img.data == null
      ? "/no_image.png"
      : "data:image/png;base64," + temp.metadata.img.data.slice(2, -1);

  temp.observation = temp.observation.message;

  //variables de control
  temp.errors = [];
  temp.vista = 1;
  temp.submit = false;
  temp.isLoading = true;
  temp.success = false;
  return temp;
};

export const procesar_json_envio = (state_copy, url) => {
  //procesa el json antes de envio
  //state_copy.metadata.status_user = props.state.email;
  // if (url == "/nuevo/solicitud-actualizacion") {
  //   //SI SE ESTA LEVANTANDO UNA SOLICITUD DE ACTUALIZACION
  //   state_copy.metadata.status = "UPDATE";
  // }

  if (
    url == "/editar/instalacion" ||
    url == "/nuevo/solicitud-actualizacion" ||
    url == "/editar/info-programaciones"
  ) {
    //SI EL ADMIN O UN FUNCIONARIO UOCT ESTA EDITANDO DIRECTAMENTE
    state_copy.status = "UPDATE";
  } else if (
    url == "/nuevo/digitalizacion" ||
    url == "/nuevo/solicitud-integracion"
  ) {
    state_copy.status = "NEW";
  }

  if (state_copy.otu.programs.length == 0) {
    delete state_copy.otu.programs;
  }
  for (let i = 0; i < state_copy.otu.junctions.length; i++) {
    if (state_copy.otu.junctions[i].intergreens.length == 0)
      delete state_copy.otu.junctions[i].intergreens;
    if (state_copy.otu.junctions[i].plans.length == 0)
      delete state_copy.otu.junctions[i].plans;
    if (state_copy.otu.junctions[i].sequence.length == 0)
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

  var temp = new Date(state_copy.metadata.installation_date);
  state_copy.metadata.installation_date =
    temp.getFullYear() +
    "-" +
    ("0" + (temp.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + temp.getDate()).slice(-2);
  // return string;

  //SE ENVIA EL CÓDIGO DE LA COMUNA, NO EL NOMBRE
  state_copy.metadata.commune = state_copy.metadata.commune.code;

  // if (state_copy.metadata.maintainer == null) {
  //   state_copy.metadata.maintainer = "SpeeDevs";
  // }
  // delete state_copy.metadata.status;
  // delete state_copy.metadata.status_user;
  // delete state_copy.metadata.status_date;
  delete state_copy.ups_backup;
  //cambios de modelo otu / junction
  // delete state_copy.otu.intergreens;
  // delete state_copy.otu.sequences;

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

  // return JSON.stringify(state_copy);
  return camelcaseKeysDeep(state_copy);
};
