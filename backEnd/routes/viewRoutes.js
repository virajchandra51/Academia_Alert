const express = require('express');

//CONTROLLERS
const splashScreenController = require('./../controllers/splashScreenController');
const viewsController = require('./../controllers/viewController');
const router = express.Router();

router.get('/', splashScreenController.getSplashScreen);
router.get("/signup", viewsController.getSignupForm);

module.exports = router;