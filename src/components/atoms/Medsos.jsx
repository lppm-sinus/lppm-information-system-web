import React from "react";
import * as FaIcons from "react-icons/fa";

const Medsos = (props) => {
  const IconComponent = FaIcons[props.iconName];
  return IconComponent ? <IconComponent /> : null;
};

export default Medsos;
