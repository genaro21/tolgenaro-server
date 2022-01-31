const { Router } = require("express");
const router = Router();
const controllers = require("../controllers");

router.post("/createSale", controllers.sale.createSale);
router.post("/createSale2", controllers.sale.createSale2);

module.exports = router;
