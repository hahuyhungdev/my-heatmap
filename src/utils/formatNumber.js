export const dateStringsNumber = (dateStrings) => {
  return dateStrings.map((date) => {
    return Number(date.replace(/-/g, ""));
  });
};
