const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");


const router = new Router();

router.post("/users", (req, res) => {
  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  };
  User.create(user).then(user => {
    if (!user) {
      res.status(400).send({
        message: "Please supply a valid email and password"
      });
    }
    return res
      .status(201)
      .send(user)
      .catch(error => next(error));
  });
});

module.exports = router;
