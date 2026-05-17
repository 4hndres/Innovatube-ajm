const { response } = require("express");
const { youtube } = require("../api/config");

const searchVideos = async(req, res = response={}) => {
    const {q, type, maxResults} = req.query

      try {
        const resp = await youtube.search.list({
            part:"snippet",
            q: q|| "VULTURES",
            type: type || "video",
            maxResults: parseInt(maxResults) || 10
        });

        const videos = resp.data.items;

        if (!videos) {
            return res.status(404).json({
            ok: false,
            msg: "No video found :(",
        });
    }

    res.json({
      ok: true,
      videos
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Talk with the admin",
    });
  }
}

module.exports = { searchVideos };