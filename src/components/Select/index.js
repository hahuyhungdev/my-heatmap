import React, { memo } from "react";
import { Select } from "antd";

export const SelectOptions = memo(() => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  // options are 1 hour ago, 2 hour,..., 24 hour ago
  const options = [...Array(24).keys()].map((i) => {
    return {
      label: `${i + 1} hour ago`,
      value: (i + 1) * 60 * 60 * 1000,
    };
  });
  return <Select defaultValue="1 hour ago" style={{ width: 120 }} onChange={handleChange} options={options} />;
});

export default SelectOptions;
