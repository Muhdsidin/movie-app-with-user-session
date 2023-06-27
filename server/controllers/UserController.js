const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "access-key"

const SignupControl = async( req, res)=>{
    const { username, password, email } = req.body;
  const isExist = await UserModel.findOne({ email }); 
  if (isExist) {
    return res.status(400).json({
      message: "User is Already Existed",
    });
  }
  const passwordData = await bcrypt.hash(password, 10);
  await UserModel.create({
    email: email,
    username: username,
    password: passwordData,
  });
  res.json({
    message: "succesfully signuped",
  });
}

const LoginControl = async(req,res)=>{
    
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "email/password Is not Correct",
    });
  } 

  const passwordData = await bcrypt.compare(password , user.password)
  if(!passwordData){
    return res.status(400).json({
        message: "email/password Is not Correct",
      });
  }



  const accessKey = generateToken(user._id);
  //console.log(accessKey)
  res.json({
    _id: user._id,
    email: user.email,
    accessKey,
  });

}

const ProfileApi = async(req, res, next)=>{
  try {
    console.log(req.userId)
  const UserId = req.userId
  const Userdetails = await UserModel.findById(UserId).select("-password").populate({
    path:'movie',
    model: "Movie"
  })
  //console.log(Userdetails)  

  res.status(200).json(Userdetails)
  } catch (error) {
    return res.status(400).json({ 
      message:"Sorry"
    })
  }
}

const updateWatchList = async (req, res) => {
  const { movieId, user } = req.body;
  const TokenVerify = jwt.verify(user, SECRET_KEY);

  const userData = await UserModel.findByIdAndUpdate(
    TokenVerify._id,
    { $push: { movie: movieId } },
    { new: true }
  );

  //console.log(userData);
};

const getWatchlistCount =async (req,res)=>{
 console.log(req.headers.authorization) 
 const userId = req.headers.authorization
  TokenVerify = jwt.verify(userId,SECRET_KEY)
  if(!TokenVerify){
    return res.status(402).json({
      message: "your un authrized"
    })
  }
  const TokenId = TokenVerify._id
  const User = await UserModel.findById(TokenId)
  //console.log(User.movie)
  const data = User.movie.length
  res.json(data)
}

module.exports = {SignupControl , LoginControl, ProfileApi, updateWatchList, getWatchlistCount}