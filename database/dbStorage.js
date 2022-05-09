import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';





export const getDBConnection = async () => {
    return openDatabase({ name: 'uploadedImages.db', location: 'default' });
  };
  
  export const createTable = async (db) => {
    // create table if not exists
    const tableName = 'uploadedImages';

    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
          uploadId TEXT PRIMARY KEY, filePath TEXT NOT NULL
      );`;
    // await db.transaction((tx) =>{
    //    tx.executeSql(query)
    // })
  
    await  db.executeSql(query);
  };
  
  export const getImages = async (db) => {
    const tableName = 'uploadedImages';
    try {
      const images = [];
      const results = await db.executeSql(`SELECT * FROM ${tableName}`);
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          images.push(result.rows.item(index))
        }
      });
      return images;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get Images !!!');
    }
  };
  
  export const saveImage = async (db, id,path) => {
    const tableName = 'uploadedImages';
    const insertQuery =
      `INSERT OR REPLACE INTO ${tableName}(uploadId, filePath) values '${id}','${path}'`;
    return db.executeSql(insertQuery);
  };
  
  export const deleteImage = async (db, id) => {
    const tableName = 'uploadedImages';
    const deleteQuery = `DELETE from ${tableName} where uploadId = ${id}`;
    await db.executeSql(deleteQuery);
  };
  
  export const deleteTable = async (db) => {
    const tableName = 'uploadedImages';
    const query = `drop table ${tableName}`;
  
    await db.executeSql(query);
  };