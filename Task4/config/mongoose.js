const dotenv=require('dotenv');
dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const mongoose =require('mongoose');

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.q90oimj.mongodb.net/test`);
const db =mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB")); 

db.once('open', function(){
    console.log('Connected to Database ::MongoDB');
})

module.exports =db;

// import mongoose from 'mongoose';


// const db=async (username,password)=>{
//     try{
//         const url=`mongodb+srv://${username}:${password}@cluster0.q90oimj.mongodb.net/test`;
//         await mongoose.connect(url,{
//             useUnifiedTopology:true,
//             useNewUrlParser:true
//         });
//         console.log("databse connected succesfully");
//     }catch(error){
//         console.log('error while connecting data base',error);
//     }
// }
// export default db;