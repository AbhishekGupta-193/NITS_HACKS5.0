const {todo_collection} = require("./Mongodb");
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uuid = require('uuid')

const login = async (req,res) => {
     try {
          const {email,password} = req.body;
          if(!(email && password)) {return res.status(400).send({status:400,msg:"please enter username or password"})}

          const userData = await todo_collection.findOne({'user.email':email.toLowerCase()})
          console.log("user : ",userData);
          if (userData && userData.user && (await bcrypt.compare(password, userData.user.password))) {
               const token = jwt.sign(
                 { user_id: userData._id, email },
                 TOKEN_KEY,
                 {
                   expiresIn: "24h",
                 }
               );
               userData.user.token = token;
               return res.status(200).json({status:200,user:userData});
             }
          res.status(400).send({status:401,msg:"Invalid Credentials"});
     } catch (error) {
          console.log(error.Message);
     }
}

const register = async (req,res) => {
     console.log("register");
     try {
          const {first_name,last_name,email,password} = req.body;
          if(!(email && password && first_name && last_name)) {return res.status(400).send({status:400,msg:"All inputs are required"});}

          const oldUser = await todo_collection.find({'user.email':email.toLowerCase()});
          if(oldUser.length!=0) {return res.status(400).send({status:409,msg:"User Already exist. Please Log In"})}
          const encryptedPassword = await bcrypt.hash(password,10);
          const userId = new Date().getTime();
          const userData = await todo_collection.create({
               user:{
                    first_name,
                    last_name,
                    email:email.toLowerCase(),
                    password:encryptedPassword,
                    userID:userId
               },
               todoData:[]
          })
          const token = jwt.sign(
               { user_id: userData._id, email },
               TOKEN_KEY,
               {expiresIn: "24h",});
               userData.user.token = token;
               
          return res.status(201).send({status:201,user:userData});
     } catch (error) {
          console.log(error.Message);
     }
}


let dataArray = [
     {
          id:1,
          weight:"25kg",
          nature:"biodegradable",
          location:"silcahr",
          Percentage_co2_Emmission:"25%"
     }
]


const GetTask = async (req, res) => {
   console.log("get");
   return res.status(200).send({status:200,msg:"success",data:dataArray})
};


const createTask = async (req, res) => {
     const {weight,nature,location} = req.body;
     if(!(weight && location && nature)){
          return res.status(400).send({status:400,msg:"all inputs are required"})
     }
     const id = uuid.v4();
     const newData = {
          id:id,
          weight:weight,
          nature:"afsgfs",
          location:"csdgs",
          Percentage_co2_Emmission:"25%"
     }
     dataArray.push(newData)
     res.status(201).send({status:201,data:dataArray})
};

const deleteTask = async (req,res) => {
     const {id} = req.params;
     dataArray = dataArray.filter((item)=>item.id!=id)
     console.log(dataArray,"deleted");
     res.status(201).send({status:201,msg:"deleted",data:dataArray})
}


module.exports = { register, GetTask , login , createTask ,deleteTask };



