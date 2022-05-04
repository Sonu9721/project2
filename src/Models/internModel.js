const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema= new mongoose.Schema({
    name:{
        type:String,
        required:'Intern name is required',
        trim:true
    },
    email:{
        type:String,
        required:'Email is required',
        trim:true,
        unique:true,
        validate:{
            validator: function(email){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },message:'Please fill a valid email address', isAsync:false
        }
    },
    mobile:{
        type:Number,
        required:'Mobile no is required',
        unique:true,
        validate:/^(\+\d{1,3}[- ]?)?\d{10}$/

    },
    collegeId:{
        type:ObjectId,
        ref:'College',
        required:'CollegeId is required'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Intern', internSchema)