import { DatePicker } from "antd";
import moment from "moment";
import React, { memo } from "react";
const Today = new Date().toLocaleDateString("en-CA");

// const onChange = (date, dateString) => {
//   console.log(Number(dateString.replace(/-/g, "")));
//   console.log(Number(Today.replace(/-/g, "")));
// };
const DayPicker = memo(({ handleChange, date }) => {
  return (
    <>
      <DatePicker
        onChange={handleChange}
        format="YYYY-MM-DD"
        placeholder={["Start Date", "End Date"]}
        disabledDate={(current) => current && current > moment().endOf("day")}
      />
      <p
        style={{
          color: "yellow",
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        {date}
      </p>
    </>
  );
});
export default DayPicker;
