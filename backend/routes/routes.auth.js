const { Router } = require("express");
const { googleSignIn } = require("../controllers/authController");
const router = Router()

router.post('/', googleSignIn)

module.exports = router