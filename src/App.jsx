import h337 from "heatmap.js";
import React, { useEffect, useMemo, useRef } from "react";
import mqtt from "precompiled-mqtt";

import "./style.css";

function App() {
  const [data, setData] = React.useState([]);
  const testData = useMemo(() => [], []);
  const points = useRef({});
  const client = mqtt.connect("wss://test.mosquitto.org:8081");

  // client.on("connect", () => {
  //   setInterval(() => {
  //     client.publish("dataMqtt", "data");
  //   }, 5000);
  //   client.subscribe("dataMqtt");
  //   client.on("message", (topic, message) => {
  //     console.log(message.toString());
  //   });
  // });
  useEffect(() => {
    var heatmapInstance = h337.create({
      container: document.querySelector(".demo-wrapper"),
      radius: 10,
      maxOpacity: 2.5,
      minOpacity: 0,
      blur: 0.75,
      height: 500,
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
      // save test data to local storage limit 100
      if (testData.length < 100) {
        localStorage.setItem("testData", JSON.stringify(testData));
      }
      if (points.current !== null && points.current !== undefined) {
        client.publish("dataMqtt", JSON.stringify(points.current));
        heatmapInstance.addData(points.current === null ? dataLocal : points.current);
      }
    };

    heatmapInstance.addData(dataLocal === null ? data : dataLocal);

    // heatmapInstance.addData(points.current);
  }, [data, testData, client]);
  client.subscribe("dataMqtt");
  client.on("message", (topic, message) => {
    console.log("message", message.toString());
  });
  // handle reset data
  const handleResetData = () => {
    localStorage.removeItem("testData");
    window.location.reload();
  };
  return (
    <div className="App">
      <h2>Start editing to see some magic happen!</h2>
      <div className="demo-wrapper">
        <div className="heatmap"></div>
      </div>
      <button
        style={{
          height: "30px",
          borderRadius: "10px",
          backgroundColor: "#f44336",
          display: "flex",
          cursor: "pointer",
          margin: "0 auto 20px",
          padding: "10px",
          alignItems: "center",
        }}
        className="resetData"
        onClick={() => {
          handleResetData();
        }}
      >
        Reset Data
      </button>
    </div>
  );
}
export default App;
