import * as React from "react";
import { ThemedView } from "../../../Areas/Common/components";
import { borderRadius } from "../../../Areas/Common/components/config/spacing";

function ItemDefaultLoading(props) {
  const { width, height, style } = props;
  return (
    <ThemedView
      colorSecondary
      style={[
        {
          width: width,
          height: height + 90,
          borderRadius: borderRadius.base,
        },
        style && style,
      ]}
    />
  );
}

export default ItemDefaultLoading;
