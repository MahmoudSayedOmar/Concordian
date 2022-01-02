import * as React from "react";
import { StyleSheet } from "react-native";
import {Image} from 'react-native';

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";
import ScrollableTabViewComponent from "../../src/Areas/Common/components/ScrollableTabView/index";
import ThemedPricingCard, {PricingCard} from "../../src/Areas/Common/components/pricing/PricingCard";


import { margin } from "../../src/Areas/Common/components/config/spacing";
import {
  darkColors,
  getThemeLight,
} from "../../src/Areas/Common/components/config/colors";
import fonts, {
  lineHeights,
  sizes,
} from "../../src/Areas/Common/components/config/fonts";
import { ThemeProvider } from "../../src/Areas/Common/components/config";

export default function TabOneScreen({ navigation, theme, colors }: any) {
  const themeColor = theme === "light" ? getThemeLight(colors) : darkColors;
  return (
    <ThemeProvider theme={themeColor}>
      <View style={styles.container}>
        <Text style={styles.title}>Tab One</Text>
<ScrollableTabViewComponent>
        <PricingCard
        theme={themeColor}          
        info={['1 User', 'Basic Support', 'All Core Features']}
        button={{title: 'GET STARTED', icon: 'flight-takeoff'}}
        />
           <ThemedPricingCard
          price="$0"
          info={['1 User', 'Basic Support', 'All Core Features']}
          button={{title: 'GET STARTED', icon: 'flight-takeoff'}}
          />
              </ScrollableTabViewComponent>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  viewBadge: {
    marginHorizontal: margin.small,
  },
  badge: {
    height: 14,
  },
  textBadge: {
    lineHeight: 14,
    ...fonts.regular,
  },
});
