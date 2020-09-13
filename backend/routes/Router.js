const express = require ('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jsonpatch = require('jsonpatch');

class Router {
  constructor(app, user) {
    this.login(app, user);
    this.logout(app, user);
    this.isLoggedin(app, user);
  }

  login(app, user) {
    app.post('/login', (req,res) => {
      const user = await User.findOne({username: req.body.username})
      const validPass = await bcrypt.compare(req.body.password, user.password);
    });
  }

  logout(app, user) {

  }

  isLoggedin(app, user) {

  }
}

module.exports = Router
