const express=require("express");
const mongoose=require("mongoose");
const Registeruser=require("./model")
const jwt=require("jsonwebtoken")
const meddleware=require("./meddleware")
const cors=require("cors")
const app=express();

mongoose.connect("mongodb+srv://gattushiva:gattushiva@cluster0.fjsmupv.mongodb.net/RegisterUsers?retryWrites=true&w=majority&appName=Cluster0").then(
    ()=>console.log("BD established")
)

app.use(express.json());

app.use(cors({origin:"*"}))

//// Registion Router


app.post("/register",async(req,res)=>{
    try {
        
        const {username,email,password,confirmpassword}=req.body;
        let exist= await Registeruser.findOne({email})
        if(exist){
            return res.status(400).send("User Already Exist")
        }
        if (password!==confirmpassword){
            return res.status(400).send("Passwords not matching")
        }

        let newUser=new Registeruser({
            username,
            email,
            password,
            confirmpassword
        })

        await newUser.save();
        res.status(200).send("Register Successfully")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
})

///Login Router

app.post("/login",async (req,res)=>{
    try {
        const {email,password}=req.body;
        
        let exist = await Registeruser.findOne({email})
        if(!exist){
            return res.status(400).send("User Not Found")
        }
        if(exist.password!==password){
            return res.status(400).send(" Invaild  Credentials")
        }

        let payload= {
            user:{
                id: exist.id
            }
        }
        jwt.sign(payload, "jwtSecret",{expiresIn:35000000},
            (err,token)=>{
                if(err)throw err;
                return res.json({token})
            }
        )
        
    } catch (error) {
        
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
      
})


///Protected Router

app.get("/myprofile",meddleware,async(req,res)=>{
    try {
        
        let exist =await Registeruser.findById(req.user.id);
        if(!exist){
            return res.status(400).send("user not found");

        }
       res.json(exist)

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
})


app.listen(5000,()=>{
    console.log("Server is Running")
})