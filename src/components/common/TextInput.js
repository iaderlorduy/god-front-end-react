import React from "react";
import PropTypes from "prop-types";

const TextInput = ({ name, label, onChange, onBlur, value, error }) => {
  let wrapperClass = "form-textbox";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }
  return (
    <>
      <div className={wrapperClass} id={name}>
        <input
          name={name}
          className="form-input"
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          required="required"
        />
        <span className="form-label">{label}</span>
        {error && <div className="error-label">{error}</div>}
      </div>
    </>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;
