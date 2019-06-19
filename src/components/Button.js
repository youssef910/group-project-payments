import React from "react";
import "./Button.css";

function Button(props) {
  return (
    <button onClick={props.onClick} className="Button">
      Cancel
    </button>
  );
}

export default Button;
