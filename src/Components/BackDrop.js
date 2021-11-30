import React from "react";

export default function BackDrop(props) {
  return props.show ? (
    <div className="backDrop" onClick={props.click}>
      {props.children}
    </div>
  ) : null;
}
