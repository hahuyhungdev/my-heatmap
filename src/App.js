import h337 from "heatmap.js";
import React, { useEffect, useMemo } from "react";

import "./style.css";

function App() {
  const [data, setData] = React.useState([]);
  const testData = useMemo(() => [], []);
  console.log("render");
  useEffect(() => {
    var heatmapInstance = h337.create({
      container: document.querySelector(".demo-wrapper"),
      radius: 15,
      maxOpacity: 2.5,
      minOpacity: 0,
      blur: 0.75,
    });
    // const logs = [];
    document.querySelector(".demo-wrapper").onmousemove = function (ev) {
      const point = {
        x: ev.layerX,
        y: ev.layerY,
        value: Math.random() * 100,
      };
      // logs.push(point);
      // console.log(logs);
      // check if the point is already in the array
      if (testData.some((e) => e.x === point.x && e.y === point.y)) {
        // if it is, update the value
        testData.forEach((e) => {
          if (e.x === point.x && e.y === point.y) {
            e.value = point.value;
          }
        });
      } else {
        // if it is not, add it to the array
        testData.push(point);
      }
      // console.log(point);
      // clonet the array testData
      // const clone = testData;
      // console.log(clone);
      setData(testData);
      console.log(testData);
      heatmapInstance.addData(point);
    };
  }, [testData]);

  return (
    <div className="App">
      <h2>Start editing to see some magic happen!</h2>
      <div className="demo-wrapper">
        <div className="heatmap"></div>
      </div>
      <button>Click</button>
    </div>
  );
}
export default App;
