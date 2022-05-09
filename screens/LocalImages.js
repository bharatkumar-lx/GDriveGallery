import { StyleSheet,FlatList,Image, View ,PermissionsAndroid, Platform,TouchableOpacity,Text } from 'react-native'
import React,{useEffect,useState} from 'react'
import CameraRoll from '@react-native-community/cameraroll';

const LocalImages = ({navigation}) => {

    const [data,setData]= useState('')
    useEffect(() => {
        askPermission();
    },[])

    const getPhotos = () => {
        CameraRoll.getPhotos({
          first: 10000,
          assetType: 'Photos',
        })
          .then((res) => {
            setData(res.edges);
            console.log("data --->",res.edges)
          })
          .catch((error) => {
            console.log(error);
          });
      };

    const askPermission = async () => {
        if (Platform.OS === 'android') {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Permission Explanation',
              message: 'ReactNativeForYou would like to access your photos!',
            },
          );
          if (result !== 'granted') {
            console.log('Access to pictures was denied');
            return;
          } else {
            getPhotos();
          }
        } else {
          getPhotos();
        }
      };
    
  return (
    <View  style= {styles.container}>
      <FlatList
        data={data}
        numColumns={3}
        renderItem={({item}) => (
          <TouchableOpacity style = {styles.container}
          onPress= {() => {
            navigation.navigate('ImagePreView' ,{image:item.node.image});
          }}
          >
          <Image
            style={styles.image}
            source={{uri: item.node.image.uri}}
          />
          </TouchableOpacity>
          
        )}
      />
    </View>
  )
}


export default LocalImages

const styles = StyleSheet.create({
    image: {
      width: "100%",
      height: 150,
      padding: 1,
      margin: 1,
      },
     container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
  },

})