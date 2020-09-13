const express = require ('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jsonpatch = require('jsonpatch');

router.post('/register', async (req, res) => {

  // make sure username not taken
  const userExists = await User.findOne({username: req.body.username})
  if (userExists) return res.status(400).send('username taken');
  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  // create the user
  const user = new User({
    username: req.body.username,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
console.log('1')
  const user = await User.findOne({username: req.body.username})
  if (!user) return res.status(400).send('invalid username');
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('invalid password');

  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);

  res.send('logged in!');
console.log('2')
  jsonPatch = [
    { op: "add", path: "/logedin", value: "yes" }
  ]
  online = jsonpatch.apply_patch(user, jsonPatch);
  res.send(online);
});

module.exports = router;
