import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const navHomePage = () => {
    navigate("/");
  };
  return (
    <div>
      <button onClick={navHomePage}>Home</button>
      <div
        style={{
          margin: "50px 0 50px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontSize: "40px",
        }}
      >
        <div>
          <h1>
            {" "}
            AL<span style={{ fontSize: "30px" }}>gorithm</span> T
            <span style={{ fontSize: "30px" }}>rends</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
