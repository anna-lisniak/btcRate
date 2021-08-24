const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const createUser = require('../controlers/user/create');
const login = require('../controlers/user/login');

router.post('/create', createUser)

router.post("/login", login)

module.exports = router;
=======
const savePersonToPublicFolder = require('../controlers/user/create');
const { findUser } = require('../controlers/user/utils');
const jwt = require('jsonwebtoken');

router.post('/create', (req, res, next) => {
  const { body: { email, password } } = req;
  if (!email || !password) {
    res.status(404).send("You should provide email and password");
    return;
  }

  if (findUser(email)) {
    res.status(404).send('User with this email already exist');
    return;
  }

  savePersonToPublicFolder({ email, password }, (err) => {
    if (err) {
      res.status(500).send('Internal server error');
      return;
    }


    const token = jwt.sign(
      { email, password },
      process.env.SECRET,
      { expiresIn: 60 * 60 }
    );

    res.cookie("btcToken", token, { httpOnly: true });

    res.status(200).json({ token });
  });
});

router.post("/login", (req, res, next) => {
  const { body: { email, password } } = req;

  const user = findUser(email);
  if (!user) {
    res.status(404).send("User with this email is not found");
    return;
  }

  if (user !== password) {
    res.status(400).send("Invalid password")
    return;
  }

  const token = jwt.sign(
    { email, password },
    process.env.SECRET,
    { expiresIn: 60 * 60 }
  );

  res.cookie("btcToken", token, { httpOnly: true });

  res.status(200).json({ token });

})

module.exports = router;
>>>>>>> 070aeee1702ab40143c03a81444617f4a73706c9
