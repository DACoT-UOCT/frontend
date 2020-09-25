export const initialState = {
  metadata: {
    datos_version: {
      vigente: false,
      version: "0.0",
      fecha: Date.now(),
      evento: "nueva instalacion",
      artifice: {
        nombre: "Auter", //consultar del estado de la sesion
        rol: "empresa",
      },
      ingresado_a_SC: false,
      nueva_instalacion: true,
      actualizando_instalacion: false,
      aprobado_para_ingresar: false,
      rechazado: false,
    },
    empresa: "Auter",
    fecha_de_instalacion: "", //como preguntar la fecha ?????????????
    region: "",
    comuna: "",
    n_etapas: "", //calcular a partir de las etapas
    mod_potencia: "",
    detectores: "",
    otu: {
      codigo: "",
      n_serie: "",
      marca: "",
      tipo: "",
      direccion_ip: "",
      netmask: "",
      control: "",
      respuesta: "",
      equipamientos: [
        {
          desc: "",
          ip: "",
        },
      ],
    },
    n_empalme: "",
    capacidad_empalme: "",
    ups: {
      marca: "",
      modelo: "",
      n_serie: "",
      capacidad: "",
      duracion_carga: "",
    },
    gps: "",
    empresa_servicio_de_comunicacion: "",
    postes_ganchos: "",
    postes_vehiculares: "",
    postes_peatonales: "",
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
    d_peatonal: "0",
    dyf_peatonal: "0",
    espira_local: "",
    espira_scoot: "",
    senal_hito: "",
    enlace_pc: "",
    nodo_concentrador: "",
    enlace_da: "",

    controlador: {
      modelo: "",
      marca: "",
      ubicacion: "",
    },
  },

  junctions: [
    {
      id: "",
      addr: "",
    },
  ],

  stages: [
    {
      id: "",
      tipo: "",
    },
    // A: "VEH",
  ],

  fases: [
    {
      etapas: [],
      imagen: null,
    },
  ],

  secuencias: [[]],
  entreverdes: [[""]],
  pdf_respaldo: "",
  imagen_instalacion: "",
  bits_de_control: "",
  observaciones: "",
  errors: [],
  vista: 3,
  submit: false,
};

export function reducer(draft, action) {
  draft.form_1_ok = false;
  switch (action.type) {
    case "metadata": {
      draft[action.type][action.fieldName] = action.payLoad;
      return;
    }

    case "siguiente": {
      if (draft.errors.length === 0) {
        if (draft.vista < 3) {
          draft.vista += 1;
        } else {
          draft._id = "X" + draft.junctions[0].id.slice(1, -1) + "0";
          draft.submit = true;
        }
      }
      return;
    }

    case "atras": {
      draft.vista -= 1;
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

    case "post_error": {
      draft.submit = false;
      return;
    }

    case "junctions": {
      draft[action.type][action.index][action.fieldName] = action.payLoad;
      return;
    }

    case "agregar_junction": {
      const name =
        "J" +
        draft.metadata.otu.codigo.slice(1, 6) +
        (draft.junctions.length + 1).toString();
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

    case "modelo controlador": {
      draft.metadata.controlador.modelo = action.payLoad;
      return;
    }

    case "marca controlador": {
      draft.metadata.controlador.marca = action.payLoad;
      return;
    }

    case "ubicacion controlador": {
      draft.metadata.controlador.ubicacion = action.payLoad;
      return;
    }

    case "otu": {
      // junctions: [
      //   {
      //     id: "",
      //     addr: "",
      //   },
      // ],
      if (action.fieldName === "codigo") {
        for (var i = 0; i < draft.junctions.length; i++) {
          draft.junctions[i].id =
            "J" + action.payLoad.slice(1, 6) + (i + 1).toString();
        }
      }
      draft.metadata.otu[action.fieldName] = action.payLoad;
      return;
    }

    case "equipamiento": {
      draft.metadata.otu.equipamientos[action.index][action.fieldName] =
        action.payLoad;
      return;
    }

    case "ups": {
      draft.metadata.ups[action.fieldName] = action.payLoad;
      return;
    }

    case "cabezales.l1": {
      draft.metadata.cabezales.l1[action.fieldName] = action.payLoad;
      return;
    }

    case "cabezales.l2": {
      draft.metadata.cabezales.l2[action.fieldName] = action.payLoad;
      return;
    }

    case "cabezales.l3_l4": {
      draft.metadata.cabezales.l3_l4[action.fieldName] = action.payLoad;
      return;
    }

    case "cabezales.l5": {
      draft.metadata.cabezales.l5[action.fieldName] = action.payLoad;
      return;
    }

    case "cabezales.l6": {
      draft.metadata.cabezales.l6[action.fieldName] = action.payLoad;
      return;
    }

    case "cabezales.peatonal": {
      draft.metadata.cabezales.peatonal[action.fieldName] = action.payLoad;
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
      const nuevo = { id: "", tipo: "" };
      draft.stages.push(nuevo);

      //agregar columna a matriz de entreverdes
      draft.entreverdes.map((fila) => {
        fila.push("");
      });
      //agregar fila al final de la matriz de entreverdes
      const largo = draft.stages.length;
      const array = Array(largo).fill("");
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