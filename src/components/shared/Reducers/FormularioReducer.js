export const initialState = {
  metadata: {
    version: "base",
    maintainer: "",
    status: "NEW",
    status_date: { $date: Date.now() },
    status_user: "",
    installation_date: { $date: Date.now() },
    commune: "",
    region: "",
    img: null,
    pdf_data: null,
    pedestrian_demand: false,
    pedestrian_facility: false,
    local_detector: false,
    scoot_detector: false,
  },
  otu: {
    oid: "X",
    metadata: {
      serial: "",
      ip_address: "",
      netmask: "",
      control: 0,
      answer: 0,
      link_type: "", //Digital Analogo
      link_owner: "", //Propio Compartido
    },
    //program: "", asignado al leer desde el SC
    stages: [
      ["", ""],
      // "A", "VEH",
    ],

    fases: [[]],

    secuencias: [[]], //[[1,2,3], "J003672"]
    entreverdes: [[0]],
    // sequences: [
    //   { seqid: 1, phases: [{ phid: 1, stages: [{ stid: "A", type: "" }] }] }, //tipos de etapa, 'Vehicular', 'Peatonal', 'Flecha Verde', 'Ciclista', 'No Configurada'
    // ],
    // intergreens: [], //lista de listas unidimensional
    junctions: [
      {
        jid: "",
        metadata: { location: "pointField", address_reference: "" },
        //plans: "",  //se asignan cuando se lee el SC
      },
    ],
  },
  controller: {
    address_reference: "",
    gps: false,
    model: {
      company: { name: "" },
      model: "",
      firmware_version: "",
      checksum: "",
      date: { $date: "" },
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
      type: "L7 Peatonal",
    },
    {
      hal: 0,
      led: 0,
      type: "L8 Biciclos",
    },
    {
      hal: 0,
      led: 0,
      type: "L9 Buses",
    },
    {
      hal: 0,
      led: 0,
      type: "L10 Repetidora",
    },
  ],

  poles: {
    hooks: 0,
    vehicular: 0,
    pedestrian: 0,
  },
  observations: "",

  errors: [],
  vista: 2,
  submit: false,
  isLoading: true,
};

const ups = {
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
      //CHECK
      for (var i = 0; i < draft.otu.junctions.length; i++) {
        draft.otu.junctions[i].jid =
          "J" + action.payLoad.slice(1, 6) + (i + 1).toString();
      }
      draft.otu.oid = "X" + action.payLoad.slice(1, 7);
      return;
    }

    case "ups_checkbox": {
      if (draft.ups === undefined) {
        draft.ups = ups;
      } else {
        delete draft["ups"];
      }
      return;
    }
    case "metadata": {
      if (action.fieldName === "installation_date") {
        draft[action.type][action.fieldName].$date = action.payLoad;
      } else {
        draft[action.type][action.fieldName] = action.payLoad;
      }
      return;
    }

    case "otu_metadata": {
      draft.otu.metadata[action.fieldName] = action.payLoad;
      return;
    }
    case "enviar":
      draft.submit = true;
      return;

    case "reset": {
      draft.vista = 1;
      return;
    }
    case "siguiente": {
      if (draft.errors.length === 0) {
        if (draft.vista === 4) {
          draft.submit = true;
          document.getElementById("formulario").scrollTop = 0;
        }
        draft.vista += 1;
        document.getElementById("formulario").scrollTop = 0;
      }
      return;
    }

    case "atras": {
      draft.vista -= 1;
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
        draft.otu[action.type][action.index].metadata[action.fieldName] =
          action.payLoad;
      } else {
        draft.otu[action.type][action.index][action.fieldName] = action.payLoad;
      }
      return;
    }

    case "agregar_junction": {
      //CHECKED
      const name =
        "J" +
        draft.otu.oid.slice(1, 6) +
        (draft.otu.junctions.length + 1).toString();
      const nuevo = {
        jid: name,
        metadata: { location: "pointField", address_reference: "" },
        //plans: "",  //se asignan cuando se lee el SC
      };
      draft.otu.junctions.push(nuevo);
      return;
    }

    case "eliminar_junction": {
      //CHECKED
      draft.otu.junctions.pop();
      return;
    }

    //CORREGIR----------
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
        draft.controller.model.date.$date = "";
      } else if (action.fieldName === "date") {
        draft.controller.model[action.fieldName].$date = action.payLoad;
      } else if (action.fieldName === "model") {
        draft.controller.model[action.fieldName] = action.payLoad;
        draft.controller.model.firmware_version = "";
        draft.controller.model.date.$date = "";
        draft.controller.model.checksum = "";
      } else if (action.fieldName === "firmware_version") {
        draft.controller.model[action.fieldName] = action.payLoad;
        action.modelos.map((marca) => {
          if (marca.company === draft.controller.model.company.name) {
            marca.models.map((modelo) => {
              if (modelo.name === draft.controller.model.model)
                modelo.firmware.map((firmware) => {
                  if (
                    firmware.version === draft.controller.model.firmware_version
                  ) {
                    draft.controller.model.checksum = firmware.checksum;
                    draft.controller.model.date.$date = firmware.date.$date;
                  }
                });
            });
          }
        });
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
        draft.otu.stages[action.index][
          action.fieldName
        ] = action.payLoad.replace(/\s/g, "").replace(/[^a-zA-Z]/g, "");
      } else {
        draft.otu.stages[action.index][action.fieldName] = action.payLoad;
      }
      return;
    }

    case "eliminar_stage": {
      draft.otu.stages.pop();

      //eliminar columna de matriz entreverdes
      draft.otu.entreverdes.map((fila) => {
        fila.pop();
      });
      //eliminar ultima fila matriz entreverdes
      draft.otu.entreverdes.pop();
      return;
    }

    case "agregar_stage": {
      const nuevo = ["", ""];
      draft.otu.stages.push(nuevo);

      //agregar columna a matriz de entreverdes
      draft.otu.entreverdes.map((fila) => {
        fila.push(0);
      });
      //agregar fila al final de la matriz de entreverdes
      const largo = draft.otu.stages.length;
      const array = Array(largo).fill(0);
      draft.otu.entreverdes.push(array);
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
    case "fase": {
      const lista = action.payLoad
        .replace(/\s/g, "")
        .replace(/[^a-zA-Z-]/g, "")
        .split("-");

      lista.map((valor) => {
        //if valor not in stages id
        //return error
      });
      draft.otu.fases[action.index] = lista;
      return;
    }

    case "agregar_fase": {
      draft.otu.fases.push([]);
      return;
    }

    case "eliminar_fase": {
      draft.otu.fases.pop();
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

    case "observations": {
      draft.observations = action.payLoad;
      return;
    }

    default:
      return;
  }
}
