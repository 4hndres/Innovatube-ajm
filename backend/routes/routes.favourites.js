const { Router } = require("express");
const { addFavourite, getFavourites, deleteFavourite } = require("../controllers/favouriteController");
const router = Router();

router.post('/', addFavourite);
router.get('/', getFavourites);
router.delete("/:id", deleteFavourite);

module.exports = router