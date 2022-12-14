import React from "react";

const CustomInputComponent = ({ label, name, handleChange, ...otherProps }) => {
  return (
    <div className="group">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        id={name}
        name={name}
        onChange={handleChange}
        {...otherProps}
      />
    </div>
  );
};

export default CustomInputComponent;
