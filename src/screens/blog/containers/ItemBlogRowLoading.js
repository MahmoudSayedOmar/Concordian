import * as React from "react";
import { ThemedView } from "../../../components";
import { borderRadius } from "../../../components/config/spacing";

function ItemBlogRowLoading(props) {
  const { width, height, style } = props;
  return (
    <ThemedView
      colorSecondary
      style={[
        {
          width,
          height: height + 130,
          borderRadius: borderRadius.base,
        },
        style && style,
      ]}
    />
  );
}

export default ItemBlogRowLoading;
