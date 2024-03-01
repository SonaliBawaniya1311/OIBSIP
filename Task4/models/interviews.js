const mongoose =require("mongoose");
// created a schema for collection 
const interviewSchema= new mongoose.Schema({
company_name:{ type:String, required:true },
date:{type: Date, required:true}
}
);

// Interview is our collection here with schema as interviewSchema
const Interview = mongoose.model('Interview',interviewSchema );

module.exports = Interview;