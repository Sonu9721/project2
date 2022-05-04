const collegeModel=require('../Models/collegeModel')
const internModel= require('../Models/internModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


const isValid=function(value){
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function(requestBody){
    return Object.keys(requestBody).length > 0
}

const isValidObjectId = function(ObjectId){
    return mongoose.Types.ObjectId.isValid(ObjectId)
  }

const createCollege = async function(req,res){
    try {
        const requestBody=req.body
        if(!isValidRequestBody(requestBody)){
            res.status(400).send({status:false, message:'Invalid request parameters. Please provide College details'})
            return
        }

                //Extract Params
                const {name, fullName, logoLink}  = requestBody; //object destructuring

                //Validation starts
                if(!isValid(name)){
                    res.status(400).send({status:false, message:`College name is required`})
                    return
                }
        
                if(!isValid(fullName)){
                    res.status(400).send({status:false, message: `College fullName is required`})
                    return
                }
        
                if(!isValid(logoLink)){
                    res.status(400).send({status:false, message: `Logolink is required`})
                    return
                }
                //validation ends
                let data= req.body
                const college = await collegeModel.create(data)
                res.status(201).send({status:true, msg:'College created succefully',data:college})

  
    } catch (error) {
        res.status(500).send({status:false, message:error.message})
    }
}




const createIntern = async function(req,res){
      try {
        let requestBody = req.body;

        if(!isValidRequestBody(requestBody)){
          res.status(400).send({status: false, message:`Invalid request parameters, please provide Intern details`})
          return
        }
    
        //Extract params
        const {name, email, mobile, collegeId} = requestBody;
    
        //Validation starts
        if(!isValid(name)){
          res.status(400).send({status:false, message:'Intern name is required'})
          return
        }
    
        if(!isValid(email)){
          res.status(400).send({status:false, message:'email Id is required'})
          return
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            res.status(400).send({status:false, message: `Emial should be a valid email address`})
            return
        }
    
        if(!isValid(mobile)){
          res.status(400).send({status:false, message:'Mobile number is required'})
          return
        }

        if(!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile))){
            res.status(400).send({status:false, message:'Mobile no should be valid'})
            return
        }

        if(!isValid(collegeId)){
            res.status(400).send({status:false, message:'college Id is required'})
            return
          }
    
        if(!isValidObjectId(collegeId)){
          res.status(400).send({status:false, message:'${collegeId} is not a valid college id'})
          return
        }

        let data = req.body
        const Intern = await internModel.create(data)
                res.status(201).send({status:true, msg:'Intern created succefully',data:Intern})

    } catch (error) {
        res.status(500).send({status:false, message:error.message})
    }
}



module.exports.createCollege=createCollege

module.exports.createIntern=createIntern