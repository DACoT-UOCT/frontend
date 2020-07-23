import React, { useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import fontLtSrc from "../Aller/Aller_Lt.ttf";
import fontSrc from "../Aller/Aller_Rg.ttf";
import fontBdSrc from "../Aller/Aller_Bd.ttf";

import axios from "axios";

/*useEffect(() => {
  const link = "";
  //axios
  //   .get(link)
  //   .then((response) => {
  //     //solicitud exitosa
  //     console.log(response);
  //     dispatch({ type: "loadData", payLoad: response });
  //     dispatch({ type: "preview_success" });
  //
  //   })
  //   .catch((err) => {
  //     //error
  //     console.log(err);
  //     dispatch({ type: "preview_error" });
  //   });
}, []);*/
export default function PdfConsulta(props) {
  //Definicion de fuentes
  const data = props.data;
  let stages = {};
  Font.register({
    family: "Noto",
    fonts: [
      { src: fontLtSrc, fontWeight: "lite" },
      { src: fontSrc, fontWeight: "normal" },
      { src: fontBdSrc, fontWeight: "bold" },
    ],
  });
  const styles = StyleSheet.create({
    title: {
      fontSize: "25pt",
      fontWeight: "bold",
      borderBottom: "3pt solid gray",
      marginBottom: "20pt",
    },
    page: {
      fontWeight: "lite",
      fontFamily: "Noto",
      format: "truetype",
      padding: "40pt",
      fontSize: "12pt",
    },
    bold: {
      fontWeight: "bold",
    },
    half: {
      width: "50%",
    },
    container: {
      display: "flex",
      flexDirection: "row"
    },  
    mb: {
      marginBottom: "10pt",
    },
    table: {
      display: "table",
      width: "auto",
      marginBottom: "10",
    },
    tableRow: {
      margin: "auto",
      display: "flex",
      flexDirection: "row",
    },
    tableColHeader: {
      width: "50%",
      borderStyle: "solid",
      borderColor: "black",
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 1,
      borderTopWidth: 1,
      backgroundColor: "lightgray",
    },
    tableColHeader33: {
      width: "30%",
      borderStyle: "solid",
      borderColor: "black",
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 1,
      borderTopWidth: 1,
      backgroundColor: "lightgray",
    },
    tableColHeader20: {
      width: "20%",
      borderStyle: "solid",
      borderColor: "black",
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 1,
      borderTopWidth: 1,
      backgroundColor: "lightgray",
    },
    tableColHeader25: {
      width: "25%",
      borderStyle: "solid",
      borderColor: "black",
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 1,
      borderTopWidth: 1,
      backgroundColor: "lightgray",
    },
    tableColHeader80: {
      width: "80%",
      borderStyle: "solid",
      borderColor: "black",
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 1,
      borderTopWidth: 1,
      backgroundColor: "lightgray",
    },
    tableColHeader60: {
      width: "60%",
      borderStyle: "solid",
      borderColor: "black",
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 1,
      borderTopWidth: 1,
      backgroundColor: "lightgray",
    },
    tableCol: {
      width: "50%",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderLeftWidth: 1,
      borderTopWidth: 0,
    },tableCol33: {
      width: "30%",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderLeftWidth: 1,
      borderTopWidth: 0,
    },
    tableCol20: {
      width: "20%",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderLeftWidth: 1,
      borderTopWidth: 0,
    },
    tableCol25: {
      width: "25%",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderLeftWidth: 1,
      borderTopWidth: 0,
    },
    tableCellHeader: {
      margin: "auto",
      padding: 5,
      fontSize: 10,
      fontWeight: "bold",
    },
    tableCell: {
      margin: "auto",
      padding: 5,
      fontSize: 8,
    },
  });
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>{"Informe de Programaciones"}</Text>
        <Text>
          <Text style={styles.bold}>Cruce: </Text>
          {data.junctions[0].addr}
        </Text>
        <Text>
          <Text style={styles.bold}>Junctions: </Text>
          {data.junctions[0].id+' - '+data.junctions[0].id}
        </Text>
        <Text>
          <Text style={styles.bold}>Empresa: </Text>
          {data.metadata.empresa}
        </Text>
        <Text>
          <Text style={styles.bold}>Comuna: </Text>
          {data.metadata.comuna}
        </Text>

        <View style={styles.half}>
          <Text style={[styles.bold, styles.mb]}>Etapas: </Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Identificador</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Tipo</Text>
              </View>
            </View>
            {data.stages.map((entry, index) => {
              stages[index] = entry.id 
              return (
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{entry.id}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{entry.tipo}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.half}>
          <Text style={[styles.bold, styles.mb]}>Fases: </Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Identificador</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Etapas</Text>
              </View>
            </View>
            {data.fases.map((entry, index) => {
              return (
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{index + 1}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {entry.etapas.join("-")}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.half}>
          <Text style={[styles.bold, styles.mb]}>Secuencias: </Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Identificador</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Fases</Text>
              </View>
            </View>
            {data.secuencias.map((entry, index) => {
              return (
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{index + 1}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {entry.join("-")}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View> 
        <View style={styles.half}>
          <Text style={[styles.bold, styles.mb]}>Entreverdes: </Text>
          <View style={styles.table} wrap={false}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader33} >
                <Text style={styles.tableCellHeader}>De</Text>
              </View>
              <View style={styles.tableColHeader33}>
                <Text style={styles.tableCellHeader}>A</Text>
              </View>
            <View style={styles.tableColHeader33}>
                <Text style={styles.tableCellHeader}>Seg</Text>
              </View>
            </View>
            {data.entreverdes.map((entry, index) => {
              let text = [];
              let sg = "";
              entry.map((stage, index2) =>{
                if(stage != ""){
                  text.push(stages[index2]);
                  sg = stage;
                }
              })
              text = text.join(',');
                return (
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol33}>
                      <Text style={styles.tableCell}>{stages[index]}</Text>
                    </View>
                    <View style={styles.tableCol33}>
                      <Text style={styles.tableCell}>
                        {text}
                      </Text>
                    </View>
                    <View style={styles.tableCol33}>
                      <Text style={styles.tableCell}>
                        {sg}
                      </Text>
                    </View>
                  </View>
                );
            })}
          </View> 
        </View>
        <Text style={[styles.bold, styles.mb]}>Periodizaciones: </Text>
        <View style={styles.container}>
          <View style={styles.half}>
            <View style={styles.table} wrap={false}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader33} >
                  <Text style={styles.tableCellHeader}>Dia</Text>
                </View>
                <View style={styles.tableColHeader33}>
                  <Text style={styles.tableCellHeader}>Hora</Text>
                </View>
                <View style={styles.tableColHeader33}>
                  <Text style={styles.tableCellHeader}>Plan</Text>
                </View>
              </View>
              {data.tabla_periodizaciones.L.map((entry, index) => {
                  return (
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol33}>
                        <Text style={styles.tableCell}>{'L'}</Text>
                      </View>
                      <View style={styles.tableCol33}>
                        <Text style={styles.tableCell}>
                          {entry[0]}
                        </Text>
                      </View>
                      <View style={styles.tableCol33}>
                        <Text style={styles.tableCell}>
                          {entry[1]}
                        </Text>
                      </View>
                    </View>
                  );
              })}
            </View> 
          </View>  
          <View style={styles.half}>
            <View style={styles.table} wrap={false}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader33} >
                  <Text style={styles.tableCellHeader}>Dia</Text>
                </View>
                <View style={styles.tableColHeader33}>
                  <Text style={styles.tableCellHeader}>Hora</Text>
                </View>
                <View style={styles.tableColHeader33}>
                  <Text style={styles.tableCellHeader}>Plan</Text>
                </View>
              </View>
              {data.tabla_periodizaciones.S.map((entry, index) => {
                  return (
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol33}>
                        <Text style={styles.tableCell}>{'S'}</Text>
                      </View>
                      <View style={styles.tableCol33}>
                        <Text style={styles.tableCell}>
                          {entry[0]}
                        </Text>
                      </View>
                      <View style={styles.tableCol33}>
                        <Text style={styles.tableCell}>
                          {entry[1]}
                        </Text>
                      </View>
                    </View>
                  );
              })}
            </View> 
          </View>       
        </View>
        <View style={styles.half}>
            <View style={styles.table} wrap={false}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader33} >
                  <Text style={styles.tableCellHeader}>Dia</Text>
                </View>
                <View style={styles.tableColHeader33}>
                  <Text style={styles.tableCellHeader}>Hora</Text>
                </View>
                <View style={styles.tableColHeader33}>
                  <Text style={styles.tableCellHeader}>Plan</Text>
                </View>
              </View>
              {data.tabla_periodizaciones.D.map((entry, index) => {
                  return (
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol33}>
                        <Text style={styles.tableCell}>{'D'}</Text>
                      </View>
                      <View style={styles.tableCol33}>
                        <Text style={styles.tableCell}>
                          {entry[0]}
                        </Text>
                      </View>
                      <View style={styles.tableCol33}>
                        <Text style={styles.tableCell}>
                          {entry[1]}
                        </Text>
                      </View>
                    </View>
                  );
              })}
            </View> 
          </View>  
          <View style={styles.container}>
          <View style={styles.half}>
            <Text style={[styles.bold, styles.mb]}>Programación J001331: </Text>
            <View style={styles.table} wrap={false}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader80} >
                    <Text style={styles.tableCellHeader}></Text>
                  </View>
                <View style={styles.tableColHeader20} >
                  <Text style={styles.tableCellHeader}>I.Sistema</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader20} >
                  <Text style={styles.tableCellHeader}>Plan</Text>
                </View>
                <View style={styles.tableColHeader20}>
                  <Text style={styles.tableCellHeader}>Ciclo</Text>
                </View>
                <View style={styles.tableColHeader20}>
                  <Text style={styles.tableCellHeader}>F1</Text>
                </View>
                <View style={styles.tableColHeader20}>
                  <Text style={styles.tableCellHeader}>F2</Text>
                </View>
                <View style={styles.tableColHeader20}>
                  <Text style={styles.tableCellHeader}>F3</Text>
                </View>
              </View>
              {Object.entries(data.junctions[0].programacion).map((entry, index) => {
                  return (
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol20}>
                        <Text style={styles.tableCell}>{entry[0]}</Text>
                      </View>
                      <View style={styles.tableCol20}>
                        <Text style={styles.tableCell}>
                          {entry[1].cycle}
                        </Text>
                      </View>
                      <View style={styles.tableCol20}>
                        <Text style={styles.tableCell}>
                          {entry[1].system_start[1]}
                        </Text>
                      </View>
                      <View style={styles.tableCol20}>
                        <Text style={styles.tableCell}>
                          {entry[1].system_start[2]}
                        </Text>
                      </View>
                      <View style={styles.tableCol20}>
                        <Text style={styles.tableCell}>
                          {entry[1].system_start[3]}
                        </Text>
                      </View>
                    </View>
                  );
              })}
            </View> 
          </View>  
          <View style={styles.half}>
            <Text style={[styles.bold, styles.mb]}>Programación J001332: </Text>
            <View style={styles.table} wrap={false}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader60} >
                    <Text style={styles.tableCellHeader}></Text>
                  </View>
                <View style={styles.tableColHeader20} >
                  <Text style={styles.tableCellHeader}>I.Sistema</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader20} >
                  <Text style={styles.tableCellHeader}>Plan</Text>
                </View>
                <View style={styles.tableColHeader20}>
                  <Text style={styles.tableCellHeader}>Ciclo</Text>
                </View>
                <View style={styles.tableColHeader20}>
                  <Text style={styles.tableCellHeader}>F1</Text>
                </View>
                <View style={styles.tableColHeader20}>
                  <Text style={styles.tableCellHeader}>F2</Text>
                </View>
              </View>
              {Object.entries(data.junctions[1].programacion).map((entry, index) => {
                  return (
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol20}>
                        <Text style={styles.tableCell}>{entry[0]}</Text>
                      </View>
                      <View style={styles.tableCol20}>
                        <Text style={styles.tableCell}>
                          {entry[1].cycle}
                        </Text>
                      </View>
                      <View style={styles.tableCol20}>
                        <Text style={styles.tableCell}>
                          {entry[1].system_start[1]}
                        </Text>
                      </View>
                      <View style={styles.tableCol20}>
                        <Text style={styles.tableCell}>
                          {entry[1].system_start[2]}
                        </Text>
                      </View>
                    </View>
                  );
              })}
            </View> 
          </View>  
        </View>
      </Page>
    </Document>
  );
}
