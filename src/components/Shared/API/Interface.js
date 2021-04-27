import { reducer, initialState } from "../Reducers/FormularioReducer";
import decamelizeKeysDeep from "decamelize-keys-deep";
import camelcaseKeysDeep from "camelcase-keys-deep";

//Interfaz de comunicacion entre la api y el frontend
const comparar_arrays = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

export const procesar_json_recibido = (aux) => {
  //procesa el json consultado para mostrarlo en el formulario
  // var temp = JSON.parse(JSON.stringify(props.state.actualizando));
  // console.log(aux);
  var temp = decamelizeKeysDeep(aux);
  // console.log(temp);
  var stages = [];
  var fases = [];
  var secuencias = [];
  var entreverdes = [];

  for (var i = 0; i < temp.otu.sequences.length; i++) {
    var fasesTemp = temp.otu.sequences[i].phases;
    var seqTemp = [];
    for (var j = 0; j < fasesTemp.length; j++) {
      seqTemp.push(fasesTemp[j].phid);
      var etapasTempList = [];
      var etapasTemp = fasesTemp[j].stages;

      for (var k = 0; k < etapasTemp.length; k++) {
        etapasTempList.push(etapasTemp[k].stid);
        var etapaTemp = [etapasTemp[k].stid, etapasTemp[k].type];
        if (!stages.some((e) => comparar_arrays(e, etapaTemp))) {
          stages.push(etapaTemp);
        }
      }
      if (!fases.some((e) => comparar_arrays(e, etapasTempList))) {
        fases.push(etapasTempList);
      }
    }
    secuencias.push(seqTemp);
  }
  if (fases.length == 0) fases = [[]];
  if (stages.length == 0) stages = ["", ""];

  //entreverdes
  while (temp.otu.intergreens.length)
    entreverdes.push(temp.otu.intergreens.splice(0, stages.length));

  //revisar si algun campo esta vacio

  //eliminar intergreens sequences
  delete temp.otu.intergreens;
  delete temp.otu.sequences;

  if (temp.poles == undefined) {
    temp.poles = {
      hooks: 0,
      vehicular: 0,
      pedestrian: 0,
    };
  }

  temp.metadata.pedestrian_demand =
    temp.pedestrian_demand == undefined
      ? false
      : temp.metadata.pedestrian_demand;
  temp.metadata.pedestrian_facility =
    temp.pedestrian_facility == undefined
      ? false
      : temp.metadata.pedestrian_facility;
  temp.metadata.local_detector =
    temp.local_detector == undefined ? false : temp.metadata.local_detector;
  temp.metadata.scoot_detector =
    temp.scoot_detector == undefined ? false : temp.metadata.scoot_detector;

  temp.controller = //REVISAR TODO
    temp.controller == undefined
      ? {
          address_reference: "",
          gps: false,
          model: {
            company: { name: "" },
            model: "",
            firmware_version: "",
            checksum: "",
            date: "",
          },
        }
      : {
          address_reference:
            temp.controller.address_reference == undefined
              ? "Campo no registrado"
              : temp.controller.address_reference,
          gps: temp.controller.gps == undefined ? false : temp.controller.gps,
          model:
            temp.controller.model == undefined
              ? {
                  company: { name: "" },
                  model: "",
                  firmware_version: "",
                  checksum: "",
                  date: "",
                }
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
    temp.metadata.img.data == null ? "/no_image.png" : temp.metadata.img.data;

  temp.otu.stages = stages;
  temp.otu.fases = fases;
  temp.otu.secuencias = secuencias;
  temp.otu.entreverdes = entreverdes;
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
  // const state_copy = JSON.parse(JSON.stringify(state));
  //agregar status_user
  //state_copy.metadata.status_user = props.state.email;
  if (url == "/nuevo/solicitud-actualizacion") {
    //SI SE ESTA LEVANTANDO UNA SOLICITUD DE ACTUALIZACION
    state_copy.metadata.status = "UPDATE";
  }

  if (url == "/editar/instalacion") {
    //SI EL ADMIN O UN FUNCIONARIO UOCT ESTA EDITANDO DIRECTAMENTE
    state_copy.metadata.status = "UPDATE";
  }

  // state_copy.metadata.maintainer = "AUTER";

  //crear objeto secuencias
  const sequences = [];
  //{ seqid: 1, phases: [{ phid: 1, stages: [{ stid: "A", type: "" }] }] },
  for (var i = 0; i < state_copy.otu.secuencias.length; i++) {
    var secuencia = state_copy.otu.secuencias[i];
    sequences.push({ seqid: i + 1, phases: new Array() });
    for (var j = 0; j < secuencia.length; j++) {
      var fase = secuencia[j];
      sequences[i].phases.push({ phid: parseInt(fase), stages: new Array() });
    }
  }

  sequences.map((secuencia, seqIndex) => {
    secuencia.phases.map((faseSeq, faseSeqIndex) => {
      state_copy.otu.fases.map((faseCpy, faseCpyIndex) => {
        if (faseSeq.phid == faseCpyIndex + 1) {
          //agregar etapas
          for (var i = 0; i < faseCpy.length; i++) {
            for (var j = 0; j < state_copy.otu.stages.length; j++) {
              if (state_copy.otu.stages[j][0] == faseCpy[i]) {
                faseSeq.stages.push({
                  stid: faseCpy[i][0],
                  type: state_copy.otu.stages[j][1],
                });
              }
            }
          }
        }
      });
    });
  });
  state_copy.otu.sequences = sequences;

  //juntar lista entreverdes en intergreens
  var intergreens = [];
  for (var i = 0; i < state_copy.otu.entreverdes.length; i++) {
    var aux = state_copy.otu.entreverdes[i];
    for (var j = 0; j < aux.length; j++) {
      intergreens.push(state_copy.otu.entreverdes[i][j]);
    }
  }
  state_copy.otu.intergreens = intergreens;

  //detalles graphql mutation
  state_copy.controller.model.company =
    state_copy.controller.model.company.name;
  delete state_copy.controller.model.date;
  state_copy.metadata.commune = state_copy.metadata.commune_code;
  delete state_copy.metadata.commune_code;
  if (state_copy.metadata.maintainer == null) {
    state_copy.metadata.maintainer = "SpeeDevs";
  }
  delete state_copy.metadata.status;
  delete state_copy.metadata.status_user;
  delete state_copy.metadata.status_date;
  delete state_copy.ups_backup;

  //eliminar etapas, fases secuencias de frontend
  delete state_copy.otu.stages;
  delete state_copy.otu.fases;
  delete state_copy.otu.secuencias;
  delete state_copy.otu.entreverdes;

  //eliminar variables de control
  delete state_copy.errors;
  delete state_copy.vista;
  delete state_copy.submit;
  delete state_copy.isLoading;
  delete state_copy.success;

  console.log(camelcaseKeysDeep(state_copy));
  // return JSON.stringify(state_copy);
  return JSON.stringify(camelcaseKeysDeep(state_copy));
};
