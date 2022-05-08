const collegeModel=require('../Models/collegeModel')
const internModel= require('../Models/internModel')
const mongoose = require('mongoose')
//const ObjectId = mongoose.Types.ObjectId 


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

                if(! (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(logoLink))){
                  return res.status(400).send({ status: false, message: 'Please provide valid URL' })
              }
      
                //validation ends
                let data= req.body
                const collegeData = await collegeModel.create(data)
                res.status(201).send({status:true, msg:'College created succefully',data:collegeData})

  
    } catch (error) {
        res.status(500).send({status:false, message:error.message})//==>synchronuos
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
        const {name, email, mobile, collegeName} = requestBody;
    
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
        const emailPresent = await internModel.findOne({ email: email, isDeleted: false })

        if (emailPresent) {
            return res.status(400).send({ status: false, error: `${email} this Email already exist` })
        }
    
        if(!isValid(mobile)){
          res.status(400).send({status:false, message:'Mobile number is required'})
          return
        }

        if(!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile))){
            res.status(400).send({status:false, message:'Mobile no should be valid'})
            return
        }

        let mobilePresent = await internModel.findOne({ mobile: mobile, isDeleted: false })
        if (mobilePresent) {
            return res.status(400).send({ status: false, error: `${mobile} this number already exist` })
        }

        if(!isValid(collegeName)){
            res.status(400).send({status:false, message:'college Id is required'})
            return
        }

        let isCollegeNamePresent= await collegeModel.findOne({name: collegeName,isDeleted:false})
      if (!isCollegeNamePresent){
       return res.status(400).send({ status: false, message: 'This Collage is not present' })}
 
       let collegeId = isCollegeNamePresent._id
       requestBody["collegeId"] = collegeId

        
        const Intern = await internModel.create(requestBody)
                res.status(201).send({status:true, msg:'Intern created succefully',data:Intern})

    } catch (error) {
        res.status(500).send({status:false, message:error.message})
    }
}


const  getCollegeDetails= async function (req, res) {
  try {
      const collegeName = req.query.name
      if (!collegeName){
       return res.status(400).send({ status: false, message: 'College name is required to access data' })}
    
      const newCollege = await collegeModel.findOne({ name: collegeName }, { name: 1, fullName: 1, logoLink: 1 });

      if (!newCollege){
         return res.status(404).send({ status: false, message: `College does not exit` })};
      const interns = await internModel.find({ collegeId: newCollege._id, isDeleted: false },
      { __v: 0, isDeleted: 0, collegeId: 0 });
      res.status(200).send({ data: { name: newCollege.name, fullName: newCollege.fullName, logoLink: newCollege.logoLink, interns: interns}})

  } catch (error) {
      res.status(500).send({ status: false, message: error.message });
  }
}


module.exports.createCollege=createCollege

module.exports.createIntern=createIntern

module.exports.getCollegeDetails=getCollegeDetails