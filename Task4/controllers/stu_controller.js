const Student=  require("../models/students");
const csv= require('csv-parser');
const fs= require('fs');
const {stringify} = require('csv-stringify');

module.exports.createS= async function(req,res){
    
    let student=   await Student.create({
        name:req.body.name,
        batch_id:req.body.batch_id,
        status:req.body.status?true:false,
        college:req.body.college
    });

    return res.redirect('back');
}

module.exports.addI=function(req,res){
    var s_id= req.query.stu_id;
    var int_id= req.body.ints;
    Student.findById(s_id,).
    then(student=>{student.scheduledInterviews.push(int_id);student.save();})
    .catch(err=> console.log("there is an error",err));
    return res.redirect('back');
}


module.exports.downloadStudents= async(req,res)=>{  

    Student.find().
    then(students=>  
      stringify(students, {header: true}, (err, csvString) => {
        if (err) {
          console.error(err);
        } else {
          // Write CSV file
          fs.writeFile('studentsData.csv', csvString, (err) => {
            if (err) {
              console.error(err);
            } else {
              // Download CSV file
              res.setHeader('Content-Disposition', 'attachment; filename=studentsData.csv');
              res.set('Content-Type', 'text/csv');
              fs.createReadStream('studentsData.csv').pipe(res);
            }
          });
        }
      })
      ).
    catch(err=>console.log("***********",err));
  }
