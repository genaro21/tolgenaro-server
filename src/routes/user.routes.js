const { Router } = require("express");
const router = Router();
const controllers = require("../controllers");

router.post("/signUp", controllers.user.signUp);
router.post("/signIn", controllers.user.signIn);
router.get("/logout", controllers.user.logout);

module.exports = router;
