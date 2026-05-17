const { Router } = require("express");
const { searchVideos } = require("../controllers/videosController");
const router = Router();

router.get('/', searchVideos);

module.exports = router