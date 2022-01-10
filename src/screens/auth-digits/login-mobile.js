import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import trim from "lodash/trim";

import { StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import { Loading } from "../../components";
import {
  ThemedView,
  Text,
  Header,
  Button,
  ThemeConsumer,
} from "../../components";
import { IconHeader, TextHeader } from "../../containers/HeaderComponent";
import Container from "../../containers/Container";
import InputMobile from "../../containers/input/InputMobile";
import TextHtml from "../../containers/TextHtml";

import ModalVerify from "./containers/ModalVerify";

import { authSelector } from "../../modules/auth/selectors";
import { languageSelector } from "../../modules/common/selectors";
import { signInWithOtp } from "../../modules/auth/actions";

import { showMessage } from "react-native-flash-message";

import { margin } from "../../components/config/spacing";
import { changeColor } from "../../utils/text-html";
import { digitsSendOtp } from "../../modules/auth/service";
import { INITIAL_COUNTRY } from "../../config/config-input-phone-number";

class LoginMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      phone_number: "989222330",
      country_no: "+84",
      visibleModal: false,
      loading: false,
      error: {
        message: null,
        errors: null,
      },
    };
  }

  /**
   * Do login SMS
   * @param verify
   * @returns {Promise<void>}
   */
  handleLogin = async (otp) => {
    try {
      if (otp) {
        this.setState({
          loading: false,
          visibleModal: false,
        });
        // const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
        // this.props.dispatch(signInWithMobile(idTokenResult.token));

        const { country_no, phone_number } = this.state;

        const data = {
          countrycode: country_no,
          user: phone_number.replace(country_no, ""),
          otp,
        };

        this.props.dispatch(signInWithOtp(data));
      }
    } catch (e) {
      showMessage({
        message: e.message,
        type: "danger",
      });
    }
  };

  /**
   * Handle login mobile
   * @returns {Promise<void>}
   */
  clickLogin = async () => {
    try {
      const { phone_number, country_no } = this.state;

      if (country_no && phone_number) {
        this.setState({
          loading: true,
        });

        const dataRequest = {
          countrycode: country_no,
          mobileNo: phone_number.replace(country_no, ""),
          type: "login",
          whatsapp: 0,
        };
        const { code } = await digitsSendOtp(dataRequest);

        if (code === 1 || code === "1") {
          this.setState({
            visibleModal: true,
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      } else {
        console.log("error");
        this.setState({
          loading: false,
        });
      }
    } catch (e) {
      showMessage({
        message: e.message,
        type: "danger",
      });
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const {
      t,
      auth: { pendingMobile },
    } = this.props;
    const { phone_number, country_no, error, loading, visibleModal } =
      this.state;
    const { message, errors } = error;
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <ThemedView isFullView>
            <Loading visible={pendingMobile} />
            <Header
              leftComponent={<IconHeader />}
              centerComponent={
                <TextHeader title={t("common:text_signin_mobile")} />
              }
            />
            <KeyboardAvoidingView behavior="padding">
              <ScrollView>
                <Container style={styles.content}>
                  <Text style={styles.description} colorSecondary>
                    {t("auth:text_description_login_mobile")}
                  </Text>
                  {message ? (
                    <TextHtml
                      value={message}
                      style={changeColor(theme.colors.error)}
                    />
                  ) : null}
                  <InputMobile
                    value={phone_number}
                    initialCountry={INITIAL_COUNTRY}
                    onChangePhoneNumber={({ value, code }) =>
                      this.setState({
                        phone_number: trim(value),
                        country_no: code,
                      })
                    }
                    error={errors && errors.phone_number}
                  />
                  <Button
                    title={t("common:text_signin")}
                    containerStyle={styles.button}
                    loading={loading || pendingMobile}
                    onPress={this.clickLogin}
                  />
                </Container>
              </ScrollView>
            </KeyboardAvoidingView>
            <ModalVerify
              visible={visibleModal}
              handleVerify={this.handleLogin}
              setModalVisible={(value) =>
                this.setState({
                  visibleModal: value,
                  loading: false,
                })
              }
              data={{
                countrycode: country_no,
                mobileNo: phone_number.replace(country_no, ""),
                type: "login",
                whatsapp: 0,
              }}
            />
          </ThemedView>
        )}
      </ThemeConsumer>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginTop: margin.base,
  },
  description: {
    marginBottom: margin.large,
  },
  button: {
    marginVertical: margin.big,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: authSelector(state),
    language: languageSelector(state),
  };
};

export default connect(mapStateToProps)(withTranslation()(LoginMobile));
