import h337 from "heatmap.js";
import React, { useCallback, useEffect, useMemo, useRef } from "react";

import { useState } from "react";
import { Card, RangePicker, SelectOptions, ShowData, TimeAgo } from "../../components";
import usersData from "../../data/userData.json";

import "antd/dist/reset.css";
// import "./style.css";

function Home() {
  const [valueIncrease, setValueIncrease] = useState(0);
  const [data, setData] = React.useState([]);
  const testData = useMemo(() => [], []);
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState("");
  const handleChange = (date, dateString) => {
    setDates(dateString);
    setDate(date);
  };
  const usersDataFilter = [];

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
      <SelectOptions />
      <TimeAgo />
      <RangePicker handleChange={handleChange} dates={dates} />

      <ShowData usersData={usersData} />
      <Card valueIncrease={valueIncrease} handleIncrease={handleIncrease} />
      <div className="demo-wrapper">
        <div className="heatmap"></div>
      </div>
      <button>Click</button>
    </div>
  );
}
export default Home;
