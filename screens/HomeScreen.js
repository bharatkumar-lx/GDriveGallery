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
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// For Google Signin
import {  GoogleSignin ,
    
} from '@react-native-google-signin/google-signin';

const HomeScreen = ({navigation,route}) => {
  // State Defination
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    let isMounted = true;
        if(isMounted ){
        setUserInfo(route.params.userInfo);// no more error
        };
    return () => {
    isMounted = false;
    };
  }, []);

  // To sign out from Google Login
  const _signOut = async () => {
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null);
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
          <View>
            {userInfo ? (
              <Image
                source={{uri: userInfo.user.photo}}
                style={styles.imageStyle}
              />
            ) : null}
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>
                User Name: {userInfo ? userInfo.user.name : ''}
              </Text>
              <Text style={styles.text}>
                Use Email: {userInfo ? userInfo.user.email : ''}
              </Text>
            </View>
          </View>
          <ScrollView>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => navigation.navigate('GDriveView')}>
              <Text>Load from Google Drive</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                navigation.navigate('LocalStorage')
              }>
              <Text>Load from local storage</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => navigation.navigate('UploadedImages')}>
              <Text>Uploaded Images</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>{
                _signOut()
              }
              }>
              <Text>Sign out</Text>
            </TouchableOpacity>
            </ScrollView>
          
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  imageStyle: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    marginLeft: 80,
    padding: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
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
