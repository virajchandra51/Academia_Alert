const express = require("express");
const multer = require('multer');

const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

const upload = multer({ dest: 'public/images/user_images' });

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/getAll", userController.getAllUsers);

// Protect all routes after this middleware
//router.use(authController.protect);

router.patch("/updateMe", upload.single('photo'), userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

router.route("/createUser").post(userController.createUser);

router.route("/getAllUsers").get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

//PASSWORD RESET
router.post('/forgetPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);


module.exports = router;
