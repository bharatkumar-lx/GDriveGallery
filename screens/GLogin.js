

 import React ,{useEffect}from 'react';
 import {
   View,
   StyleSheet,
   useColorScheme,
 } from 'react-native';
 
 import {Colors} from 'react-native/Libraries/NewAppScreen';
 import {
   GoogleSignin,
   GoogleSigninButton,
   statusCodes,
 } from '@react-native-google-signin/google-signin';

 
 const GLogin = ({navigation}) => {
   const isDarkMode = useColorScheme() === 'dark';

 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
 
   useEffect(() => {
     let isMounted = true;
     GoogleSignin.configure({
       scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive.metadata',
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/drive.metadata.readonly',
        'https://www.googleapis.com/auth/drive.apps.readonly',
        'https://www.googleapis.com/auth/drive.photos.readonly',
      ], // [Android] what API you want to access on behalf of the user, default is email and profile
       webClientId: '', // client ID of type WEB for your server (needed to verify user ID and offline access)
       offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
       hostedDomain: '', // specifies a hosted domain restriction
       forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
       accountName: '', // [Android] specifies an account name on the device that should be used
       // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
       // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
       // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
       // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
     });
     return () => {
      isMounted = false;
     }
   }, []);

    const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      console.log('User is already signed in');
      // Get User Info if user is already signed in
      try {
        let info = await GoogleSignin.signInSilently();
        console.log('User Info --> ', info);
        navigation.replace('HomeScreen', {userInfo: info});
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          alert('User has not signed in yet');
          console.log('User has not signed in yet');
        } else {
          alert("Unable to get user's info");
          console.log("Unable to get user's info", error);
        }
      }
    }
    // setLoading(false);
  };
   const signIn = async () => {
     try {
       await GoogleSignin.hasPlayServices();
       const info = await GoogleSignin.signIn();
       navigation.replace("Home",{userInfo: info})
  
       //You can extract the error types from statusCodes as follows.
     } catch (error) {
       console.log('Error---', error);
       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
         // user cancelled the login flow
         // Alert.alert('Error', error)
       } else if (error.code === statusCodes.IN_PROGRESS) {
         // operation (f.e. sign in) is in progress already
       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
         // play services not available or outdated
       } else {
         // some other error happened
       }
     }
   };

   return (
     <View style={styles.Container}>
       <GoogleSigninButton
           style={{
             width: 192, 
             height: 48 , 
             alignItems: "center",
             justifyContent: "center",
            }}
           size={GoogleSigninButton.Size.Wide}
           color={GoogleSigninButton.Color.Dark}
           onPress={signIn}
         />
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   Container: {
     marginTop: 32,
     paddingHorizontal: 24,
     flex:1,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
   view: {
     flex: 1
   },
   image: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
    flex : 1,
    margin: 5,
  },
 });
 
 export default GLogin;
 
