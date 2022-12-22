import { Button, DatePicker, Form, Input } from "antd";
import moment from "moment";
import React from "react";

export const TimeAgo = () => {
  const [inputTimestamp, setInputTimestamp] = React.useState(moment().unix());
  const [inputDate, setInputDate] = React.useState(moment().format("YYYY,MM,DD HH:mm:ss"));

  console.log("currentTime", inputDate);
  // convert timestamp to format date
  const ConvertTimestamp = moment.unix(inputTimestamp).format("YYYY,MM,DD HH:mm:ss");

  // console.log(date.fromNow(true));
  var a = moment([2007, 10, 1]);
  var b = moment([2007, 10, 3]);
  // console.log(a.from(b));

  // convert date to timestamp
  const convertDateToTimestamp = moment(inputDate, "YYYY,MM,DD HH:mm:ss").unix();
  console.log("convertDateToTimestamp", convertDateToTimestamp);
  //Relative
  const Relative = moment.unix(convertDateToTimestamp).fromNow();
  const onFinish = (values) => {
    setInputTimestamp(values.timestamp);
    // setInputDate(values.inputdate || values.datePicker);
    console.log("values", values);
  };
  return (
    <div className="TimeAgo" style={{ margin: "20px" }}>
      <Form
        autoComplete="off"
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
        initialValues={{
          timestamp: inputTimestamp,
        }}
      >
        <Form.Item name="timestamp" label="input timestamp">
          <Input placeholder="input timestamp" />
        </Form.Item>

        <h3>This Time:{ConvertTimestamp}</h3>
        <Form.Item name="datePicker" label="input datePicker">
          <DatePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY,MM,DD HH:mm"
            onChange={(value, dateString) => {
              console.log("dateString", dateString);
              setInputDate(dateString);
            }}
          />
        </Form.Item>
        {/* <Form.Item name="inputdate" label="input timestamp">
          <Input placeholder="input date" width={200} />
        </Form.Item> */}

        <h3>This timestamp:{convertDateToTimestamp}</h3>
        <h3> it was ago: {Relative}</h3>
        <Form.Item wrapperCol={{ span: 4 }}>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TimeAgo;
