const mongoose =require("mongoose");
const Interview= require("./interviews");
// created a schema for collection 
const studentSchema= new mongoose.Schema({
name:{ type:String, required:true },
batch_id:{type: Number, required:true},
status:{type:Boolean, required:true},
college:{type:String, required:true },
scheduledInterviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interview' }]
}
);

// Student is our collection here with schema as studentSchema
const Student = mongoose.model('Student',studentSchema );

module.exports = Student;