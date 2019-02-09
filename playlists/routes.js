const { Router } = require("express");
const Playlist = require("./model");
const User = require('../user/model');
const auth = require('../authentication/middleware')
const router = new Router();

router.post("/playlists", auth, (req, res, next) => {
  Playlist.create(req.body)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        });
      }
      return res.status(201).send(playlist);
    })
    .catch(error => next(error));
});

router.get("/playlists",auth, (req, res, next) => {
  Playlist.findAll()
    .then(playlists => {
      res.status(200).send(playlists);
    })
    .catch(error => next(error));
});

router.get("/playlists/:id", auth, (req, res, next) => {
  Playlist.findById(req.params.id,{ include: [User] })
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        });
      }
      return res.status(200).send(playlist);
    })
    .catch(error => next(error));
});

router.delete("/playlists/:id", auth, (req, res, next) => {
  Playlist.findById(req.params.id)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        });
      }
      return playlist.destroy().then(() =>
        res.status(200).send({
          message: `Playlist was deleted`
        })
      );
    })
    .catch(error => next(error));
});

module.exports = router;
