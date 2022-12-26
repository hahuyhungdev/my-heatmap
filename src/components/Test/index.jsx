import React, { memo } from "react";
export const Test = memo(({ dates }) => {
  // export const Test = ({ dates }) => {
  console.log("Test");
  return (
    <div className="card">
      {/* {dates.map((date, index) => (
        <div key={index}>{date}</div>
      ))} */}
      {dates?.length === 0 || dates === undefined
        ? "Please select date"
        : `
         Selected Date: ${dates[0]} to ${dates[1]}`}
    </div>
  );
});
// export default memo(Test);
export default Test;
