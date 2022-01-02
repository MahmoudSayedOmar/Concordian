import React from "react";
import { connect } from "react-redux";
import merge from "lodash/merge";

import { View, Image, Dimensions, ScrollView, StyleSheet } from "react-native";
import { Text, ThemeConsumer } from "../../../Areas/Common/components";
import ChooseItem from "../../../containers/ChooseItem";
import TextHtml from "../../../containers/TextHtml";
import Heading from "../../../containers/Heading";

import { paymentGatewaysSelector } from "../../../modules/common/selectors";

import {
  borderRadius,
  margin,
  padding,
} from "../../../Areas/Common/components/config/spacing";
import { lineHeights } from "../../../Areas/Common/components/config/fonts";
import { changeColor, changeLineHeight } from "../../../utils/text-html";

const width = Dimensions.get("window").width;
const paymentAccept = ["cod", "stripe", "bacs", "cheque", "paypal", "razorpay"];
const icons = {
  cod: require("../../../assets/images/gateway/cod.png"),
  stripe: require("../../../assets/images/gateway/stripe.png"),
  bacs: require("../../../assets/images/gateway/bacs.png"),
  cheque: require("../../../assets/images/gateway/cheque.png"),
  paypal: require("../../../assets/images/gateway/paypal.png"),
  razorpay: require("../../../assets/images/gateway/razorpay.png"),
};

function PaymentMethod(props) {
  const { lists, selected, selectMethod } = props;

  const methods = lists
    .get("data")
    .filter(
      (payment) =>
        payment.get("enabled") && paymentAccept.includes(payment.get("id"))
    )
    .toJS();

  const method = methods.find((m) => m.id === selected);

  const renderItem = (item) => {
    const topElement = (
      <Image
        source={icons[item.id]}
        style={styles.imageItem}
        resizeMode="stretch"
      />
    );
    const bottomElement = <Text medium>{item.title}</Text>;
    return (
      <ChooseItem
        key={item.id}
        item={item}
        onPress={() => selectMethod(item.id)}
        active={selected && item.id && item.id === selected}
        topElement={topElement}
        bottomElement={bottomElement}
        containerStyle={styles.item}
      />
    );
  };

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {methods.map((item) => renderItem(item))}
          </ScrollView>
          {method ? (
            <>
              <Heading
                title={method.title}
                containerStyle={styles.headerText}
              />
              <View
                style={[
                  styles.viewMethodInfo,
                  { borderColor: theme.colors.border },
                ]}
              >
                {method.id === "stripe" ? (
                  <Image
                    source={require("../../../assets/images/gateway/stripesuport.png")}
                    style={styles.imageInfo}
                  />
                ) : null}
                <TextHtml
                  value={method.description}
                  style={merge(
                    changeColor(theme.Text.secondary.color),
                    changeLineHeight(lineHeights.h4)
                  )}
                />
              </View>
            </>
          ) : null}
        </View>
      )}
    </ThemeConsumer>
  );
}

const styles = StyleSheet.create({
  headerText: {
    paddingTop: 30,
    paddingBottom: padding.large,
  },
  item: {
    marginRight: margin.base,
  },
  viewMethodInfo: {
    padding: padding.big,
    borderWidth: 1,
    borderRadius: borderRadius.large,
  },
  imageInfo: {
    marginBottom: margin.large,
  },
  tabContent: {
    flex: 1,
    width: width,
  },
  imageItem: {
    height: 30,
    marginTop: 4,
    marginBottom: 6,
  },
});

const mapStateToProps = (state) => ({
  paymentGateway: paymentGatewaysSelector(state),
});

export default connect(mapStateToProps, null)(PaymentMethod);
