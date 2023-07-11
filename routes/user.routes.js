const express = require('express');
const { register, login } = require('../controllers/user.controller');

const router = express();

const basePath = '/users';

router.post(`${basePath}/register`, register);
router.post(`${basePath}/login`, login)

exports.default = (app) => {
  app.use('/api', router);
}
