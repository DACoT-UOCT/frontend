export const comparar_arrays = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

export const sortFunction = (a, b) => {
  //ordenar cronologicamente registros consultados
  var keyA = new Date(a.date),
    keyB = new Date(b.date);
  // Compare the 2 dates
  if (keyA < keyB) return 1;
  if (keyA > keyB) return -1;
  return 0;
};

export const getFecha = (date) => {
  if (date == undefined) {
    return "Desconocido";
  }
  var temp = new Date(date);
  const string =
    temp.getDate() + "-" + (temp.getMonth() + 1) + "-" + temp.getFullYear();
  return string;
};
