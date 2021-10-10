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
