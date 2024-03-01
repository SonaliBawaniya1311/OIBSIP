const Interview= require("../models/interviews");
const Student= require("../models/students");



module.exports.home = (req,res) =>{
   
    res.render('home',{title:`Home`});
}

module.exports.lOS = (req,res) =>{

//     Student.find().
//    then(studants=>res.render('list_students',{students:studants}))
//    .catch(err=> console.log("there is an error",err));

Student.find().
   then(studants=>{
    Interview.find().
   then(intervues=>{ res.render('list_students',{students:studants,interviews:intervues,title:`Interview List`}); })
   .catch(err=> console.log("there is an error",err));
   })
   .catch(err=> console.log("there is an error",err));


   
   
}
module.exports.lOI = (req,res) =>{


    
   Interview.find().
   then(intervues=>res.render('list_interviews',{interviews:intervues,title:`Students List`}))
   .catch(err=> console.log("there is an error",err));

    
}

module.exports.signIn = (req,res) =>{
  
    res.render('sign_in',{title:`Login Page`});
}

module.exports.signUp = (req,res) =>{
   
    res.render('sign_up',{title:`SignUp Page`});
}