// @flow
import * as React from "react";
import { ViewPropTypes } from "react-native";
import { ThemedView } from "../../../Areas/Common/components";
import { borderRadius } from "../../../Areas/Common/components/config/spacing";

type Props = {
  style?: ViewPropTypes,
};

function ItemSecondary(props: Props) {
  const { style } = props;
  return (
    <ThemedView
      colorSecondary
      style={[
        {
          width: 135,
          height: 150,
          borderRadius: borderRadius.large,
        },
        style && style,
      ]}
    />
  );
}

export default ItemSecondary;
