import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { showMessage } from "react-native-flash-message";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  ThemedView,
  Text,
  Header,
  ThemeConsumer,
} from "../../Areas/Common/components";
import { TextHeader, IconHeader } from "../../containers/HeaderComponent";
import Container from "../../containers/Container";
import Input from "../../containers/input/Input";
import Button from "../../containers/Button";
import Rating from "../../containers/Rating";
import TextHtml from "../../containers/TextHtml";

import { setLoadingReview } from "../../modules/vendor/actions";
import { detailVendorSelector } from "../../modules/vendor/selectors";
import { sendReviewVendorId } from "../../modules/vendor/service";
import { validatorReview } from "../../modules/vendor/validator";

import { languageSelector } from "../../modules/common/selectors";

import { changeColor } from "../../utils/text-html";

class StoreReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      rating: 1,
      loading: false,
      error: {
        message: null,
        errors: null,
      },
    };
  }
  clickSubmit = () => {
    const { language, t } = this.props;
    const { title, content, rating } = this.state;
    const errors = validatorReview({ title, content, rating }, language);
    if (errors.size > 1) {
      this.setState({
        error: {
          message: t("notifications:text_fill_value"),
          errors: errors.toJS(),
        },
      });
    } else {
      this.setState(
        {
          loading: true,
          error: {
            message: null,
            errors: null,
          },
        },
        this.sendReview
      );
    }
  };

  sendReview = async () => {
    try {
      const { vendorDetail, navigation, dispatch } = this.props;
      const { title, content, rating } = this.state;
      await sendReviewVendorId(vendorDetail.get("id"), {
        title,
        content,
        rating,
      });
      showMessage({
        message: "Create review Success",
        type: "success",
      });
      this.setState({
        loading: false,
      });
      navigation.goBack();
      dispatch(setLoadingReview(true));
    } catch (e) {
      const error = {
        message: e.message,
        errors: null,
      };
      this.setState({
        loading: false,
        error,
      });
      // console.log('test e', e);
    }
  };
  render() {
    const { t, vendorDetail } = this.props;
    const {
      title,
      content,
      rating,
      loading,
      error: { errors, message },
    } = this.state;

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <ThemedView isFullView>
            <Header
              leftComponent={<IconHeader />}
              centerComponent={
                <TextHeader title={t("common:text_product_review_form")} />
              }
            />
            <KeyboardAvoidingView style={styles.keyboard}>
              <ScrollView>
                <Container>
                  <View style={[styles.viewContent]}>
                    <Image
                      source={
                        vendorDetail.get("gravatar")
                          ? { uri: vendorDetail.get("gravatar") }
                          : require("../../assets/images/pDefault.png")
                      }
                      resizeMode="stretch"
                      style={[styles.image]}
                    />
                    <Text medium>{vendorDetail.get("store_name")}</Text>
                    <Text colorThird style={styles.tab}>
                      {t("catalog:text_tab_star")}
                    </Text>
                    <Rating
                      size={20}
                      startingValue={rating}
                      onStartRating={(value) =>
                        this.setState({ rating: value })
                      }
                    />
                  </View>
                  {message && (
                    <TextHtml
                      value={message}
                      style={changeColor(theme.colors.error)}
                      paragraphBreak={"\n"}
                    />
                  )}
                  <Input
                    label={t("inputs:text_your_title")}
                    value={title}
                    onChangeText={(value) => this.setState({ title: value })}
                    error={errors && errors.title}
                  />
                  <Input
                    label={t("inputs:text_your_content")}
                    multiline
                    numberOfLines={8}
                    value={content}
                    onChangeText={(value) => this.setState({ content: value })}
                    error={errors && errors.content}
                  />
                  <Button
                    loading={loading}
                    title={t("common:text_submit")}
                    containerStyle={styles.button}
                    onPress={this.clickSubmit}
                  />
                </Container>
              </ScrollView>
            </KeyboardAvoidingView>
          </ThemedView>
        )}
      </ThemeConsumer>
    );
  }
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  viewContent: {
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 109,
    height: 128,
  },
  tab: {
    fontSize: 10,
    lineHeight: 15,
  },
  button: {
    marginVertical: 26,
  },
});

const mapStateToProps = (state) => {
  return {
    vendorDetail: detailVendorSelector(state),
    language: languageSelector(state),
  };
};

export default connect(mapStateToProps)(withTranslation()(StoreReview));