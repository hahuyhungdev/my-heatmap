import h337 from "heatmap.js";
import React, { useEffect, useMemo, useRef, useCallback } from "react";
import RangePicker from "./components/RangePicker";
import usersData from "./data/fake";
import { Card, ShowData, Test } from "./components";
import { useState } from "react";
import { dateStringsNumber } from "./utils";

import "./style.css";
import "antd/dist/reset.css";

function App() {
  const [valueIncrease, setValueIncrease] = useState(0);
  const [data, setData] = React.useState([]);
  const testData = useMemo(() => [], []);
  const [dates, setDates] = useState([]);

  const handleChange = (dates, dateStrings) => {
    setDates(dateStrings);
    dateStringsNumber(dateStrings);
    console.log(dateStringsNumber(dateStrings));
  };

  // handle usersData flow dates selected
  // type of user.date is string, type of dates[0] is string.
  // if number user.date >= dates[0] and user.date <= dates[1] => return true
  const usersDataFlow = useMemo(() => {
    return usersData.filter((user) => {
      console.table(
        Number(user.date.replace(/-/g, "")) >= dateStringsNumber(dates)[0] &&
          Number(user.date.replace(/-/g, "")) <= dateStringsNumber(dates)[1]
      );
      return (
        Number(user.date.replace(/-/g, "")) >= dateStringsNumber(dates)[0] &&
        Number(user.date.replace(/-/g, "")) <= dateStringsNumber(dates)[1]
      );
    });
  }, [dates]);

  const points = useRef({});
  useEffect(() => {
    var heatmapInstance = h337.create({
      container: document.querySelector(".demo-wrapper"),
      radius: 15,
      maxOpacity: 2.5,
      minOpacity: 0,
      blur: 0.75,
    });
    // const logs = [];
    var dataLocal = localStorage.getItem("testData");
    dataLocal = JSON.parse(dataLocal);
    document.querySelector(".demo-wrapper").onmousemove = function (ev) {
      points.current = {
        x: ev.layerX,
        y: ev.layerY,
        value: Math.random() * 100,
      };
      // console.log(points.current);
      testData.push(points.current);
      setData(testData);
      // save test data to local storage
      localStorage.setItem("testData", JSON.stringify(testData));

      // console.log(data);
      heatmapInstance.addData(points.current === null ? dataLocal : points.current);
    };

    heatmapInstance.addData(dataLocal === null ? data : dataLocal);

    // heatmapInstance.addData(points.current);
  }, [data, testData]);
  const handleIncrease = useCallback(() => {
    setValueIncrease((prev) => prev + 1);
  }, []);
  return (
    <div className="App">
      <h2>Start editing to see some magic happen!</h2>
      <RangePicker handleChange={handleChange} dates={dates} />

      <ShowData usersData={usersDataFlow} />
      <Test />
      <Card valueIncrease={valueIncrease} handleIncrease={handleIncrease} />
      <div className="demo-wrapper">
        <div className="heatmap"></div>
      </div>
      <button>Click</button>
    </div>
  );
}
export default App;
