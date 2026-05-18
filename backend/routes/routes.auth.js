const { Router } = require("express");
const { createUser, loginUser, deleteUser, getUsers } = require("../controllers/authController");
const router = Router()

// FOR DEVELOPMENT ONLY
// router.get('/', getUsers);
router.delete('/:id', deleteUser);

router.post('/register', createUser);
router.post('/login', loginUser);


module.exports = router