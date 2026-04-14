
const User = require("../model/auth.model");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res) => {
    try {
        const { username, email, password, role = "user" } = req.body;
        const hash = await bcrypt.hash(password, 10)
        let profile = await User.findOne({
            $or: [
                { username },
                { email }
            ]
        })
        if (profile) {
            return res.status(401).json({
                message: "user already exists"
            })
        }
        const user = await User.create({
            email: email,
            username: username,
            role: role,
            password: hash
        })
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET)
        res.cookie("token", token)
        res.status(201).json({
            message: "user Register Sucessfully",
            user,
            token
        })
    } catch (err) {
        console.log(err)
    }


}

module.exports.login = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const profiles = await User.findOne({
            $or: [
                { username },
                { email }
            ]
        })
        if (!profiles) {
            return res.status(409).json({
                message: "user does not exists "
            })
        }
        const passwordverified = await bcrypt.compare(password, profiles.password);
        if (!passwordverified) {
            return res.status(409).json({
                message: "user does not exists "
            })
        }
        const token = jwt.sign({ id: profiles.id, email: profiles.email, role: profiles.role }, process.env.JWT_SECRET)
        res.cookie("token", token)
        res.status(201).json({
            message: "login scucessfully",
            profiles,
            token
        })

    } catch (err) {
        console.log(err)
    }
}