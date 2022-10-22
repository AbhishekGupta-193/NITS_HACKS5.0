const express = require('express')
const cors = require('cors');
require('dotenv').config();
const {register,login,getUser} = require('./Controller.js')
const auth = require("./auth");
const PORT = process.env.REACT_APP_PORT

UserRouter =  require('./Route.js')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/data',UserRouter)
app.use(express.urlencoded({extended:false}))


app.get('/register',(req,res)=>{
     res.status(200).send("registerHTML")
})
app.get('/analyse',(req,res)=>{
     return res.send({status:200,msg:"success"})
})
app.get('/users',getUser)
app.post('/register',register)
app.post('/login',login)

app.listen(PORT,()=>{
     console.log(`server is listening on ${PORT}`);
})