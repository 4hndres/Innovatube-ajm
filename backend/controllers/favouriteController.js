const Favourite = require('../models/Favourite');

const addFavourite = async (req, res) => {
    const { userEmail, videoId, title, thumbnail } = req.body;

    try {
        const exists = await Favourite.findOne({ userEmail, videoId });
        if (exists) return res.status(400).json({ ok: false, msg: 'This video is aleready on the list' });

        const newFavorito = new Favourite({ userEmail, videoId, title, thumbnail });
        await newFavorito.save();

        res.json({ ok: true, msg: 'Added to favourites' });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Server Error' });
    }
};

const getFavourites = async (req, res) => {
    const { email } = req.query; 
    try {
        const favourites = await Favourite.find({ userEmail: email });
        res.json({ ok: true, favourites });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Server Error' });
    }
};

const deleteFavourite = async (req, res) => {
  const favId = req.params.id;

  try {
    const fav = await Favourite.findById(favId);
    if (!fav) {
      return res.status(404).json({
        ok: false,
        msg: "There is no favourite video with the given id!!!",
      });
    }

    await Favourite.findByIdAndDelete(favId);

    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Talk with the admin",
    });
  }
};

module.exports = { addFavourite, getFavourites, deleteFavourite };
