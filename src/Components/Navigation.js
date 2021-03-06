import React from "react";
import Magnifier from "../Assets/Images/search.png";
import Dots from "../Assets/Images/more.png";
import Arrow from "../Assets/Images/back.png";

export default function Navigation() {
  return (
    <>
      <div className="navigation-bar">
        <div className="navigation-back">
          <img src={Arrow} alt="arrow" />
        </div>
        <div className="navigation-page-title">
          <h3>صورتحساب</h3>
        </div>
        <div className="navigation-controls">
          <img src={Magnifier} alt="search" />
          <img src={Dots} alt="more" />
        </div>
      </div>
    </>
  );
}
