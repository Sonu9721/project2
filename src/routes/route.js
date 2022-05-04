const express = require('express');
const router = express.Router();
const collegeController = require('../Controller/collegeController')


router.post("/createCollege", collegeController.createCollege)

router.post("/createIntern",collegeController.createIntern)

module.exports=router;