import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Avatar from '../src/Areas/Common/components/avatar/Avatar'; 
import SocialIcon from '../src/Areas/Common/components/social/SocialIcon'
import {margin} from '../src/Areas/Common/components/config/spacing';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Avatar
        source={require('../assets/images/favicon.png')}
        size={60}
        rounded
      >   
      </Avatar>
      <SocialIcon
                  light
                  raised={false}
                  type={'facebook'}
                  style={styles.socialIconStyle}
                  iconSize={15}
                />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  socialIconStyle: {
    width: 32,
    height: 32,
    margin: 0,
    marginHorizontal: margin.small / 2,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: margin.small,
  },
});
