import { Button, DatePicker, Form, Input } from "antd";
import moment from "moment";
import React, { memo } from "react";

export const RangePicker = memo(({ dates, handleChange }) => {
  return (
    <div className="TimeAgo" style={{ margin: "20px" }}>
      <Form
        autoComplete="off"
        wrapperCol={{ span: 14 }}
        onFinish={handleChange}
        // onFinish={onFinish}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
        initialValues={{
          datePicker: [dates[0], dates[1]],
        }}
      >
        <Form.Item wrapperCol={{ span: 14 }} name="RangeDate" label="input timestamp" hasFeedback>
          <DatePicker.RangePicker
            // onChange={handleChange}
            showTime={{ format: "HH" }}
            format="YYYY-MM-DD HH"
            placeholder={["Start Date", "End Date"]}
            disabledDate={(current) => current && current > moment().endOf("day")}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 4 }} style={{ display: "inline-flex", minWidth: "80px" }}>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default RangePicker;
