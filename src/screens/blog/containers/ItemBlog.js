import React from "react";
import { useNavigation } from "@react-navigation/native";
import unescape from "lodash/unescape";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { withTheme, Text, Image } from "../../../components";
import InfoViewer from "./InfoViewer";

import { mainStack } from "../../../config/navigator";
import {
  margin,
  padding,
  borderRadius,
} from "../../../components/config/spacing";

import { timeAgo } from "../../../utils/time";

const ItemBlog = ({ item, theme, width, height, style, tz }) => {
  const navigation = useNavigation();
  if (!item || typeof item !== "object") {
    return null;
  }
  const imageStyle = {
    width,
    height,
    // flex: 1,
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: theme.colors.border,
        },
        style && style,
      ]}
      onPress={() => navigation.navigate(mainStack.blog, { blog: item })}
    >
      <Image
        source={
          item.rnlab_featured_media_url
            ? { uri: item.rnlab_featured_media_url }
            : require("../../../assets/images/pDefault.png")
        }
        resizeMode="contain"
        style={imageStyle}
        containerStyle={styles.viewImage}
      />
      <View style={styles.viewRight}>
        <Text h4 medium style={styles.name} numberOfLines={2}>
          {unescape(item.title.rendered)}
        </Text>
        <Text h6 colorThird style={styles.time}>
          {timeAgo(item.date, tz)}
        </Text>
        <InfoViewer categories={item._categories} urlUser={item.author_url} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: padding.big,
    borderBottomWidth: 1,
  },
  viewImage: {
    borderRadius: borderRadius.base,
    overflow: "hidden",
  },
  viewRight: {
    marginLeft: margin.large,
    flex: 1,
  },
  name: {
    marginBottom: margin.small,
  },
  time: {
    marginBottom: margin.big - 4,
  },
});

ItemBlog.defaultProps = {
  width: 137,
  height: 123,
};

export default withTheme(ItemBlog);
