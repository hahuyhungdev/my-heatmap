import React, { useCallback } from "react";
import moment from "moment";
import { useState } from "react";
import { Card, RangePicker, SelectOptions, ShowData, TimeAgo } from "../../components";
// import usersData from "../../data/userData.json";
import usersData from "data/userData.json";

import "antd/dist/reset.css";

export function Home() {
  const [valueIncrease, setValueIncrease] = useState(0);
  // const [startDate, setStartDate] = useState(moment().subtract(6, "h"));
  // const [endDate, setEndDate] = useState(moment());
  const [dates, setDates] = useState(["", ""]);
  const [date, setDate] = useState("");

  const handleChange = (data) => {
    // convert dataString to convert date to timestamp
    console.log("dataForm", data.RangeDate);
    const convertDate = data.RangeDate.map((item) => {
      console.log("itemRangedDate", moment(item).unix());
      return moment(item.$d).unix();
    });
    console.log("convertDate", convertDate);
    setDates(convertDate);
    setDate(data);
  };
  // console.log(dates);

  // filter data by date range with timestamp
  console.log("dates", dates);
  const filterData = usersData.filter((item) => {
    console.log("item", item.date > dates[0]);
    return item.date >= dates[0] && item.date <= dates[1];
  });
  // console.log("filterData", filterData);
  const handleIncrease = useCallback(() => {
    setValueIncrease((prev) => prev + 1);
  }, []);
  return (
    <div className="App">
      <h2>Start editing to see some magic happen!</h2>
      <SelectOptions />
      <TimeAgo />
      <RangePicker handleChange={handleChange} dates={dates} />

      <ShowData usersData={filterData} />
      <Card valueIncrease={valueIncrease} handleIncrease={handleIncrease} />
    </div>
  );
}
export default Home;
