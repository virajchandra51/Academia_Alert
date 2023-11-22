const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const Email = require("./../utils/email");

const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  if (statusCode == 1) {
    res.status(statusCode).json({
      status: "success",
      statusCode: statusCode,
      token,
      data: {
        user,
      },
    });
  }
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  //SEND THE WELCOME EMAIL TO THE USER
  // const url = `${req.protocol}://${req.get('host')}/me`;
  // console.log(url);
  // await new Email(newUser, url).sendWelcome();

  // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
  //   expiresIn: process.env.JWT_EXPIRES_IN,
  // });

  createSendToken(newUser, 1, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Checking for existence of email and password
  if (!email || !password) {
    return next(new AppError("Please provide Email and Password!", 0));
  }

  // Checking if user exists and credentials are correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 0));
  }
  // if everything is okay, send the token to client
  createSendToken(user, 1, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist.", 0)
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 0)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

// Protect route for admin
// Define a middleware function to check if the user is an admin
exports.restrictToAdmin = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // Check if the user is an admin
  if (currentUseruser.role !== "admin") {
    return next(
      new AppError("You do not have permission to perform this action.", 403)
    );
  }

  // If the user is an admin, grant access to the protected route
  next();
});

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  console.log("running fine");
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

//FORGET PASSWORD
exports.forgetPassword = catchAsync(async (req, res) => {
  const eMail = req.body.email;
  const user = await User.findOne({ email: eMail });
  //1) Check if user email exist in db
  if (!user) {
    res.status(200).json({
      status: "fail",
      message: "this email does not exist",
    });
  }
  //2) Generate a random reset token/password
  const resetToken = user.createForgetPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3) send it to users email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Send a PATCH req with your new password and confirm password to: ${resetURL} \n if you didn't forgot your password then please ignore this email`;

  try {
    // await sendEmail({
    //   email: eMail,
    //   subject: 'This link is only valid for next 10 mins',
    //   message: message
    // })

    res.status(200).json({
      status: "success",
      message: "Token sent to email",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save({ validateBeforeSave: false });
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //1) GET USER BASED ON THE TOKEN HE FROM THE URL PARAMETER
  const tokenFromUserParam = req.params.token;
  //2) HASH THE TOKEN WITH CRYPTO TO MATCH IT FROM DB(ALREADY MADE AWAILABLE IN DB AT THE TIME OF FORGET PASSWORD REQ)
  const hashedToken = crypto
    .createHash("sha256")
    .update(tokenFromUserParam)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //If token has expire
  if (!user) {
    return next(new AppError("Token is invalid or has already expired!", 400));
  }

  //3) SET NEW PASSWORD AND MAKE THE TOKEN AND EXPIRED TIME TO 0
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //3) UPDATE changedPasswordAt property from db
  //4) LOG THE USER IN, SEND JWT
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});
