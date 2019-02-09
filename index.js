const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./user/routes");
const playlistsRouter = require("./playlists/routes");
const songsRouter = require("./songs/routes");
const authenticationRouter = require('./authentication/routes')
const app = express();
const port = process.env.PORT || 4001;

app
  .use(bodyParser.json())
  .use(userRouter)
  .use(playlistsRouter)
  .use(songsRouter)
  .use(authenticationRouter)
  .listen(port, () => console.log(`Listening on port ${port}`));
