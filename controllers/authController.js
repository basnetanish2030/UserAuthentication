const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const authController = {
  showSignup: (req, res) => {
    res.render('signup');
  },

  signup: async (req, res) => {
    console.log(JSON.stringify(req.body));
    try {
      const { username, password } = req.body;
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck) {
        return res.json({
          msg: "Username already taken",
          status: false,
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      res.redirect('/login');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  },

  showLogin: (req, res) => {
    res.render('login');
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).render('login', { error: 'Invalid credentials' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).render('login', { error: 'Invalid credentials' });
      }
      res.send('Logged in successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  },
};

module.exports = authController;
