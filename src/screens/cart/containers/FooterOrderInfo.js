import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Divider, Text } from "../../../Areas/Common/components";
import { Col, Row } from "../../../containers/Gird";
import Button from "../../../containers/Button";
import { padding } from "../../../Areas/Common/components/config/spacing";

const FooterOrderInfo = ({
  shipping,
  discount,
  tax,
  total,
  onPressConfirm,
  loading,
  style,
}) => {
  const { t } = useTranslation();
  return (
    <View style={style && style}>
      <Divider />
      <Row style={styles.viewPrice}>
        <Col style={styles.priceLeft}>
          <Text colorThird>
            {t("cart:text_payment_shipping", { cost: shipping })}
          </Text>
          <Text colorThird>
            {t("cart:text_payment_discount", { cost: discount })}
          </Text>
          <Text colorThird>{t("cart:text_payment_tax", { cost: tax })}</Text>
        </Col>
        <Text medium h2>
          {total}
        </Text>
      </Row>
      <Button
        title={t("common:text_confirm")}
        onPress={onPressConfirm}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewPrice: {
    paddingVertical: padding.large,
    alignItems: "flex-end",
    marginLeft: 0,
    marginRight: 0,
  },
  priceLeft: {
    paddingLeft: 0,
    paddingRight: padding.large,
  },
});

export default FooterOrderInfo;