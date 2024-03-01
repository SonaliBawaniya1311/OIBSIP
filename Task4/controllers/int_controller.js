const Interview=  require("../models/interviews");
const csv= require('csv-parser');
const fs= require('fs');
const {stringify} = require('csv-stringify');

module.exports.createI= async function(req,res){
    console.log(req.body);
    console.log(req.params);
    let interview=   await Interview.create({
        company_name: req.body.company_name,
    date:req.body.date
    });

    return res.redirect('back');
}


module.exports.downloadInterviews= async(req,res)=>{  

    Interview.find().
    then(interviews=>  
      stringify(interviews, {header: true}, (err, csvString) => {
        if (err) {
          console.error(err);
        } else {
          // Write CSV file
          fs.writeFile('interviewsData.csv', csvString, (err) => {
            if (err) {
              console.error(err);
            } else {
              // Download CSV file
              res.setHeader('Content-Disposition', 'attachment; filename=interviewsData.csv');
              res.set('Content-Type', 'text/csv');
              fs.createReadStream('interviewsData.csv').pipe(res);
            }
          });
        }
      })
      ).
    catch(err=>console.log("***********",err));
  }