const express = require("express");
const router = express.Router();
const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");
const { SignupControl, LoginControl, ProfileApi, updateWatchList, getWatchlistCount } = require("../controllers/UserController");
const { checkAuth } = require("../middleware/checkAuth");

router.post("/signupdata", SignupControl);
router.post("/logindata",LoginControl);
router.get("/profile",checkAuth, ProfileApi);
router.post("/watchlistadd", updateWatchList)   
router.get("/getwatchlistcount", getWatchlistCount) 

module.exports = router; 
