const { Router } = require("express");
const { googleSignIn, createUser, loginUser, deleteUser, getUsers } = require("../controllers/authController");
const router = Router()

router.post('/', googleSignIn)

router.get('/', getUsers);
router.post('/register', createUser);
router.post('/login', loginUser);
router.delete('/:id', deleteUser);


module.exports = router