/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import  {Node} from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import GLogin from './screens/GLogin';
import HomeScreen from './screens/HomeScreen';
import GDriveView from "./screens/GDriveView"
import LocalImages from './screens/LocalImages';
import ImagePreview from './screens/ImagePreview';
import UploadedImages from './screens/UploadedImages';



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>  
          <Stack.Screen name="Login" component={GLogin} />
          <Stack.Screen name = "Home" component={HomeScreen}/>
          <Stack.Screen name="LocalStorage" component={LocalImages} />  
          <Stack.Screen name = "GDriveView" component={GDriveView}/>
          <Stack.Screen name = "ImagePreView" component={ImagePreview}/>
          <Stack.Screen name = "UploadedImages" component={UploadedImages}/>  
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10,
},
titleText: {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  padding: 20,
},
footerHeading: {
  fontSize: 18,
  textAlign: 'center',
  color: 'grey',
},
footerText: {
  fontSize: 16,
  textAlign: 'center',
  color: 'grey',
},
});

export default App;
