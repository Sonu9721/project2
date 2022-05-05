//express is an fast and server-side web framework for node.js
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');//Imported route
const {default:mongoose}= require('mongoose');//ODM library for mongoDB
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://functionup:deep982@cluster0.r0zd4.mongodb.net/group25Database", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route)

//app.listen 4000
app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
