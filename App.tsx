import React, {Component} from 'react';
//import OneSignal from 'react-native-onesignal';
import {NavigationContainer} from '@react-navigation/native';

import {APP_ID} from './src/config/onesignal';
import './src/config-i18n';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppRouter from './src/AppRouter';

import NavigationService from './src/utils/navigation';

import configureStore from './src/config-store';
import {getDemoSelector} from './src/modules/common/selectors';
import {tokenSelector} from './src/modules/auth/selectors';
import demoConfig from './src/utils/demo';
import globalConfig from './src/utils/global';

import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const {store, persistor} = configureStore();

class App extends Component {
  state = {
    fontsLoaded: false,
  };
  async loadFonts() {
    try {
      SplashScreen.preventAutoHideAsync();
  
      // Load fonts
      await Font.loadAsync({
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),

      });
     
    } catch (e) {
      // We might want to provide this error information to an error reporting service
      console.warn(e);
      return false;
    } finally {
      SplashScreen.hideAsync();
      this.setState({ fontsLoaded: true });
    }
  }

  componentDidMount() {


    this.loadFonts();


    // OneSignal.setAppId(APP_ID);

    // // O N E S I G N A L   S E T U P
    // OneSignal.setLogLevel(6, 0);
    // OneSignal.setRequiresUserPrivacyConsent(false);
    // OneSignal.promptForPushNotificationsWithUserResponse(response => {
    //   console.log('Prompt response:', response);
    // });

    // /* O N E S I G N A L  H A N D L E R S */
    // OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
    //   console.log(
    //     'OneSignal: notification will show in foreground:',
    //     notifReceivedEvent,
    //   );
    //   // let notif = notifReceivedEvent.getNotification();

    //   // const button1 = {
    //   //   text: "Cancel",
    //   //   onPress: () => { notifReceivedEvent.complete(); },
    //   //   style: "cancel"
    //   // };

    //   // const button2 = { text: "Complete", onPress: () => { notifReceivedEvent.complete(notif); } };

    //   // Alert.alert("Complete notification?", "Test", [button1, button2], { cancelable: true });
    // });
    // OneSignal.setNotificationOpenedHandler(notification => {
    //   console.log('OneSignal: notification opened:', notification);
    // });
    // OneSignal.setInAppMessageClickHandler(event => {
    //   console.log('OneSignal IAM clicked:', event);
    // });
    // OneSignal.addEmailSubscriptionObserver(event => {
    //   console.log('OneSignal: email subscription changed: ', event);
    // });
    // OneSignal.addSubscriptionObserver(event => {
    //   console.log('OneSignal: subscription changed:', event);
    // });
    // OneSignal.addPermissionObserver(event => {
    //   console.log('OneSignal: permission changed:', event);
    // });

    store.subscribe(() => {
      const state = store.getState();
      demoConfig.setData(getDemoSelector(state).toJS());
      globalConfig.setToken(tokenSelector(state));
    });
  }

  componentWillUnmount() {
   // OneSignal.clearHandlers();
  }

  render() {
    if (this.state.fontsLoaded) {

    return (
      
      <NavigationContainer
        ref={navigationRef =>
          NavigationService.setTopLevelNavigator(navigationRef)
        }>
        <SafeAreaProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AppRouter />
            </PersistGate>
          </Provider>
        </SafeAreaProvider>
      </NavigationContainer>
    );}
    else {
      return null;
    }
  }
}

export default App;
