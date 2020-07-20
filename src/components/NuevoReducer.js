export const initialState = {
  component: 1,
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
    cabezales: {
      l1: ["cant hal, cant led"],
      l2: ["cant hal, cant led"],
      l3_l4: ["cant hal, cant led"],
      l5: ["cant hal, cant led"],
      l6: ["cant hal, cant led"],
      peatonal: ["cant hal, cant led"],
    },
    botoneras: "",
    espira_local: "",
    espira_scoot: "",
    senal_hito: "",
    enlace: {
      digital: null,
      compartido: null,
    },
    nodo_concentrador: null,
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

    case "stages": {
    }

    default:
      return;
  }
}
