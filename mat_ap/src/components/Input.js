import React from "react";
import "./Input.css";

const Input = ({ type, id, placeholder }) => {
  return (
    <input
      type={type}
      class="form-control input"
      id={id}
      placeholder={placeholder}
    />
  );
};

export default Input;
