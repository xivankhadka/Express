const express = require("express")
const { placeOrder, viewOrders, orderDetails, userOrder, findOrderByStatus, updateOrder, deleteOrder } = require("../controller/OrderController")
const router = express.Router()



router.post('/placeorder', placeOrder)
// router.get('/items', getOrderItems)
router.get('/orderlist', viewOrders)
router.get('/orderdetails/:order_id', orderDetails)
router.get('/userorder/:user_id', userOrder)
router.post('/findorderbystatus', findOrderByStatus)
router.put('/updateorder', updateOrder)
router.get('/deleteorder/:id', deleteOrder)


module.exports = router