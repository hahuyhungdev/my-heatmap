import { useCallback } from "react";
export const dateStringsNumber = (dateStrings) => {
  return dateStrings.map((date) => {
    return Number(date.replace(/-/g, ""));
  });
};
// export const convertDate = useCallback((date) => {
//   return Number(date.replace(/-/g, ""));
// }, []);

export const convertDate = (date) => {
  return Number(date.replace(/-/g, ""));
};
