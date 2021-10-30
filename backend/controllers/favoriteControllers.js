const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ADD TO FAVORITE
// ROUTE - /api/favorites
const addToFavorite = asyncHandler(async (req, res) => {
  const { epId } = req.body;

  if (!req.user) throw new Error("Not Authorized!");

  const newFav = await prisma.favorite.create({
    data: {
      epsodeId: epId,
      user: {
        connect: {
          id: req.user.id,
        },
      },
    },
  });

  if (!newFav) throw new Error("Create Favorite Request has Failed!");

  res.send("success");
});

// GET FAVORITE
// ROUTE - /api/favorites
const getFavorite = asyncHandler(async (req, res) => {
  const { epId } = req.query;

  if (!req.user) throw new Error("Not Authorized!");

  const favs = await prisma.favorite.findMany({
    where: { epsodeId: epId },
  });

  const fav = favs.find((fv) => fv.userId === req.user.id);

  if (!fav) throw new Error("get Favorite request has failed!");

  res.json(fav);
});

// REMOVE FAVORITE
// ROUTE - /api/favorites/:id
const removeFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!req.user) throw new Error("Not Authorized!");

  const rmFav = await prisma.favorite.delete({ where: { id } });

  if (!rmFav) throw new Error("Remove favorite Request has Failed!");

  res.send("success");
});

module.exports = {
  addToFavorite,
  getFavorite,
  removeFavorite,
};
