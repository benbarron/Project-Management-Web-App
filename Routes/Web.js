const route = require('express').Router();

const { User } = model;

route.get('/reset-password', LoginController.showResetPasswordForm);
route.post('/reset-password', LoginController.resetPassword);

route.get('*', (req, res) => res.render('App'));

module.exports = route;
