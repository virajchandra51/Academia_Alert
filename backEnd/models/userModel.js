const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Please tell us your email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  role: {
    type: String,
    default: "User",
  },

  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      //This only works on CREATE NEW OBJECT IN DB or SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Confirm Password does not match",
    },
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

//The middleware will run 'pre' to the 'save' action, i.e. before placing the data into db
userSchema.pre("save", async function (next) {
  // run this function iff password is modified
  if (!this.isModified("password")) return next();

  // Hashing password with a cost of 12; hash method is async in nature
  this.password = await bcrypt.hash(this.password, 12);

  // Delete password confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

//FORGET PASSWORD
userSchema.methods.createForgetPasswordResetToken = function () {
  //GENERATE RANDOM TOKEN (RANDOM PASSWORD TO BE SENT TO USER VIA EMAIL) USING INBUILT crypto
  const randomTokenOrPassword = crypto.randomBytes(32).toString("hex");
  //HASH THE RANDOM TOKEN (PASSWORD) AND UPDATE DB WITH THE HASHED PASSWORD AND EXPIRE DATE(TIME 10min)
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(randomTokenOrPassword)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  console.log({ randomTokenOrPassword }, this.passwordResetToken);

  //WE'LL RETURN/SEND THE UNENCRYPTED VERSION OF RANDOM PASSWORD VIA MAIL AND SAVE THE ENCRYPTED VERSION INTO THE DB
  return randomTokenOrPassword;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
