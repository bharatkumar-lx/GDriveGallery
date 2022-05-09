// Store/Retrieve Files on Google Drive using React Native App
// https://aboutreact.com/react-native-google-drive/

// Import React in our code
import React, {useState, useEffect} from 'react';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  GDrive,
  MimeTypes,
  ListQueryBuilder,
} from "@robinbobin/react-native-google-drive-api-wrapper";


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    uri: "https://reactnative.dev/img/tiny_logo.png"
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    uri: "https://reactnative.dev/img/tiny_logo.png"
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    uri: "https://reactnative.dev/img/tiny_logo.png"
  },
  {
  id: '345676543',
  title: 'tits s',
  uri: "https://reactnative.dev/img/tiny_logo.png"
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    uri: "https://reactnative.dev/img/tiny_logo.png"
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    uri: "https://reactnative.dev/img/tiny_logo.png"
  },
];

const Item = ({ title,uri}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Image style= {styles.image}
      source={
       { uri: uri}
        // require('../assets/kakashi2.jpg')
      }
      />
  </View>
);


const GDriveView = () => {
 
  const renderItem = ({ item }) => (
    <Item title={item.title} uri = {item.uri}/>
  );

  

  return(
    <View style = {styles.container} >
     <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns= {3}
      />
      
    </View>
    
  );
  
};

export default GDriveView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
    flex : 1,
    margin: 5,
  },
});
