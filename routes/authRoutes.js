const bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');

// Constants
const USERNAME_REGEX = /^[a-zA-Z0-9_]{4,20}$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,30}$/;

module.exports = {
  register: function(req, res) {

    var username = req.body.username;
    var password = req.body.password;

    if (username == null || password == null) {
      return res.status(400).json({'error': 'missing parameters'});
    }

    if (username.length >= 20 || username.length <= 3) {
      return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12)' });
    }

    if (!USERNAME_REGEX.test(username)) {
      return res.status(400).json({ 'error': 'email is not valid' });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({ 'error': 'password invalid (must length 4 - 30 and include 1 number at least)' });
    }

    models.User.findOne({
      attributes: ['username'],
      where: { username: username}
    })
    .then(function(userFound) {
      if (!userFound) {
        bcrypt.hash(password, 5, function(err, bcryptedPassword) {
          var newUser = models.User.create({
            username: username,
            password: bcryptedPassword,
            isAdmin: 1
          })
          .then(function(newUser) {
            return res.status(201).json({
              'userId': newUser.id
            })
          })
          .catch(function(err) {
            return res.status(500).json({'error': 'cannot add user'})
          })
        });
      } else {
        return res.status(409).json({'error': 'user already exist'});
      }
    }) 
    .catch(function(err) {
      return res.status(500).json({'error': 'unable to verify user'});
    })

  },

  login: function(req, res) {
    
    var username = req.body.username;
    var password = req.body.password;

    if (username == null || password == null) {
      return res.status(400).json({'error': 'missing parameters'});
    }

    models.User.findOne({
      where: { username: username}
    })
    .then(function(userFound) {
      if (userFound) {
        bcrypt.compare(password, userFound.password, function(errBcrypt, resBcrypt) {
          if (resBcrypt) {
            return res.status(200).json({
              'userId': userFound.id,
              'token': jwtUtils.generateTokenForUser(userFound)
            });
          } else {
            return res.status(403).json({'error': 'invalid password'});
          }
        });
      } else {
        return res.status(404).json({'error': 'user not exist in DB'});
      }
    }) 
    .catch(function(err) {
      return res.status(500).json({'error': 'unable to verify user'});
    })
  }
}
