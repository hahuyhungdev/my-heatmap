import h337 from "heatmap.js";
import React, { useEffect, useMemo, useRef, useState } from "react";
// import mqtt from "precompiled-mqtt";
import mqtt from "mqtt";

import "./style.css";

function App() {
  const [dataApp, setDataApp] = React.useState([]);

  const [typeGetValue, setTypeGetValue] = useState(false);
  const testData = useMemo(() => [], []);
  const points = useRef({});
  var client = mqtt.connect("ws://192.168.1.148:1884", {
    clientId: "mqttx_d8338b48qwe",
    password: "admin",
    username: "localweb",
  });

  // client.on("connect", () => {
  //   setInterval(() => {
  //     client.publish("dataMqtt", "data");
  //   }, 5000);
  //   client.subscribe("dataMqtt");
  //   client.on("message", (topic, message) => {
  //     console.log(message.toString());
  //   });
  // });
  // handle activeGetvalue button get value
  console.log(typeGetValue === false ? "Get value" : "Stop get value");
  const handleActiveGetValue = () => {
    setTypeGetValue(!typeGetValue);
  };
  useEffect(() => {
    var heatmapInstance = h337.create({
      // container: document.querySelector(".demo-wrapper"),
      container: document.querySelector(typeGetValue === false ? ".demo-wrapper" : ".heatmap"),
      radius: 20,
      maxOpacity: 2.5,
      minOpacity: 0,
      blur: 0.75,
      height: 500,
    });
    var demoWrapper = document.querySelector(".demo-wrapper");
    var tooltip = document.querySelector(".tooltip");
    var dataLocal = JSON.parse(localStorage.getItem("testData"));
    var max = 0;
    var val = Math.floor(Math.random() * 100);
    function updateTooltip(x, y, value) {
      // + 15 for distance to cursor
      var transform = "translate(" + (x + 15) + "px, " + (y + 15) + "px)";
      tooltip.style.MozTransform = transform; /* Firefox */
      tooltip.style.msTransform = transform; /* IE (9+) - note ms is lowercase */
      tooltip.style.OTransform = transform; /* Opera */
      tooltip.style.WebkitTransform = transform; /* Safari and Chrome */
      tooltip.style.transform = transform; /* One day, my pretty */
      tooltip.innerHTML = value;
    }

    demoWrapper.onmousemove = function (ev) {
      if (typeGetValue === false) {
        points.current = {
          x: ev.layerX,

          y: ev.layerY,
          value: Math.floor(Math.random() * 100),
        };
        // console.log(points.current);
        testData.push(points.current);
        setDataApp(testData);

        // save test data to local storage limit 100
        if (testData.length < 500) {
          localStorage.setItem("testData", JSON.stringify(testData));
        }
        if (points.current !== null && points.current !== undefined) {
          client.publish("dataMqtt", JSON.stringify(points.current));
          heatmapInstance.addData(points.current === null || typeGetValue ? dataLocal : points.current);
          // heatmapInstance.addData(dataLocal);
        }
      } else {
        var x = ev.layerX;
        var y = ev.layerY;
        var value = heatmapInstance.getValueAt({
          x: x,
          y: y,
        });

        updateTooltip(x, y, value);
        tooltip.style.display = "block";
      }
    };
    demoWrapper.onmouseout = function () {
      tooltip.style.display = "none";
    };
    console.log(dataApp);
    heatmapInstance.setData({
      max: Math.max(max, val),
      data: dataLocal === null ? dataApp : dataLocal,
    });
  }, [dataApp, testData, client, typeGetValue]);
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
        <div className="tooltip"></div>
      </div>
      <div
        className="function"
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          className="resetData"
          onClick={() => {
            handleResetData();
          }}
        >
          Reset Data
        </button>
        <button className="activeGetvalue" onClick={handleActiveGetValue}>
          {typeGetValue === false ? "Get value" : "Stop get value"}
        </button>
      </div>
    </div>
  );
}
export default App;
