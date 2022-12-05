const Token = require('../model/tokenModel')
const User = require('../model/Usermodel')
const crypto = require('crypto')
const sendEmail = require('../uitls/sendEmail')
const jwt = require('jsonwebtoken')
const { expressjwt } = require('express-jwt')



// register 
exports.addUser = async (req, res) => {
    // check email if already exists
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({ error: "Email already exist. Please Login different email" })
    }
    // create user
    let UserToAdd = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    // generate token
    let token = new Token({
        token: crypto.randomBytes(24).toString('hex'),
        user: UserToAdd._id
    })
    token = await token.save()
    {
        if (!token)
            return res.status(400).json({ error: "Something went wrong" })
    }
    // send token in email
    const url = `http://localhost:5000/api/confirm/${token.token}`
    sendEmail({
        form: "noreply@example.com",
        to: req.body.email,
        subject: "Verification Email",
        text: "click on the following link to activate you account" + url,
        html: `<a href='${url}'><button> Verify Email</button></a>`
    })
    // add user
    UserToAdd = await UserToAdd.save()
    if (!UserToAdd) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(UserToAdd)
}

//email verification
exports.verifyEmail = async (req, res) => {
    // check token
    const token = await Token.findOne({ token: req.params.token })
    if (!token) {
        return res.status(400).json({ error: "Invaild token or may have expired." })
    }
    // check user
    let user = await User.findById(token.user)
    if (!user) {
        return res.status(400).json({ error: "User not found" })
    }
    // check if already verified
    if (user.isVerified) {
        return res.status(400).json({ error: "User already verifired. Login to continue." })
    }
    // verified user
    user.isVerified = true
    user = await user.save()
    if (!user) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    return res.status(200).json({ error: "User verified Successfully. Login to continue." })
}
// resend verification link
exports.resendVerification = async (req, res) => {
    //check email
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "Email not register." })
    }
    //check if already verified
    if (user.isVerified) {
        return res.status(400).json({ error: "User already verified.login to continue" })
    }
    // generate token
    let token = new Token({
        user: user._id,
        token: crypto.randomBytes(24).toString('hex')
    })
    token = await token.save(400).json({ error: "Something went wrong." })
    //send in email
    const url = `http://localhost:5000/api/confirm/${token.token}`
    sendEmail({
        form: "noreply@example.com",
        to: req.body.email,
        subject: "Verification Email",
        text: "click on the following link to activate you account" + url,
        html: `<a href='${url}'><button> Verify Email</button></a>`
    })
    return res.status(200).json({ message: "Verification link has been sent to your email." })

}
// forgot password
exports.forgotPassword = async (req, res) => {
    // check email
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "Email not registered." })
    }
    // genetare token
    let token = new Token({
        token: crypto.randomBytes(24).toString('hex'),
        user: user._id
    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    // send token in email
    const url = `http://localhost:5000/api/resetpassword/${token.token}`
    sendEmail({
        form: "noreply@example.com",
        to: req.body.email,
        subject: "Reset Password",
        text: "click on the following link to activate you account" + url,
        html: `<a href='${url}'><button>Reset Password</button></a>`
    })
    return res.status(200).json({ message: "Password reset link has been sent to you email" })
}
// reset password
exports.resetPassword = async (req, res) => {
    //check password
    let token = await Token.findOne({ token: req.params.token })
    if (!token) {
        return res.status(200).json({ message: "Invaild token or token have expired" })
    }
    //find user
    let user = await User.findById(token.user)
    if (!user) {
        return res.status(400).json({ error: "User not found." })
    }
    // change password
    user.password = req.body.password
    // save user
    user = await user.save()
    if (!user) {
        return res.status(400).json({ error: "Something went worng" })
    }
    return res.status(200).json({ message: "Password changed succesfully" })
}
// signin process
exports.singin = async (req, res) => {
    //destructiong user inputs
    const { email, password } = req.body
    //check email
    let user = await User.findOne({ email: email })
    if (!user) {
        return res.status(400).json({ error: "User not registered" })
    }
    //change password
    if (!user.authenticate(password)) {
        return res.status(400).json({ error: "Email and password dosent match" })
    }
    // check if verified or not
    if (!user.isVerified) {
        return res.status(400).json({ error: "User not verified. Verify to Continue" })
    }
    // create login tooken
    const token = jwt.sign({ user: user._id, role: user.role }, process.env.JWT_SECRET)
    // set cookies
    res.cookie('myCookie', token, { expire: Date.now() + 84600 })
    // return information to user
    const { _id, username, role } = user
    return res.status(200).json({ token, user: { _id, username, email, role } })
}
// signout process
exports.signout = async (req, res) => {
    let response = await res.clearCookie('myCookie')
    if (!response) {
        return res.status(400).json({ error: "Something went worng" })
    }
    res.status(200).json({ message: "Logout successful" })
}
// authorization
exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
})
// find user by email
exports.findUserByEmail = async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        res.status(400).json({ error: "user not found" })
    }
    res.send(user)
}
// // find  by username
// exports.findUserByUser = async (req, res) => {
//     let user = await User.findOne({ email: req.body.username })
//     if (!user) {
//         res.status(400).json({ error: "email  not found" })
//     }
//     res.send(user)
// }
// find user details
exports.findnUser = async (req, res) => {
    let user = await User.findById(req.params.id)
    if (!user) {
        res.status(400).json({ error: "email not found" })
    }
    res.send(user)
}
// to get user lust
exports.userList = async (req, res) => {
    let users = await User.find(req.params.id)
    if (!users) {
        res.status(400).json({ error: "Something went Wrong" })
    }
    res.send(users)
}