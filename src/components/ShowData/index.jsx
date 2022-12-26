import React, { memo } from "react";
import moment from "moment";
// import usersData from "../../data/fake.js";
export const ShowData = memo(({ usersData }) => {
  // console.log("usersData");
  // const usernameList = usersData.map((item) => item.username.map((point) => point.value));
  return (
    <div className="listUsers">
      {usersData.map((user, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <span>{JSON.stringify(user.username)}</span>
            <span>{moment.unix(user.date).format("YYYY - MM - DD HH:mm")}</span>
          </div>
        );
      })}
    </div>
  );
});

export default memo(ShowData);
