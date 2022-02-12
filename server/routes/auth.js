const router = require('express').Router();
const User = require('../models/User');
const {schemaRegisterValidation,schemaLoginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




router.post('/register',async (req,res)=>{
  console.log('somone send somthing..');
  //validate the details from the client using npm joi
  const {error} = schemaRegisterValidation.validate(req.body);
  if(error){
    return res.status(400).send(error.details[0].message);
  }
  //hash password using bcrypjs npm package
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password,salt);


 const user = new User({
   name: req.body.name,
   email: req.body.email,
   password: hashedPassword
 });
 try{
   const savedUser = await user.save();
   res.status(201).send(savedUser);
 } catch(e){
   res.status(400).send(e.message)
 }             

})

.post('/login',async (req,res)=>{

  try{
    //validate the details from the client using npm joi
    const {error} = schemaLoginValidation.validate(req.body);
    if(error){
      throw Error(error.details[0].message);
    }
    //check if email exist
    const user = await User.findOne({email: req.body.email});
    if(!user) throw Error('email dosent exist');
      
    //check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) throw Error('wrong password');

    //the details are correct and send the client success message
    // res.status(200).send('logged in');
    // create jwt token
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
    res.status(200).header('auth-token',token).send(token);
  }catch(e){
    res.status(400).send(e.message);
  }
})
//if the user success login he will be sent to this page
.get('/profile',async(req,res)=>{
  const token = req.headers['auth-token'];
  try{
    const decoded = jwt.verify(token,process.env.TOKEN_SECRET);
    const _id = decoded._id;
    const user = await User.findById({_id:_id});
    res.status(200).send(user); 
  }catch(e){
    res.status(500).send('invalid token')
  }
})

module.exports = router