const express = require('express')
require('dotenv').config()
require('./database/connection')
const port = process.env.PORT

// middleware
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')



// routes
// const TestRoute = require('./route/testRoute')
const CategoryRoute = require('./route/categoryRoute')
const ProductRoute = require('./route/productRoute')
const UserRoute = require('./route/userRoute')
const OrderRoute = require('./route/orderRoute')


const app = express()

/// midleware
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())



//routes
// app.use(TestRoute)
app.use('/api', CategoryRoute)
app.use('/api', ProductRoute)
app.use('/api', UserRoute)
app.use('/api', OrderRoute)
app.use('/public/uploads', express.static('public/uploads'))


// to acces api from browser
app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})







// app.get(path , function) ->
// path -> ulr
// fuction -> what to do
// function (re qest, response)
// response -> data to user form server
// reqest -> data from user to server







// app.get('/first', (req, res) => {
//     res.send("hellow worldd")
// })


// console.log(port)
// console.log('hello world')

// const date = new Date()
// console.log(date)

// /// differences between node js and vanilla js
// // -node runs on server, vanillla js on browser
// // -node is for backend
// // - console is terminal window

// const os = require('os')
// const path = require('path')
// const fs = require('fs')
// const crypto = require('crypto')


// const { dirname } = require('path')
// const add = require('./server')
// const add2 = require('./server')



// let ans = add(2,3)
// console.log(ans)

// ans = add2(5,10)
// console.log(ans)

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())
// console.log(os.hostname())

// console.log(__dirname)
// console.log(__filename)