export const initialState = {
  marca: "",
  modelo: "",
  version: "",
  checksum: "",
  fecha: "",

  controladores: [],
  loading: false,
  error: "",
  consultado: false,
  desea_eliminar: false,
  delete_backup: {},
};

export const controladores_dummy = [
  {
    company: "SIEMENS",
    models: [
      {
        name: "ST 900",
        firmware: [
          {
            version: "PB801 v13",
            checksum: "71 3A B4 A0",
            date: {
              $date: 1609372800000,
            },
          },
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527899,
            },
          },
        ],
      },
      {
        name: "ST 950",
        firmware: [
          {
            version: "667/TZ/46059/000 ISSUE 16",
            checksum: "C1 D0 40 1A",
            date: {
              $date: 1609372800000,
            },
          },
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527895,
            },
          },
        ],
      },
      {
        name: "ST950",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527827,
            },
          },
        ],
      },
      {
        name: "ST900",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527829,
            },
          },
        ],
      },
      {
        name: "T-400",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527837,
            },
          },
        ],
      },
      {
        name: "T-950",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527875,
            },
          },
        ],
      },
      {
        name: "ST750",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527930,
            },
          },
        ],
      },
      {
        name: "T-900",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527947,
            },
          },
        ],
      },
      {
        name: "ST-950",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527979,
            },
          },
        ],
      },
    ],
  },
  {
    company: "TEK",
    models: [
      {
        name: "TEK 1/C",
        firmware: [
          {
            version: "12 2012",
            checksum: "1D 10",
            date: {
              $date: 1609372800000,
            },
          },
        ],
      },
      {
        name: "SWARCO ITC-3",
        firmware: [
          {
            version: "7.12.20",
            checksum: "00 6C E9 C3",
            date: {
              $date: 1609372800000,
            },
          },
        ],
      },
      {
        name: "1B",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527818,
            },
          },
        ],
      },
      {
        name: "T-900",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527824,
            },
          },
        ],
      },
      {
        name: "1C",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527841,
            },
          },
        ],
      },
      {
        name: "1A-2",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527844,
            },
          },
        ],
      },
      {
        name: "1A",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527847,
            },
          },
        ],
      },
      {
        name: "TK190",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527956,
            },
          },
        ],
      },
      {
        name: "T-400",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527995,
            },
          },
        ],
      },
      {
        name: "1B2",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451528014,
            },
          },
        ],
      },
      {
        name: "1B-2",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451528040,
            },
          },
        ],
      },
    ],
  },
  {
    company: "INDRA",
    models: [
      {
        name: "A25-A5",
        firmware: [
          {
            version: "4",
            checksum: "77 21",
            date: {
              $date: 1609372800000,
            },
          },
        ],
      },
      {
        name: "RSI",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527942,
            },
          },
        ],
      },
      {
        name: "A5",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451528033,
            },
          },
        ],
      },
    ],
  },
  {
    company: "AUTER",
    models: [
      {
        name: "A5",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527814,
            },
          },
        ],
      },
      {
        name: "A4F",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527821,
            },
          },
        ],
      },
      {
        name: "A3F",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527834,
            },
          },
        ],
      },
      {
        name: "1C",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527862,
            },
          },
        ],
      },
      {
        name: "ST900",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527986,
            },
          },
        ],
      },
      {
        name: "A5F",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451528037,
            },
          },
        ],
      },
    ],
  },
  {
    company: "FERRANTI",
    models: [
      {
        name: "SERIE 2",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451527887,
            },
          },
        ],
      },
    ],
  },
  {
    company: "TEK 1",
    models: [
      {
        name: "1A",
        firmware: [
          {
            version: "Desconocido",
            checksum: "Desconocido",
            date: {
              $date: 1607451528022,
            },
          },
        ],
      },
    ],
  },
];

export function reducer(draft, action) {
  switch (action.type) {
    // case "setComuna":
    //   draft.name = action.payLoad.name;
    //   draft.maintainer.name = action.payLoad.maintainer.name;
    //   draft.editarPopUp = true;
    //   return;

    case "eliminar":
      // PENDIENTE
      return;

    case "nuevo":
      draft.marca = "";
      draft.modelo = "";
      draft.version = "";
      draft.checksum = "";
      draft.fecha = "";
      return;

    // case "editar":
    //   draft.desea_eliminar = false;
    //   draft.nombre = action.payLoad.full_name;
    //   draft.rol = action.payLoad.rol;
    //   draft.area = action.payLoad.area;
    //   if (action.payLoad.rol === "Empresa") {
    //     draft.empresa = action.payLoad.company.name;
    //   }
    //   draft.email = action.payLoad.email;
    //   draft.is_admin = action.payLoad.is_admin;
    //   return;

    default:
      // if (action.type === "rol") {
      //   draft.area = "";
      // }

      if (action.type === "marca") {
        draft.modelo = "";
        draft.version = "";
        draft.checksum = "";
        draft.fecha = "";
      }
      draft[action.type] = action.payLoad;
      return;
  }
}
