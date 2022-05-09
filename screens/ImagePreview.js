import { StyleSheet, Text, View,PermissionsAndroid,Platform,TouchableOpacity,Image,ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Dirs, FileSystem } from 'react-native-file-access';
import {
    GoogleSignin,
  } from '@react-native-google-signin/google-signin';
  import {
    GDrive,
  } from '@robinbobin/react-native-google-drive-api-wrapper';
  import SQLite from 'react-native-sqlite-storage';


  const db =  SQLite.openDatabase(
    { 
      name: 'uploadedImages.db', 
      location: 'default', 
    },
    () =>{console.log("db connected")},
    error => {console.log(error)}
    );
  const tableName = 'imageTable';

const ImagePreview = ({navigation,route}) => {
    const [image,setImage] = useState(route.params.image)
    const [name,setName] = useState("Untitled")
    const [uplaoding, setUploading] = useState(false)


    useEffect(() =>{
        let isMounted = true;
        askPermission()
        createTable()
        return () => {
            isMounted = false;
        }
    },[])

    const saveImage = async (id,path) => {
        setUploading(true)
        await  db.transaction( async(tx) =>{
          const insertQuery = `INSERT OR REPLACE INTO ${tableName} (uploadId, filePath) VALUES ('${id}','${path}')`;
          await tx.executeSql(
            insertQuery,
            [],
            () =>{console.log("save image ---> success", )},
            error => {console.log("save image --->", error)}
            )
        })
        setUploading(false)
    };


    const createTable =  async() => {
      // create table if not exists
      
      await  db.transaction( async(tx) =>{

        const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
          uploadId TEXT PRIMARY KEY, filePath TEXT NOT NULL
      );`;
        await tx.executeSql(
          query,
          [],
          () =>{console.log("table created")},
          error =>{ console.log("create table",error)}
          )
      })
    };

    
  
    const uploadImage = async() =>{
        let content = await readFile();
        const token = (await GoogleSignin.getTokens()).accessToken;
        const gdrive = new GDrive();
        gdrive.fetchTimeout = -1
        gdrive.accessToken = token;
        const fileName = image.uri.split("/")
        setName(fileName[fileName.length -1])
        const id = (await gdrive.files.newMultipartUploader()
        .setData(content,"image/jpeg")
        .setIsBase64(true)
        .setRequestBody({
            name: name,
            mimeType:"image/jpeg",
        })
        .execute()
        ).id;

        await saveImage(id,image.uri) 
    }


    const askPermission = async () => {
        if (Platform.OS === 'android') {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Permission Explanation',
              message: 'Need Write Permission',
            },
          );
          if (result !== 'granted') {
            console.log('Access to pictures was denied');
            return;
          } 
      };
    }  


    const readFile = async() => {
    const content = await FileSystem.readFile(image.uri,'base64');
    return content;
    }
   
    return (
      <>
      { uplaoding ?(
        <View style={{ flex: 1, justifyContent: "center"}}>
        <ActivityIndicator size="large" color="#00ff00" />
       </View>
      ):(
        <View style= {styles.container}>
            <Image
                style = {styles.image}
                source = {{uri : image.uri}}
            />
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {uploadImage()}}>
                <Text>Upload on Google Drive</Text>
            </TouchableOpacity>
        </View>
      )
      } 
      </>
    )
}

export default ImagePreview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 2,
        margin: 1,
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#D9DDD0',
        padding: 10,
        width: "100%",
        paddingTop: 20,
      },
      image: {
        width: "100%",
        height: "90%",
        padding: 1,
        margin: 1, 
        resizeMode: "contain"
        },
})