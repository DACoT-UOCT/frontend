export const initialState = {
  oid: "X",
  metadata: {
    version: "base",
    installed_by: "",
    maintainer: "", //se envia vacio al back o no se envia
    status: "NEW", //"UPDATE"
    status_date: Date.now(),
    status_user: "", //ENVIAR CORREO
    installation_date: Date.now(),
    region: "",
    commune: "",
    pdf_data: "",
    imgs: "", //imagen de la instalacion(pueden ser varias despues)
    observations: "",
    controller: {
      model: "",
      marca: "", //preguntar
      address_reference: "",
    },

    serial: "",
    ip_address: "",
    netmask: "",
    control: 0, //int
    answer: 0,
    demanda_peatonal: false,
    facilidad_peatonal: false,
    detector_local: false,
    detector_scoot: false,
    link_type: "", //"Digital|Analogo"
    link_owner: "", //"Propio|Compartido"
    //nodo_concentrador: "",
    //n_empalme: "",
    //capacidad_empalme: "",
    // equipamientos: [
    //   {
    //     desc: "",
    //     ip: "",
    //   },
    // ],
  },

  ups: {
    marca: "",
    modelo: "",
    n_serie: "",
    capacidad: "",
    duracion_carga: "",
  },

  postes: {
    ganchos: 0,
    vehiculares: 0,
    peatonales: 0,
  },
  //gps: "",
  cabezales: {
    l1: {
      hal: "0",
      led: "0",
    },
    l2: {
      hal: "0",
      led: "0",
    },
    l3_l4: {
      hal: "0",
      led: "0",
    },
    l5: {
      hal: "0",
      led: "0",
    },
    l6: {
      hal: "0",
      led: "0",
    },
    peatonal: {
      hal: "0",
      led: "0",
    },
  },

  //senal_hito: "",

  junctions: [
    {
      id: "",
      addr: "",
    },
  ],

  stages: [
    ["", ""],
    // "A", "VEH",
  ],

  fases: [
    {
      etapas: [],
      imagen: null,
    },
  ],

  secuencias: [[]], //[[1,2,3], "J003672"]
  entreverdes: [["0"]],
  //bits_de_control: "",

  errors: [],
  vista: 1,
  submit: false,
  isLoading: true,
};

