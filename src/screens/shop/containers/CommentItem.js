import React from "react";
import merge from "lodash/merge";
import { StyleSheet } from "react-native";
import { withTheme, Avatar, Text } from "../../../Areas/Common/components";
import { Row, Col } from "../../../containers/Gird";
import TextHtml from "../../../containers/TextHtml";
import Rating from "../../../containers/Rating";
import Container from "../../../containers/Container";

import { timeAgo } from "../../../utils/time";

import {
  margin,
  padding,
} from "../../../Areas/Common/components/config/spacing";
import { changeColor, changeSize } from "../../../utils/text-html";

const CommentItem = ({ data, theme, tz }) => {
  if (!data) {
    return null;
  }
  return (
    <Container
      style={[
        styles.container,
        {
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Row style={styles.row}>
        <Avatar
          source={
            data.reviewer_avatar_urls && data.reviewer_avatar_urls["96"]
              ? { uri: data.reviewer_avatar_urls["96"] }
              : require("../../../assets/images/pDefault.png")
          }
          size={40}
          rounded
        />
        <Col style={styles.center}>
          <Text medium>{data.reviewer}</Text>
          <Rating size={12} startingValue={data.rating} readonly />
        </Col>
        <Text colorThird style={styles.textCreateAt}>
          {timeAgo(data.date_created, tz)}
        </Text>
      </Row>
      <TextHtml
        value={data.review}
        style={merge(changeSize("h6"), changeColor(theme.Text.third.color))}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: padding.large,
    borderBottomWidth: 1,
  },
  textCreateAt: {
    fontSize: 9,
    lineHeight: 12,
  },
  row: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: margin.large,
  },
  center: {
    paddingLeft: padding.small,
    paddingRight: padding.small,
  },
});

export default withTheme(CommentItem);