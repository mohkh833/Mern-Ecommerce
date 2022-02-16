const router = require("express" ).Router()
const stripeController = require('../Controller/stripeController')

router.post("/payment", stripeController.createPayment )

module.exports = router