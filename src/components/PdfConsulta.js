import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
    Font
} from "@react-pdf/renderer";
import fontLtSrc from "../Aller/Aller_Lt.ttf";
import fontSrc from "../Aller/Aller_Rg.ttf";
import fontBdSrc from "../Aller/Aller_Bd.ttf";


export default function PdfConsulta(props) {
    const metadata = props.data["X001010"][0].metadata;
    const stages = props.data["X001010"][0].stages;
    const fases = props.data["X001010"][0].fases;
    
    //Definicion de fuentes
    Font.register({ family: 'Noto', fonts: [
        { src: fontLtSrc, fontWeight: 'lite'}, 
        { src: fontSrc, fontWeight: 'normal'},
        { src: fontBdSrc, fontWeight: 'bold'},
    ]});
    const styles = StyleSheet.create({
        title: {
            fontSize: '25pt',
            fontWeight: 'bold',
            borderBottom: '3pt solid gray',
            marginBottom: '20pt'
        },
        page: {
            fontFamily: 'Noto',
            fontWeight: 'lite',
            format: 'truetype',
            padding: '40pt',
            fontSize: '12pt'
        },
        bold: {
            fontWeight: 'bold',
        },
        half: {
            width: '50%'
        },
        mb: {
            marginBottom: '10pt'
        },
        table: { 
            display: "table", 
            width: 'auto', 
            marginBottom: '10'
        }, 
        tableRow: { 
            margin: "auto", 
            flexDirection: "row" 
        }, 
        tableColHeader: { 
            width: "50%", 
            borderStyle: "solid", 
            borderColor: 'black',
            borderBottomColor: '#000',
            borderWidth: 1, 
            borderLeftWidth: 1, 
            borderTopWidth: 1,
            backgroundColor: 'lightgray' 
        },   
        tableCol: { 
            width: "50%", 
            borderStyle: "solid", 
            borderColor: '#bfbfbf',
            borderWidth: 1, 
            borderLeftWidth: 1, 
            borderTopWidth: 0 
        }, 
        tableCellHeader: {
            margin: "auto", 
            padding: 5, 
            fontSize: 12,
            fontWeight: 'bold',
        },  
        tableCell: { 
            margin: "auto", 
            padding: 5, 
            fontSize: 10 
        }
    });
    return(
        <Document>
            <Page style={styles.page}>
                <Text style={styles.title}>{"Informe de Programaciones"}</Text>
                <Text><Text style={styles.bold}>Cruce: </Text>{metadata.cruce}</Text>
                <Text><Text style={styles.bold}>Junctions: </Text>{metadata.junctions.join(' - ')}</Text>
                <Text><Text style={styles.bold}>Empresa: </Text>{metadata.empresa}</Text>
                <Text><Text style={styles.bold}>Comuna: </Text>{metadata.comuna}</Text>

                <View style={styles.half}>
                    <Text style={[styles.bold, styles.mb]}>Etapas: </Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Identificador</Text></View>
                            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Tipo</Text></View>
                        </View>
                        {Object.entries(stages).map((entry, index) => {
                            return <View style={styles.tableRow}>
                                <View style={styles.tableCol}><Text style={styles.tableCell}>{entry[0]}</Text></View>
                                <View style={styles.tableCol}><Text style={styles.tableCell}>{entry[1]}</Text></View>
                            </View> 
                        })}
                    </View>
                </View>

                <View style={styles.half}>
                    <Text style={[styles.bold, styles.mb]}>Fases: </Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Identificador</Text></View>
                            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Etapas</Text></View>
                        </View>
                        {fases.map((entry, index) => {
                            return <View style={styles.tableRow}>
                                <View style={styles.tableCol}><Text style={styles.tableCell}>{index+1}</Text></View>
                                <View style={styles.tableCol}><Text style={styles.tableCell}>{entry.etapas.join('-')}</Text></View>
                            </View> 
                        })}
                    </View>
                </View>
            </Page>
        </Document>
    );
}