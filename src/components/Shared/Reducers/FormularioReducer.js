export const initialState = {
  oid: "X",
  metadata: {
    status: "NEW",
    commune: { name: "" },
    // region: "Región Metropolitana de Santiago",
    img: null,
    pdf_data: null,
    pedestrian_demand: false,
    pedestrian_facility: false,
    local_detector: false,
    scoot_detector: false,
  },
  otu: {
    metadata: {
      serial: "",
      ip_address: "",
      netmask: "",
      control: 0,
      answer: 0,
      link_type: "", //Digital Analogo
      link_owner: "", //Propio Compartido
    },

    junctions: [
      {
        jid: "",
        metadata: {
          location: {
            type: "Point",
            coordinates: null,
          },
          address_reference: "",
          use_default_vi4: true,
        },
        phases: ["", ""],
        intergreens: [],
        plans: [],
        sequence: [],
      },
    ],
    programs: [],
  },
  controller: {
    gps: false,
    model: {
      company: { name: "" },
      model: "",
      firmware_version: "",
      checksum: "",
    },
  },
  headers: [
    //StringField(choices=['L1', 'L2A', 'L2B', 'L2C', 'L3A', 'L3B', 'L4', 'L5', 'L6', 'Peatonal', 'Ciclista'])
    {
      hal: 0,
      led: 0,
      type: "L1",
    },
    {
      hal: 0,
      led: 0,
      type: "L2A",
    },
    {
      hal: 0,
      led: 0,
      type: "L2B",
    },
    {
      hal: 0,
      led: 0,
      type: "L2C",
    },
    {
      hal: 0,
      led: 0,
      type: "L3A",
    },
    {
      hal: 0,
      led: 0,
      type: "L3B",
    },
    {
      hal: 0,
      led: 0,
      type: "L3C",
    },
    {
      hal: 0,
      led: 0,
      type: "L4A",
    },
    {
      hal: 0,
      led: 0,
      type: "L4B",
    },
    {
      hal: 0,
      led: 0,
      type: "L4C",
    },
    {
      hal: 0,
      led: 0,
      type: "L5",
    },
    {
      hal: 0,
      led: 0,
      type: "L6",
    },
    {
      hal: 0,
      led: 0,
      type: "L7",
    },
    {
      hal: 0,
      led: 0,
      type: "L8",
    },
    {
      hal: 0,
      led: 0,
      type: "L9",
    },
    {
      hal: 0,
      led: 0,
      type: "L10",
    },
  ],

  poles: {
    hooks: 0,
    vehicular: 0,
    pedestrian: 0,
  },
  observation:
    "REGISTRAR OBSERVACIONES DE INTERÉS \nSolicitud de integración ingresada desde el sistema DACoT",

  errors: [],
  vista: 1,
  submit: false,
  isLoading: true,
  success: false,
};

const ups_initial = {
  brand: "",
  model: "",
  serial: "",
  capacity: "",
  charge_duration: "",
};

