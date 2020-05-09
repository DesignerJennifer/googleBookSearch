import React from "react";

export function Label(props) {
  return (
    <label htmlFor={props.name}>{props.childre}</label>
  );
}
