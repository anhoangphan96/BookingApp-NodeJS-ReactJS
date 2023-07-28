const convertStringToDate = (dateString) => {
  const [day, month, year] = dateString.split("/");
  const newDate = new Date(Date.UTC(+year, +month - 1, +day));
  return newDate;
};
module.exports = convertStringToDate;