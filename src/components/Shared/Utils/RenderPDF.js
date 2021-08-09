export const renderPDF = (instalacion) => {
  if (instalacion.metadata.pdf_data == null) {
    alert("No se ha encontrado un PDF con información de esta instalación");
    return;
  }
  var byteCharacters = atob(instalacion.metadata.pdf_data);
  var byteNumbers = new Array(byteCharacters.length);
  for (var i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  var byteArray = new Uint8Array(byteNumbers);
  var file = new Blob([byteArray], {
    type: "application/pdf;base64",
  });
  var fileURL = URL.createObjectURL(file);
  window.open(fileURL);
};
