const express = require('express');
const router = express.Router();
const collegeController = require('../Controller/collegeController')


router.post("/functionup/colleges", collegeController.createCollege)

router.post("/functionup/interns",collegeController.createIntern)

router.get('/functionup/collegeDetails',collegeController.getCollegeDetails)

module.exports=router;