export function reducer(draft, action) {
  switch (action.type) {
    case "onMount": {
      return;
    }

    case "oid": {
      for (var i = 0; i < draft.junctions.length; i++) {
        draft.junctions[i].id =
          "J" + action.payLoad.slice(1, 6) + (i + 1).toString();
      }
      draft.oid = "X" + action.payLoad.slice(1, 7);
      return;
    }

    case "installation_date": {
      draft.metadata.installation_date = action.payLoad;
      return;
    }
    case "metadata": {
      if (action.fieldName === "control" || action.fieldName === "answer") {
        draft[action.type][action.fieldName] = parseInt(
          action.payLoad.replace(/\D/, "")
        );
      } else {
        draft[action.type][action.fieldName] = action.payLoad;
      }

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
          document.getElementById('formulario').scrollTop = 0;
        }
        draft.vista += 1;
        document.getElementById('formulario').scrollTop = 0;
      }
      return;
    }

    case "atras": {
      draft.vista -= 1;
      document.getElementById('formulario').scrollTop = 0;
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

    case "try_submit": {
      if (draft.errors.length === 0) {
        draft._id = "X" + draft.junctions[0].id.slice(1, -1) + "0";
        draft.submit = true;
      }
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
      draft[action.type][action.index][action.fieldName] = action.payLoad;
      return;
    }

    case "agregar_junction": {
      const name =
        "J" + draft.oid.slice(1, 6) + (draft.junctions.length + 1).toString();
      const nuevo = { id: name, addr: "" };
      draft.junctions.push(nuevo);
      return;
    }

    case "eliminar_junction": {
      draft.junctions.pop();
      return;
    }

    case "agregar_equip": {
      const nuevo = { desc: "", ip: "" };
      draft.metadata.otu.equipamientos.push(nuevo);
      return;
    }

    case "eliminar_equip": {
      draft.metadata.otu.equipamientos.pop();
      return;
    }

    case "controller": {
      draft.metadata.controller[action.fieldName] = action.payLoad;
      return;
    }

    case "postes": {
      draft.postes[action.fieldName] = action.payLoad;
      return;
    }

    case "otu": {
      // junctions: [
      //   {
      //     id: "",
      //     addr: "",
      //   },
      // ],

      // if (action.fieldName === "enlace_pc" && action.payLoad === "Propio") {
      //   draft.metadata.otu.nodo_concentrador = "";
      // }

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

    case "cabezales.l1": {
      draft.cabezales.l1[action.fieldName] = action.payLoad;
      return;
    }

    case "cabezales.l2": {
      draft.cabezales.l2[action.fieldName] = action.payLoad;
      return;
    }

    case "cabezales.l3_l4": {
      draft.cabezales.l3_l4[action.fieldName] = action.payLoad;
      return;
    }

    case "cabezales.l5": {
      draft.cabezales.l5[action.fieldName] = action.payLoad;
      return;
    }

    case "cabezales.l6": {
      draft.cabezales.l6[action.fieldName] = action.payLoad;
      return;
    }

    case "cabezales.peatonal": {
      draft.cabezales.peatonal[action.fieldName] = action.payLoad;
      return;
    }

    case "stage": {
      draft.stages[action.index][action.fieldName] = action.payLoad;
      return;
    }

    case "eliminar_stage": {
      draft.stages.pop();

      //eliminar columna de matriz entreverdes
      draft.entreverdes.map((fila) => {
        fila.pop();
      });
      //eliminar ultima fila matriz entreverdes
      draft.entreverdes.pop();
      return;
    }

    case "agregar_stage": {
      const nuevo = ["", ""];
      draft.stages.push(nuevo);

      //agregar columna a matriz de entreverdes
      draft.entreverdes.map((fila) => {
        fila.push("0");
      });
      //agregar fila al final de la matriz de entreverdes
      const largo = draft.stages.length;
      const array = Array(largo).fill("0");
      draft.entreverdes.push(array);
      return;
    }

    case "upload_PDF": {
      draft.pdf_respaldo = action.payLoad;
      return;
    }

    case "upload_imagen_cruce": {
      draft.imagen_instalacion = action.payLoad;
      return;
    }

    case "upload_bits_de_control": {
      draft.bits_de_control = action.payLoad;
      return;
    }

    case "fase": {
      if (action.fieldName === "etapas") {
        const lista = action.payLoad.replace(/\s/g, "").split("-");
        lista.map((valor) => {
          //if valor not in stages id
          //return error
        });
        draft.fases[action.index].etapas = lista;
      } else if (action.fieldName === "imagen") {
      }
      return;
    }

    case "upload_imagen_fase": {
      draft.fases[action.index].imagen = action.payLoad;
      return;
    }

    case "agregar_fase": {
      const nuevo = { etapas: [], imagen: null };
      draft.fases.push(nuevo);
      return;
    }

    case "eliminar_fase": {
      draft.fases.pop();
      return;
    }

    case "secuencia": {
      const lista = action.payLoad.replace(/\s/g, "").split("-");
      draft.secuencias[action.index] = lista;
      return;
    }

    case "agregar_secuencia": {
      const nuevo = [];
      draft.secuencias.push(nuevo);
      return;
    }

    case "eliminar_secuencia": {
      draft.secuencias.pop();
      return;
    }

    case "entreverde": {
      draft.entreverdes[action.index_fila][action.index_col] = action.payLoad;
      return;
    }

    case "observaciones": {
      draft.observaciones = action.payLoad;
      return;
    }

    default:
      return;
  }
}
