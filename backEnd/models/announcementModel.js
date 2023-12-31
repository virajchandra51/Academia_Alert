const mongoose = require("mongoose");
const slugify = require("slugify");
// const User = require('./userModel');
// const validator = require('validator');

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A announcement must have a title"],
      unique: true,
      trim: true,
      // validate: [validator.isAlpha, 'announcement name must only contain characters']
    },

    associatedClub: {
      type: String,
    },

    description: {
      type: String,
      trim: true,
      required: [true, "A announcement must have a description"],
    },
    imageCover: {
      type: String,
      //required: [true, "A announcement must have a cover image"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// announcementSchema.index({ price: 1 });
// announcementSchema.index({ price: 1, ratingsAverage: -1 });
// announcementSchema.index({ slug: 1 });
// announcementSchema.index({ startLocation: "2dsphere" });

// announcementSchema.virtual("durationWeeks").get(function () {
//   return this.duration / 7;
// });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
announcementSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// announcementSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// announcementSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// announcementSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// announcementSchema.pre('find', function(next) {
// announcementSchema.pre(/^find/, function (next) {
//   this.find({ secretannouncement: { $ne: true } });

//   this.start = Date.now();
//   next();
// });

// announcementSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "guides",
//     select: "-__v -passwordChangedAt",
//   });

//   next();
// });

// announcementSchema.post(/^find/, function (docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//   next();
// });

// AGGREGATION MIDDLEWARE
// announcementSchema.pre('aggregate', function(next) {
//   this.pipeline().unshift({ $match: { secretannouncement: { $ne: true } } });

//   console.log(this.pipeline());
//   next();
// });

const announcement = mongoose.model("announcement", announcementSchema);

module.exports = announcement;
