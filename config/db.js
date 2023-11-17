const  mysql      = require('mysql2');
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'safvan@123mysql',
});
//sql connection
db.connect((err)=>{
    if(err){
      console.log(err);
    }else{
      console.log('mysql is connected');
    }
  })
  // database careation
  const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS photo';
  db.query(createDatabaseQuery,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('created database');
    }
  })
  module.exports=db
