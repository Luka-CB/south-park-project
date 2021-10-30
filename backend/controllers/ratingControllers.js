const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// MAKE RATING
// ROUTE - /api/ratings
const makeRating = asyncHandler(async (req, res) => {
  const { rateNum } = req.body;
  const { epId } = req.query;

  if (!req.user) throw new Error("Not Authorized!");

  const ratings = await prisma.rating.findMany({
    where: { belongsId: epId },
  });

  // Creating or updating rating

  const ratingExists = ratings.find((rt) => rt.authorId === req.user.id);

  let result;

  if (ratingExists) {
    result = await prisma.rating.update({
      where: { id: ratingExists.id },
      data: { rateNum },
    });
  } else {
    result = await prisma.rating.create({
      data: {
        rateNum,
        author: {
          connect: {
            id: req.user.id,
          },
        },
        belongs: {
          connect: {
            id: epId,
          },
        },
      },
    });
  }

  if (!result) throw new Error("Something Went Wrong!");

  // Calculating and updating avgRating field in episode model

  const updatedRatings = await prisma.rating.findMany({
    where: { belongsId: epId },
  });

  const nums = updatedRatings.map((rt) => rt.rateNum);

  const avg =
    nums.reduce((acc, val) => {
      return acc + val;
    }, 0) / nums.length.toFixed(1);

  const updateAvgRating = await prisma.episode.update({
    where: { id: epId },
    data: { avgRating: avg },
  });

  if (!updateAvgRating) throw new Error("Update AvgRating has Failed!");

  res.send("success");
});

// GET RATING
// ROUTE - /api/ratings/:id
const getRating = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!req.user) throw new Error("Not Authorized!");

  const ratings = await prisma.rating.findMany({
    where: {
      belongsId: id,
    },
  });

  const rating = ratings.find((rt) => rt.authorId === req.user.id);

  if (!rating) throw new Error("Get Rating Request has Failed!");

  res.json(rating);
});

// DELETE RATING
// ROUTE - /api/ratings/:id
const deleteRating = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedRating = await prisma.rating.delete({ where: { id } });

  if (!deletedRating) throw new Error("Delete Rating Request has Failed!");

  res.send("success");
});

// GET USER RATINGS
// ROUTE - /api/ratings/user_rating
const getUserRatings = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const ratings = await prisma.rating.findMany({
    where: { authorId: id },
    select: {
      id: true,
      rateNum: true,
      belongsId: true,
    },
  });

  if (!ratings) throw new Error("Get User Ratings Request has Failed!");

  res.json(ratings);
});

module.exports = {
  makeRating,
  getRating,
  deleteRating,
  getUserRatings,
};
