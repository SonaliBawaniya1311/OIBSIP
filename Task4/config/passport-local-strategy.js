const passport=require("passport");

const pl= require("passport-local");
const LocalStrategy = pl.Strategy;

const User= require("../models/employee.js");

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',passReqToCallback:true
},
function(req,email,password,done){

    User.findOne({ email: email })
  .then(user => {
    // Do something with the document
    if(!user || user.password!=password){
             
        return done(null,false);}

    return done(null,user);
  })
  .catch(err => {
    // Handle error
    return done(err); 
  });

    
   }

));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser( function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){

    User.findById(id)
  .then(user => {
    // Do something with the document
    return done(null,user);
  })
  .catch(err => {
    // Handle error
    console.log('Error in finding user --> passport'); 
    return done(err); 
  });


});

//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
//if user is authenticated then pass on the request to new function(controller's action)
if(req.isAuthenticated()){return next();}
return res.redirect('/signIN');
}

passport.setAuthenticatedUser= function(req,res,next){
    if(req.isAuthenticated()){res.locals.user= req.user; }
    next();
}
module.exports = passport;