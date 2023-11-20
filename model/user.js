// const db=require('../config/db')

// db.changeUser({database:'photo'},(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('Swiched database');
//     }
// })

// const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       email VARCHAR(255) UNIQUE NOT NULL,
//       password VARCHAR(255) NOT NULL,
//       image VARCHAR(255) 
//     );
//   `;
// db.query(createTableQuery,(err)=>{
//     if(err){
//         console.log('table not created'); 
//     }else{
//         console.log('table created');
//     }
// })

const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    image:{
        type:String
    }
})
 const model=mongoose.model('users',schema)
module.exports=model