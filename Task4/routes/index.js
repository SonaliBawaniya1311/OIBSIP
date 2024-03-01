const express= require('express');
const router = express.Router();
const passport= require('passport');

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.get('/signIN', homeController.signIn);
router.get('/signUP', homeController.signUp);
router.get('/los',passport.checkAuthentication,homeController.lOS);
router.get('/loi',passport.checkAuthentication,homeController.lOI);




router.use('/employees',require('./employees'))

module.exports= router;