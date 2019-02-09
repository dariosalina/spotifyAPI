const Sequelize = require("sequelize");
const sequelize = require("../db");
const Song = require('../songs/model')
const User = require('../user/model')




const Playlist = sequelize.define(
  "playlists",
  {
    name: {
      type: Sequelize.STRING,
      field: "name",
      allowNull: false
    },
    UserId: {
      type: Sequelize.INTEGER,
      field: "user_id"
    }
  },

  {
    timestamps: false,
    tableName: "playlists"
  }
);

Playlist.hasMany(Song);
Playlist.belongsTo(User)

module.exports = Playlist;
