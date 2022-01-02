import React from "react";
import { Button as ButtonRN } from "../Areas/Common/components";

const Button = ({ ...rest }) => {
  return <ButtonRN {...rest} />;
};

export default Button;
