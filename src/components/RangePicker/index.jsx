import { DatePicker } from "antd";
import moment from "moment";
import React, { memo } from "react";

const RangePicker = ({ dates, handleChange }) => {
  console.log("RangePicker");
  return (
    <>
      <DatePicker.RangePicker
        onChange={handleChange}
        format="YYYY-MM-DD"
        placeholder={["Start Date", "End Date"]}
        disabledDate={(current) => current && current > moment().endOf("day")}
      />
      <p
        style={{
          color: "red",
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        {dates.length === 0
          ? "Please select date"
          : `
         Selected Date: ${dates[0]} to ${dates[1]}`}
      </p>
    </>
  );
};
export default memo(RangePicker);
