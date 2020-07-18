import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";


export default function PdfConsulta(props) {
    const metadata = props.data["X001010"][0].metadata; 
    return(
        <Document>
            <Page>
                <Text>{"Informe de Programaciones"}</Text>
                <Text>{"Empresa:" + metadata.empresa}</Text>
                <Text>{"Junctions:" + metadata.junctions.join()}</Text>
                <Text>{"Comuna:" + metadata.comuna}</Text>
            </Page>
        </Document>
    );
}