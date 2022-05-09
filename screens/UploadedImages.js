import { StyleSheet,FlatList,Image, View ,TouchableOpacity } from 'react-native'

import React ,{useEffect,useState}from 'react';
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

const UploadedImages = ({navigation}) => {
    
    const [data,setData] = useState(null)
    useEffect(() =>{
        let isMounted = true;
        getImages();
        return () => {
            isMounted = false;
        }
    },[])

    const getImages = async () => {  
        try {
          await db.transaction( async (tx)=>{
            tx.executeSql(
              `SELECT * FROM ${tableName}`,
              [],
              (tx,results) => {
                const dataArray =[]
                for(let i = 0; i < results.rows.length; i++){
                    dataArray.push(results.rows.item(i))
                }
                setData(dataArray)
              },
              error => { console.log("get data --->", error)}
            );
          })
        } catch (error) {
          console.error(error);
          throw Error('Failed to get Images !!!');
        }
      };
  





  return (
    <View  style= {styles.container}>
      <FlatList
        data={data}
        numColumns={3}
        renderItem={({item}) => (
          <TouchableOpacity style = {styles.container}
          >
          <Image
            style={styles.image}
            source={{uri: item.filePath}}
          />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default UploadedImages

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