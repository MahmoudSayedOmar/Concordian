import * as React from "react";
import { ThemedView, ThemeConsumer } from "../../../Areas/Common/components";

function ItemProductLoading(props) {
  const { style } = props;
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <ThemedView
          colorSecondary
          style={[
            {
              height: 130,
              borderBottomWidth: 1,
              borderColor: theme.colors.border,
            },
            style && style,
          ]}
        />
      )}
    </ThemeConsumer>
  );
}

export default ItemProductLoading;
