import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Text, ThemedView } from "../../../components";
import { Row, Col } from "../../../containers/Gird";

import { strDate, objectStatus } from "./config";
import { mainStack } from "../../../config/navigator";
import {
  margin,
  padding,
  borderRadius,
} from "../../../components/config/spacing";
import { lineHeights } from "../../../components/config/fonts";

const OrderItem = ({ data, style, ...rest }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { billing } = data;
  const nameBilling = `${billing.first_name} ${billing.last_name}`;
  const name = `#${data.number} ${nameBilling}`;
  const statusValue = objectStatus(data.status);
  const onPress = () =>
    navigation.navigate(mainStack.order_detail, { order: data });

  return (
    <ThemedView style={[styles.container, style && style]} colorSecondary>
      <TouchableOpacity style={styles.touch} onPress={onPress} {...rest}>
        <Row style={styles.row}>
          <Col style={styles.col}>
            <Text h4 medium style={styles.title}>
              {name}
            </Text>
            <Text style={styles.textInfo} h6 colorThird>
              {t("profile:text_code_order", { code: data.number })}
              {"\n"}
              {t("profile:text_time_order", {
                time: strDate(data.date_created),
              })}
              {"\n"}
              {t("profile:text_status_order")}
              <Text style={{ color: statusValue.color }} h6>
                {statusValue.text}
              </Text>
            </Text>
          </Col>
          <Icon
            name={statusValue.icon}
            color={statusValue.color}
            size={17}
            containerStyle={styles.icon}
          />
        </Row>
      </TouchableOpacity>
    </ThemedView>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.base,
    marginHorizontal: margin.large,
  },
  touch: {
    padding: padding.large,
  },
  row: {
    marginLeft: 0,
    marginRight: 0,
  },
  col: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  title: {
    marginBottom: margin.small,
  },
  textInfo: {
    lineHeight: lineHeights.base,
  },
  icon: {
    marginLeft: margin.large,
    marginTop: 2,
  },
});

export default OrderItem;
