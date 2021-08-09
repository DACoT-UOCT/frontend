export const sortFunction = (a, b) => {
  //ordenar cronologicamente registros consultados
  var keyA = new Date(a.date),
    keyB = new Date(b.date);
  // Compare the 2 dates
  if (keyA < keyB) return 1;
  if (keyA > keyB) return -1;
  return 0;
};

//transforma un objeto tipo Date a una fecha dia/mes/año
export const getFecha = (date) => {
  if (date === undefined) {
    return "Desconocido";
  }
  var temp = new Date(date);
  const string =
    temp.getDate() + "-" + (temp.getMonth() + 1) + "-" + temp.getFullYear();
  return string;
};
