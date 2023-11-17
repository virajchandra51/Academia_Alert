const Announcement = require("./../models/announcementModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.createNew = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newAnnouncement = await Announcement.create({
    title: req.body.title,
    description: req.body.description,
    associatedClub: req.body.associatedClub,
    //imageCover: req.body.imageCover,
  });

  res.status(201).json({
    status: "success",
    data: {
      newAnnouncement,
    },
  });
});