export function reducer(draft, action) {
  switch (action.type) {
    case "onMount": {
      return;
    }

    case "oid": {
      for (var i = 0; i < draft.otu.junctions.length; i++) {
        draft.otu.junctions[i].jid =
          "J" +
          action.payLoad
            .slice(1, 6)
            .replace(/\s/g, "")
            .replace(/[^0-9]/g, "") +
          (i + 1).toString();
      }
      draft.oid =
        "X" +
        action.payLoad
          .slice(1, 7)
          .replace(/\s/g, "")
          .replace(/[^0-9]/g, "");
      return;
    }

    case "ups_checkbox": {
      if (draft.ups === undefined) {
        if (draft.ups_backup === undefined) draft.ups = ups_initial;
        else draft.ups = draft.ups_backup;
      } else {
        draft.ups_backup = JSON.parse(JSON.stringify(draft.ups));
        delete draft["ups"];
      }
      return;
    }
    case "metadata": {
      if (action.fieldName === "commune") {
        draft.metadata.commune = JSON.parse(action.payLoad);
        return;
      }
      draft[action.type][action.fieldName] = action.payLoad;
      return;
    }

    case "otu_metadata": {
      draft.otu.metadata[action.fieldName] = action.payLoad;
      return;
    }
    case "enviar":
      draft.submit = true;
      return;

    case "enviado":
      draft.submit = false;
      return;

    case "reset": {
      draft.vista = 1;
      return;
    }
    case "siguiente": {
      if (draft.errors.length === 0) {
        if (draft.vista === 4) {
          draft.submit = true;
        }
        // document.getElementById("formulario").scrollTop = 0;
        draft.vista += 1;
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 200);
      }
      return;
    }

    case "atras": {
      draft.vista -= 1;
      draft.submit = false;
      document.getElementById("formulario").scrollTop = 0;
      return;
    }

    case "reset_errores": {
      draft.errors = [];
      return;
    }
    case "error": {
      if (!draft.errors.includes(action.payLoad))
        draft.errors.push(action.payLoad);
      return;
    }

    case "post_success": {
      draft.success = true;
      draft.isLoading = false;
      return;
    }
    case "post_error": {
      draft.success = false;
      draft.isLoading = false;
      return;
    }

    case "junctions": {
      if (action.fieldName === "address_reference") {
        draft.otu[action.type][action.index].metadata.address_reference =
          action.address;
        draft.otu[action.type][action.index].metadata.location.coordinates =
          action.coordinates;
      } else {
        draft.otu[action.type][action.index][action.fieldName] = action.payLoad;
      }
      return;
    }

    case "agregar_junction": {
      const name =
        "J" +
        draft.oid.slice(1, 6) +
        (draft.otu.junctions.length + 1).toString();
      const nuevo = JSON.parse(JSON.stringify(initialState)).otu.junctions[0];
      nuevo.jid = name;
      draft.otu.junctions.push(nuevo);
      return;
    }

    case "eliminar_junction": {
      //CHECKED
      draft.otu.junctions.pop();
      return;
    }

    case "controller": {
      draft.controller[action.fieldName] = action.payLoad;
      return;
    }

    case "controller_model": {
      if (action.fieldName === "company") {
        draft.controller.model[action.fieldName].name = action.payLoad;
        draft.controller.model.model = "";
        draft.controller.model.firmware_version = "";
        draft.controller.model.checksum = "";
      } else if (action.fieldName === "model") {
        draft.controller.model[action.fieldName] = action.payLoad;
        draft.controller.model.firmware_version = "";
        // draft.controller.model.date = "";
        draft.controller.model.checksum = "";
      } else if (action.fieldName === "firmware_version") {
        draft.controller.model[action.fieldName] = action.payLoad;
        for (let i = 0; i < action.controladores.length; i++) {
          if (
            draft.controller.model.company.name ===
              action.controladores[i].company.name &&
            draft.controller.model.model === action.controladores[i].model &&
            draft.controller.model.firmware_version ===
              action.controladores[i].firmware_version
          ) {
            draft.controller.model.checksum = action.controladores[i].checksum;
          }
        }
      }
      return;
    }

    case "poles": {
      draft.poles[action.fieldName] = action.payLoad;
      return;
    }

    case "otu": {
      draft.metadata.otu[action.fieldName] = action.payLoad;
      return;
    }

    case "equipamiento": {
      draft.metadata.otu.equipamientos[action.index][action.fieldName] =
        action.payLoad;
      return;
    }

    case "ups": {
      draft.ups[action.fieldName] = action.payLoad;
      return;
    }

    case "header": {
      //CHECK
      draft.headers[action.index][action.fieldName] = parseInt(action.payLoad);
      return;
    }

    case "stage": {
      if (action.fieldName === 0) {
        draft.otu.stages[action.index][action.fieldName] = action.payLoad
          .replace(/\s/g, "")
          .replace(/[^a-zA-Z]/g, "");
      } else {
        draft.otu.stages[action.index][action.fieldName] = action.payLoad;
      }
      return;
    }

    case "upload_PDF": {
      draft.metadata.pdf_data = action.payLoad;
      return;
    }

    case "upload_imagen_cruce": {
      draft.metadata.img = action.payLoad;
      return;
    }

    case "upload_bits_de_control": {
      draft.metadata.control = action.payLoad;
      return;
    }

    case "fase_backspace": {
      if (action.keyCode === 8 && draft.otu.fases[action.index].length > 0) {
        draft.otu.fases[action.index] = draft.otu.fases[action.index].slice(
          0,
          -1
        );
      }
      return;
    }

    case "agregar_fase": {
      draft.otu.junctions[action.junction_index].phases.push("");
      return;
    }

    case "eliminar_fase": {
      draft.otu.junctions[action.junction_index].phases.pop();
      return;
    }

    case "fase_input": {
      draft.otu.junctions[action.junction_index].phases[action.phase_index] =
        action.payLoad;
      return;
    }

    case "junction_address": {
      draft.otu.junctions[action.junction_index].metadata.address_reference =
        action.payLoad;
      return;
    }

    case "entreverde_vehicular_default": {
      draft.otu.junctions[action.junction_index].metadata.use_default_vi4 =
        action.payLoad;
      return;
    }

    case "secuencia_backspace": {
      if (
        action.keyCode === 8 &&
        draft.otu.secuencias[action.index].length > 0
      ) {
        draft.otu.secuencias[action.index] = draft.otu.secuencias[
          action.index
        ].slice(0, -1);
      }
      return;
    }
    case "secuencia": {
      const lista = action.payLoad
        .replace(/\s/g, "")
        .replace(/[^0-9-]/g, "")
        .split("-");

      draft.otu.secuencias[action.index] = lista.map(Number);
      return;
    }

    case "agregar_secuencia": {
      draft.otu.secuencias.push([]);
      return;
    }

    case "eliminar_secuencia": {
      draft.otu.secuencias.pop();
      return;
    }

    case "entreverde": {
      draft.otu.entreverdes[action.index_fila][action.index_col] = parseInt(
        action.payLoad.replace(/\D/, "")
      );
      return;
    }

    case "entreverde_clear": {
      if (draft.otu.entreverdes[action.index_fila][action.index_col] === 0) {
        draft.otu.entreverdes[action.index_fila][action.index_col] = "";
      }
      return;
    }

    case "observation": {
      draft.observation = action.payLoad;
      return;
    }

    case "importar_excel": {
      draft.otu.stages = action.payLoad.stages;
      draft.otu.fases = action.payLoad.fases;
      draft.otu.secuencias = action.payLoad.secuencias;
      draft.otu.entreverdes = action.payLoad.entreverdes;
      return;
    }

    default:
      return;
  }
}
