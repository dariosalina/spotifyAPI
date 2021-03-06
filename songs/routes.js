const { Router } = require("express");
const Song = require("./model");
const Playlist = require("../playlists/model");

const router = new Router();

router.post("/playlists/:id/songs", (req, res, next) => {
  // Find playlist by id
  Playlist.findById(req.params.id)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        });
      }
      // Post a song in playlist
      Song.create(req.body)
        .then(song => {
          if (!song) {
            return res.status(404).send({
              message: `Song does not exist`
            });
          }
          return res.status(201).send(song);
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

module.exports = router;
