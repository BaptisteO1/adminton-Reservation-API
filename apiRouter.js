const express = require('express');
var usersCtrl = require('./routes/authRoutes')

exports.router = (function() {
    var apiRouter = express.Router();

    apiRouter.route('/register/').post(usersCtrl.register);
    apiRouter.route('/login/').post(usersCtrl.login);

    return apiRouter;
})();