const { Router } = require("express");
const router = Router();
const controllers = require("../controllers");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/image/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

const uploads = multer({ storage: storage });

router.post("/create", uploads.single("image"), controllers.product.create);
router.get("/all", controllers.product.all);
router.get("/get/:_id", controllers.product.get);
router.post("/getName", controllers.product.getName);
router.get("/getCategory/:categoria", controllers.product.getCategory);
router.put("/update/:_id", controllers.product.update);
router.delete("/delete/:_id", controllers.product.remove);

module.exports = router;
