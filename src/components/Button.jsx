import React from "react";

const Button = (props) => {
  return (
    <button
      className={`${props.className} btn-primary`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </button>
  );
};
const ButtonOuline = (props) => {
  return (
    <button
      className={`${props.className} btn-outline`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </button>
  );
};
export { ButtonOuline };
export default Button;
