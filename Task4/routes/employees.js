const express= require('express');
const router = express.Router();
const passport= require('passport');

const empController = require('../controllers/emp_controller');
const intController = require('../controllers/int_controller');
const stuController = require('../controllers/stu_controller');


router.post('/create', empController.create);
router.get('/destroy-session',empController.destroySession);
router.post('/create-session', 
    passport.authenticate('local',{failureRedirect:'/signIN'}),
    empController.createSession
    );
    
router.post('/create-interview', intController.createI);   
router.post('/create-student', stuController.createS);   
router.post('/allotS-I', stuController.addI);  
router.get('/int-results',empController.resultsPage); 
router.post('/update-result/:int_id',empController.createResult); 
router.get('/export-Result', empController.downloadResult);
router.get('/export-Students', stuController.downloadStudents);
router.get('/export-Interviews', intController.downloadInterviews);

module.exports= router;