const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// CREATE SEASON
// ROUTE - /api/seasons/create
const createSeason = asyncHandler(async (req, res) => {
  const { season, year, poster } = req.body;

  const newSeason = await prisma.season.create({
    data: {
      season: +season,
      year: +year,
      poster,
    },
  });

  if (!newSeason) throw new Error("New season Did Not Created!");

  res.send("Success");
});

// GET SEASONS
// ROUTE - /api/seasons/get
const getSeasons = asyncHandler(async (req, res) => {
  const seasons = await prisma.season.findMany({
    orderBy: {
      season: "asc",
    },
  });

  if (!seasons) throw new Error("Something Went Wrong!");

  res.json(seasons);
});

// UPDATE SEASONS
// ROUTE - /api/seasons/:num/update
const updateSeason = asyncHandler(async (req, res) => {
  const { season, year, poster } = req.body;
  const num = req.params.num;

  const updatedSeason = await prisma.season.update({
    where: {
      season: +num,
    },
    data: {
      season: +season,
      year: +year,
      poster,
    },
  });

  if (!updatedSeason) throw new Error("Season Update has Failed!");

  res.send("success");
});

// GET SEASON By Num
// ROUTE - /api/seasons/:num
const getSeasonByNum = asyncHandler(async (req, res) => {
  const season = await prisma.season.findUnique({
    where: {
      season: +req.params.num,
    },
    include: {
      _count: {
        select: { episodes: true },
      },
    },
  });

  if (!season) throw new Error("Request has Failed!");

  res.json(season);
});

module.exports = {
  createSeason,
  getSeasons,
  updateSeason,
  getSeasonByNum,
};
