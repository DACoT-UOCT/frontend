const dummyData = {
  _id: { $oid: "5f18f9cca57f6141a1a744f2" },
  metadata: {
    datos_version: {
      vigente: false,
      version: "0.0",
      fecha: 1595472014253,
      evento: "nueva instalacion",
      artifice: { nombre: "Auter", rol: "empresa" },
      ingresado_a_SC: false,
      nueva_instalacion: true,
      actualizando_instalacion: false,
      aprobado_para_ingresar: false,
      rechazado: false,
    },
    empresa: "Auter",
    fecha_de_instalacion: "",
    comuna: "PROVIDENCIA",
  },

  tabla_periodizaciones: "periodizacion de este cruce",
  junctions: [
    {
      id: "J001331",
      addr: "LUIS THAYER OJEDA - AV. PROVIDENCIA",
      codigo_cruce: "-",
      programacion: "programacion de este J",
    },
    {
      id: "J001332",
      addr: "LUIS THAYER OJEDA",
      codigo_cruce: "-",
      programacion: "programacion de este J",
    },
  ],
  stages: [
    { id: "A", tipo: "vehicular" },
    { id: "B", tipo: "peatonal" },
    { id: "C", tipo: "vehicular" },
    { id: "D", tipo: "peatonal" },
    { id: "E", tipo: "vehicular" },
    { id: "F", tipo: "peatonal" },
    { id: "G", tipo: "vehicular" },
    { id: "H", tipo: "peatonal" },
  ],
  fases: [
    {
      etapas: ["A", "C", "D"],
      imagen:
        "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",
    },
    {
      etapas: ["A", "B", "D"],
      imagen:
        "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",
    },
    {
      etapas: ["E", "F"],
      imagen:
        "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",
    },
    {
      etapas: ["H"],
      imagen:
        "iVBORw0KGgoAAAANSUhEUgAAAGwAAAB+CAYAAADBePRdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAU5SURBVHhe7d1/SNR3HMfxM70NTISYP6gZYpibMBgbklH+sf0XQTLBxWROJnPTP9xGfzTZbLrhuoIJUoSgQ0bTwRguajoMs+0PsZwiLWgoilRUpGncMrWN0167z3ef21pF/tjS7+vu9YAPnm8PPHly9/3e977eeSBUPElJSUhOTtZy6TJ91q9fb3MFgwVhx44dWi5dpo9ZIZ7S0lJ7UdyoqKgIUVFR9jsFcz0FI6NgZBSMjIKRUTAyCkZGwcgoGBkFI6NgZBSMjIKRUTAyCkZGwcgoGBkFI6NgZBSMjIKRWdFgN2/exNGjR+13shwrGuzEiRPOL+vs7LQTWaoVf0gsLi7Ghg0bnHubLN2KB5uamsKmTZuQn59vJ7IUq7LT0dPTg+joaG3PlmFVghmVlZWIj4/HxYsX7UQWY9WCBQIBZGVlIScnB/Pz83YqC1m1YMbQ0BBiY2Ph8/nsRBayqsGM+vp6eL1eDAwM2Ik8yqoHM3bu3InMzEzMzs7ayXL8jkunDuG913aj5EMfPq/1oWrvB9hfX4vKw93Bn4YHVwQbGxtDYmIiysvL7WSppnBm/8tI8qai8NurmLNT3BnB10UZSHu7Q8H+b8ePH3duSEdHh50s3u0f30WGNwrerBr8+ncty/8Dqj47pWCPQ0lJifP/u5OTk3ayGLfx3euJWOOJRso7Jx8SZh4z0zP2Mj9XBZuenkZ6ejry8vLsZBHmhuDb6oXH48XzH59DwI7DlauCGb29vYiJiUFTU5OdLGD+MupeeiIYLAbP7j2DP/4awj90EofeL8Cr+fnY/dYn+Ob8Uu617uW6YEZ1dTXi4uIwOjpqJ48SwPlPs/Bk8I+Iz2uG307NvP+j5+D1rEFy8fe4Y6fsXBnMHAXJzs7Gtm3bMDd3/17EQ/h/QsWLcYhOeAVfXg0dNQngl6oXgsGi8bT2Eh+/kZERrF27FjU1NXbyaPOTPTj85lY8k/0GfF+1o6uzFb7cNDyVnoPiLy6EzbbNtcGMhoYGZ3vW19dnJwsL/HYZF/rP4udzg7g0Pv3Pc7Iw4epgRm5uLjIyMjAzEz675v+F64PduHHDeY+lsrIyO4lsrg9mtLe3OzfSfI10FMEMcw8z72Q2Pj5uJ5GJJpjZhplt2a5du+wkMtEEM/r7+529xoMHD0bsq9RUwYzGxkZs3LgRmzdvxpEjR5zjj5GELtjdu3dx+vRp56HR3PB169ahoqICV65csdcIb3TB7jU8POy86GmOiJiHyoKCgiU9yWZEHSzE7/ejtrYWqampzturbt++Ha2trYs7DkkmLIKFmIPGJpQ5dc6ES0tLQ11dHW7dumWvARw4cIB6uxdWwe5l9igLCwudM7LMCat79uxBW1ubE3LLli3OERRGYRss5Nq1a9i3bx8SEhKcWKFl9jIX93qbu4R9sBCzF3lvMLPMMUq28yEjJpjZdt0fzCzzyjbT/6tFTDCzxzgxMYHBwUF0d3fj2LFjzpNwc5q4eR53/fp1e013i5hg4ULByCgYGQUjo2BkFIyMgpFRMDIKRkbByCgYGQUjo2BkFIyMgpFRMDIKRkbByCgYGQUjo2BkFIyMgpFRMDIKRkbByCgYGQUjo2BkFIyMgpFRMDIKRkbByCgYGQUjo2BkFIyMgpFRMDIKRkbByCgYGQUjo2BkFIyMgpFRMDIKRkbByCgYGQUjo2BkFIyMgpFRMDIKRkbByCgYGQUjo2BkFIyMgpF5IJj5qMGuri4tl66UlBTng+pCgpcf/BQ7LXetf93DmpuboeXu1dLSYnMBfwLNol2n89LbmgAAAABJRU5ErkJggg==",
    },
    {
      etapas: ["G"],
      imagen:
        "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",
    },
  ],
  secuencias: [
    ["1", "2", "3"],
    ["4", "5"],
  ],
  entreverdes: [
    ["", "", "", "", "4", "4", "", ""],
    ["", "", "9", "", "9", "", "", ""],
    ["", "4", "", "", "4", "4", "", ""],
    ["", "", "", "", "9", "", "", ""],
    ["4", "4", "4", "4", "", "", "", ""],
    ["14", "", "14", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "4"],
    ["", "", "", "", "", "", "7", ""],
  ],

  observaciones: "OBSERVACION DE LA EMPRESA ",
  imagen_instalacion: "asdfjndkjsanfk",
};

export const initialState = {
  busqueda: "",
  isLoading: false,
  id_consultado: null,
  no_encontrado: false,
  data: null,
  junctions: "",
  imagen_cruce: null,
};

export function reducer(draft, action) {
  switch (action.type) {
    case "field": {
      draft[action.fieldName] = action.payload;
      return;
    }
    case "get_preview_data": {
      draft.no_encontrado = false;
      draft.isLoading = true;
      draft.id_consultado = null;
      return;
    }

    case "preview_success": {
      draft.isLoading = false;
      draft.id_consultado = draft.busqueda;
      draft.busqueda = "";
      return;
    }

    case "loadData": {
      draft.data = action.payLoad;
      console.log(draft.data);
      draft.data.junctions.map((junction) => {
        draft.junctions += junction.id + "/ ";
      });
      return;
    }
    case "preview_error": {
      draft.no_encontrado = true;
      draft.isLoading = false;
      draft.data = null;
      return;
    }

    default:
      return;
  }
}
