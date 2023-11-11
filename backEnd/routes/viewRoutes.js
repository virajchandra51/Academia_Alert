const express = require('express');

//CONTROLLERS
const splashScreenController = require('./../controllers/splashScreenController')

const router = express.Router();

router.get('/', splashScreenController.getSplashScreen);

module.exports = router;