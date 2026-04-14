const express = require("express");
const router = express.Router();
const User = require("../model/auth.model");
var jwt = require('jsonwebtoken');
const { register, login } = require("../controllers/auth.contoller.js")
const bcrypt = require('bcrypt');





router.post("/register", register)

router.post("/login", login)








module.exports = router;








