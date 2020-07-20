export const initialState = {
  component: 2,
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
    comuna: "",
    n_etapas: "", //calcular a partir de las etapas
    mod_potencia: "",
    detectores: "",
    otu: {
      n_serie: "",
      marca: "",
      tipo: "",
      direccion_ip: "",
      equipamientos: "",
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
        hal: "",
        led: "",
      },
      l2: {
        hal: "",
        led: "",
      },
      l3_l4: {
        hal: "",
        led: "",
      },
      l5: {
        hal: "",
        led: "",
      },
      l6: {
        hal: "",
        led: "",
      },
      peatonal: {
        hal: "",
        led: "",
      },
    },
    botoneras: "",
    espira_local: "",
    espira_scoot: "",
    senal_hito: "",
    enlace_pc: "",
    nodo_concentrador: "",
    enlace_da: "",

    controlador: {
      modelo: "",
      marca: "",
    },
  },

  junctions: [
    {
      id: "",
      addr: "",
      codigo_cruce: "",
    },
  ],

  stages: [
    {
      id: "",
      tipo: "",
    },
    // A: "VEH",
  ],
  fases: [{ etapas: [], imagen: null }],

  secuencias: [[]],
  entreverdes: [[""]],
  pdf_respaldo: "",
  imagen_instalacion: "",
  observaciones: "",
};

export function reducer(draft, action) {
  switch (action.type) {
    case "metadata": {
      draft[action.type][action.fieldName] = action.payLoad;
      return;
    }

    case "version": {
      return;
    }

    case "componente": {
      return;
    }

    case "siguiente": {
      draft.component = 2;
      return;
    }

    case "junctions": {
      draft[action.type][action.index][action.fieldName] = action.payLoad;
      return;
    }

    case "agregar_junction": {
      const nuevo = { id: "", addr: "", codigo_cruce: "" };
      draft.junctions.push(nuevo);
      return;
    }

    case "eliminar_junction": {
      draft.junctions.pop();
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

    case "otu": {
      draft.metadata.otu[action.fieldName] = action.payLoad;
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

    case "uploadPDF": {
      draft.pdf_respaldo = action.payLoad;
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

    case "uploadImagenFase": {
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
    }

    default:
      return;
  }
}
