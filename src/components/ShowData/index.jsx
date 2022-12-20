import React, { memo } from "react";
// import usersData from "../../data/fake.js";
export const ShowData = ({ usersData }) => {
  console.log("usersData");
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
            <span>{user.username}</span>
            <span>{user.date}</span>
          </div>
        );
      })}
    </div>
  );
};

export default memo(ShowData);
