const Employee= require('../models/employee');
const Interview=  require("../models/interviews");
const Student=  require("../models/students");
const Result= require("../models/results");
const csv= require('csv-parser');
const fs= require('fs');
const {stringify} = require('csv-stringify');

module.exports.home=(req,res)=>res.render('emp_home')

module.exports.create= function(req,res){
    if(req.body.password!=req.body.confirm_password){
        console.log('pasword and cnfirm password are different');
         return res.redirect('back');
     }

     Employee.create(
        {name: req.body.name, password: req.body.password , email: req.body.email} )
        
       
           return res.redirect('/signIN');
    };

module.exports.resultsPage =async (req, res) => {
    const interviewId = req.query.id;
  
    // Retrieve the interview details
    const interview = await Interview.findById(interviewId);
  
    // Retrieve all the students who appeared for the interview
    const students = await Student.find({ scheduledInterviews: interviewId });
    const resultsOfInterview= await Result.find({interview:interviewId});
  
    res.render('results', { interview, students ,resultsOfInterview,title:`Result Page`});
  }


module.exports.createResult= function(req,resp){
  /*
  * s_id --> student id
  * int_id --> interview id
  * rs --> result status: true means selected ,false means rejected and undefined means on hold 
  * req--> request
  * resp--> response
  * */
    var s_id= req.query.id;
    var int_id= req.params.int_id;
    var rs=undefined;    
    if(req.body.res=="selected")rs= true;
    else if(req.body.res=="rejected")rs= false;
    if(rs){
    Student.findById(s_id)
    .then(student=> {student.status=(student.status)||rs; student.save();})
    .catch(err=> console.log("cant update placement status of student",err) ) 
    }

    Result.create({student:s_id,interview:int_id,res_status:rs}).then(
        resp.redirect('back')
    ).catch(err=> console.log("Error in creating the result",err))
}


    
   module.exports.createSession= function(req,res){

    return res.redirect('/');    
        
    }

    module.exports. destroySession=function(req, res, next) {
        req.logout(function(err) {
          if (err) { return next(err); }          
          res.redirect('/');
        });
      }

module.exports.downloadResult= async(req,res)=>{  

  Result.find().
  then(results=>  
    stringify(results, {header: true}, (err, csvString) => {
      if (err) {
        console.error(err);
      } else {
        // Write CSV file
        fs.writeFile('data.csv', csvString, (err) => {
          if (err) {
            console.error(err);
          } else {
            // Download CSV file
            res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
            res.set('Content-Type', 'text/csv');
            fs.createReadStream('data.csv').pipe(res);
          }
        });
      }
    })
    ).
  catch(err=>console.log("***********",err));
}
    
