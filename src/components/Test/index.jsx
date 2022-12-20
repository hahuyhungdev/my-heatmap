import React, { memo } from "react";

export const Test = ({ valueIncrease, handleIncrease }) => {
  console.log("Test");
  return (
    <div
      className="card"
      style={{
        marginTop: "20px",
      }}
    >
      <p>test</p>
    </div>
  );
};

export default memo(Test);
