const express = require('express')
const { addUser, verifyEmail, forgotPassword, resetPassword, singin, signout, resendVerification, findUserByEmail, findnUser, findUserByUser, userList } = require('../controller/userController')
const router = express.Router()

router.post('/register', addUser)
router.get('/confirm/:token', verifyEmail)
router.post('/forgetpassword', forgotPassword)
router.post('/resetpassword/:token', resetPassword)
router.post('/signin', singin)
router.get('/signout', signout)
router.post('/resendverification', resendVerification)
router.get('/finduser/:id', findnUser)
router.get('/finduserbyemail', findUserByEmail)
// router.get('/finduserbyuser', findUserByUser)
router.get('/userlist', userList)








module.exports = router