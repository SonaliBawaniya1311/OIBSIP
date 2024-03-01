const mongoose =require("mongoose");
const Interview= require("./interviews");
// created a schema for collection 
const resultSchema= new mongoose.Schema({
interview:{ type: mongoose.Schema.Types.ObjectId, ref: 'Interview' },
student:{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
res_status:{type:Boolean}
}, {timestamps: true});


// Interview is our collection here with schema as interviewSchema
const Result = mongoose.model('Result',resultSchema );

module.exports = Result;