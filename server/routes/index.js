const express = require("express");
const router = express.Router();

const homeController = require("../controller/homeController");
const userController = require("../controller/userController");

// router.get('/',userController.profile);
// router.get("/", async function (req, res) {
//   return res.send("Hello APP");
// });

router.use("/users", require("./users"));
router.use("/article", require("./article"));
router.use("/chat", require("./chat"));
router.use("/home", require("./home"));

module.exports = router;
