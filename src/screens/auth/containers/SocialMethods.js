import React from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet, View, Platform } from "react-native";
import { Loading } from "../../../components";
import SocialIcon from "../../../containers/SocialIcon";
import * as google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";

import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from "@invertase/react-native-apple-authentication";

import {
  signInWithApple,
  signInWithFacebook,
  signInWithGoogle,
} from "../../../modules/auth/actions";
import { authSelector } from "../../../modules/auth/selectors";

import { authStack } from "../../../config/navigator";

import { margin } from "../../../components/config/spacing";
import { configsSelector } from "../../../modules/common/selectors";
import { GOOGLE_SIGN_IN_CONFIG } from "../../../config/auth";

function SocialMethods(props) {
  const navigation = useNavigation();
  const {
    style,
    auth: { pendingFacebook, pendingGoogle, pendingApple },
    configs,
    dispatch,
  } = props;
  const { toggleLoginFacebook, toggleLoginGoogle, toggleLoginSMS } =
    configs.toJS();
  const loginFacebook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "908287013165037",
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile", "email"],
        });
      console.log("expirationDate", expirationDate);
      console.log("permissions", permissions);
      console.log("declinedPermissions", declinedPermissions);

      if (type === "success") {
        console.log(token);
        // Get the user's name using Facebook's Graph API
        dispatch(signInWithFacebook(token));
      } else {
        // type === 'cancel'
      }
    } catch (e) {
      console.log("Login fail with error: " + e);
    }
  };

  const loginGoogle = async () => {
    google
      .logInAsync(GOOGLE_SIGN_IN_CONFIG)
      .then((result) => {
        dispatch(signInWithGoogle(result.idToken));
      })
      .catch((error) => {
        console.log(error);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      });
  };

  const onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });
      dispatch(signInWithApple(appleAuthRequestResponse));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={[styles.container, style && style]}>
      <Loading visible={pendingGoogle || pendingFacebook || pendingApple} />
      {toggleLoginFacebook ? (
        <SocialIcon
          button
          iconSize={16}
          type="facebook-official"
          raised={false}
          style={styles.socialIconStyle}
          onPress={loginFacebook}
        />
      ) : null}
      {toggleLoginGoogle ? (
        <SocialIcon
          button
          iconSize={16}
          raised={false}
          type="google-plus-square"
          style={styles.socialIconStyle}
          onPress={loginGoogle}
        />
      ) : null}
      {toggleLoginSMS ? (
        <SocialIcon
          type="commenting"
          iconSize={16}
          button
          raised={false}
          style={styles.socialIconStyle}
          onPress={() => navigation.navigate(authStack.login_mobile)}
          fontStyle={styles.textButtonSocial}
        />
      ) : null}
      {Platform.OS === "ios" ? (
        <SocialIcon
          type="apple"
          iconSize={16}
          button
          raised={false}
          style={styles.socialIconStyle}
          onPress={onAppleButtonPress}
          fontStyle={styles.textButtonSocial}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialIconStyle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 0,
    marginHorizontal: margin.large / 2,
    marginVertical: 0,
  },
  textButtonSocial: {
    marginLeft: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: authSelector(state),
    configs: configsSelector(state),
  };
};
export default connect(mapStateToProps)(SocialMethods);
