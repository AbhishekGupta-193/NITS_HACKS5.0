const {user_collection} = require("./Mongodb");
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uuid = require('uuid')

let userDataArray = [
     {
          first_name:"",
          last_name:"",
          email:"",
          password:"",
          contact:""
     }
]

const getUser = (req,res) => {
     res.status(200).send({status:200,msg:"success",data:userDataArray})
}

const login = async (req,res) => {
     try {
          const {email,password} = req.body;
          if(!(email && password)) {return res.status(400).send({status:400,msg:"please enter username or password"})}

          // const userData = await user_collection.findOne({'user.email':email.toLowerCase()})
          const userData = userDataArray.find((item)=>item.email==email.toLowerCase())
          if (userData && (await bcrypt.compare(password, userData.password))) {
               // const token = jwt.sign(
               //   { user_id: userData._id, email },
               //   TOKEN_KEY,
               //   {
               //     expiresIn: "24h",
               //   }
               // );
               // userData.user.token = token;
               return res.status(200).json({status:200,user:userDataArray});
             }
          res.status(400).send({status:401,msg:"Invalid Credentials"});
     } catch (error) {
          console.log(error.Message);
     }
}

const register = async (req,res) => {
     console.log("register");
     try {
          const {first_name,last_name,email,password,contact} = req.body;
          if(!(email && password && first_name && last_name && contact)) {return res.status(400).send({status:400,msg:"All inputs are required"});}

          // const oldUser = await user_collection.find({'user.email':email.toLowerCase()});
          // console.log(oldUser,"old User")
          // if(oldUser.length!=0) {return res.status(400).send({status:409,msg:"User Already exist. Please Log In"})}
          const oldUser = userDataArray.find((item)=>item.email==email.toLowerCase())
          console.log(oldUser,'sgsgdh');
          if(oldUser){return res.status(400).send({status:409,msg:"User Already exist. Please Log In"})}

          const encryptedPassword = await bcrypt.hash(password,10);

          const newUser = {
               first_name,
               last_name,
               email:email.toLowerCase(),
               password:encryptedPassword,
               contact
          }
          console.log(newUser);
          userDataArray.push(newUser)
          // const userData = await user_collection.create({
          //      user:{
          //           first_name,
          //           last_name,
          //           email:email.toLowerCase(),
          //           password:encryptedPassword,
          //           contact
          //      }
          // })
          // const token = jwt.sign(
          //      { user_id: userData._id, email },
          //      TOKEN_KEY,
          //      {expiresIn: "24h",});
          //      userData.user.token = token;
               
          return res.status(201).send({status:201,user:userDataArray});
     } catch (error) {
          console.log(error.Message);
     }
}


let dataArray = [
     {
          id:uuid.v4(),
          nature:'paper',
          weight:'1',
          old: 'less than a week',
          location: 'silchar',
          image:'http://paper.jpg',
          description:'none',
          EmissionFactor:"583",
          biodegradable:'yes',
          non_biodegradable:'no',
          recyclable:"yes",
          non_recyclable:"no",
     }
]


const GetTask =  (req, res) => {
   console.log("get");
   return res.status(200).send({status:200,msg:"success",data:dataArray})
};

const emi_fac = 
     {
          Plastics : 583,
          metal : 2.96,
          glass : 1.9,
          E_waste : 11,
          chemical_waste : 26,
          domestic_waste : 2,
          stationery : 2.42,
          sewage : 21,
          chemical_waste : 0.95,
          Organic : 56
     }

const createTask = async (req, res) => {
     const {weight,nature,old,location,image,description} = req.body.data;
     console.log(req.body);
     if(!(weight && location && nature && old  && description)){
          return res.status(400).send({status:400,msg:"all inputs are required"})
     }

     console.log(weight*25,"sgfg")
     const ef = emi_fac[nature];
     const emif_val = Math.floor(ef*weight)

     const recycle = ["metal","stationery","E_waste","Plastics","glass"];
     const non_recycle = ["Organic","sewage","domestic_waste","chemical_waste","construction_waste"];

     const biodegradable = ["Organic","metal","stationery","sewage","domestic_waste"];
     const non_biodegradable = ["glass","Plastics","E_waste","chemical_waste","construction_waste"];

     const bio = biodegradable.filter((item)=>item==nature)
     const non_bio = non_biodegradable.filter((item)=>item==nature)

     const re = recycle.filter((item)=>item==nature)
     const non_re = non_recycle.filter((item)=>item==nature)

     const newData = {
          id:uuid.v4(),
          nature:nature,
          weight:weight,
          old: old,
          location:location,
          image:image,
          description:description,
          EmissionFactor:emif_val,
          biodegradable:bio.length?"yes":"no",
          non_biodegradable:non_bio.length?"yes":"no",
          recyclable:re.length?"yes":"no",
          non_recyclable:non_re.length?"yes":"no",
     }
     console.log(newData,".....aaaaaaaaa");
     dataArray.push(newData)
     res.status(201).send({status:201,data:dataArray})
};

const deleteTask = async (req,res) => {
     const {id} = req.params;
     dataArray = dataArray.filter((item)=>item.id!=id)
     console.log(dataArray,"deleted");
     res.status(201).send({status:201,msg:"deleted",data:dataArray})
}


module.exports = {getUser, register, GetTask , login , createTask ,deleteTask };



