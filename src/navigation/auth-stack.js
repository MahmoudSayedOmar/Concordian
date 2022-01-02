import React from "react";

import { authStack } from "../config/navigator";

import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/auth/login";
import LoginMobile from "../screens/auth/login-mobile";
import Register from "../screens/auth/register";
import Forgot from "../screens/auth/forgot";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={authStack.login}
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name={authStack.login}
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={authStack.login_mobile}
        component={LoginMobile}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={authStack.register}
        component={Register}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={authStack.forgot}
        component={Forgot}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
