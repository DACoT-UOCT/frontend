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

  stages: {
    // A: "VEH",
  },
  fases: [
    // { etapas: ["A", "B"], imagen: "" },
  ],

  secuencias: [
    // [1, 2, 3],
  ],
  intergreens: {
    // A: [["E", "F"], 4],
  },
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
      const nuevo = { id: "", addr: "" };
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

    case "stages": {
    }

    default:
      return;
  }
}
