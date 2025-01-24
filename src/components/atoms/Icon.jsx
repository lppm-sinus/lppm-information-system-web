import React from "react";
import * as FaIcons from "react-icons/fa";

const Icon = (props) => {
  const IconComponent = FaIcons[props.iconName];
  return IconComponent ? <IconComponent /> : null;
};

export default Icon;
