const asyncHandler = require("express-async-handler");

// ADD NEW EPISODE
// ROUTE - /api/episodes/:id/add
const addNewEpisode = asyncHandler(async (req, res) => {
  const seasonId = req.params.id;
  const { positionNum, title, description, airDate, thumbnail } = req.body;

  const newEpisode = await prisma.episode.create({
    data: {
      positionNum: +positionNum,
      title,
      description,
      airDate: new Date(airDate),
      thumbnail,
      season: {
        connect: {
          id: seasonId,
        },
      },
    },
  });

  if (!newEpisode) throw new Error("Creating New Episode has Failed!");

  res.send("success");
});

// GET EPISODE BY ID
// ROUTE - /api/episodes/:id
const getEpisode = asyncHandler(async (req, res) => {
  const epId = req.params.id;

  const episode = await prisma.episode.findUnique({
    where: {
      id: epId,
    },
  });

  if (!episode) throw new Error("Request has Failed!");

  res.json(episode);
});

// GET HIGHEST RATED EOISODES
// ROUTE - /api/episodes/highest_rated
const getHighestRatedEpisodes = asyncHandler(async (req, res) => {
  const ratings = await prisma.episode.findMany({
    orderBy: {
      avgRating: "desc",
    },
    select: {
      id: true,
      title: true,
      thumbnail: true,
      avgRating: true,
    },
  });

  const episodes = ratings
    .filter((rating) => rating.avgRating !== null)
    .slice(0, 4);

  if (!episodes)
    throw new Error("Get Highest Rated Episodes Request has Failed!");

  res.json(episodes);
});

// GET EPISODES FROM LATEST SEASON
// ROUTE - /api/episodes/latest
const getEpisodesFromLatestSeason = asyncHandler(async (req, res) => {
  const seasons = await prisma.season.findMany({ orderBy: { season: "asc" } });

  const latestSeason = seasons[seasons.length - 1];

  const latestEpisodes = await prisma.episode.findMany({
    where: { seasonId: latestSeason.id },
    select: {
      id: true,
      title: true,
      thumbnail: true,
      avgRating: true,
    },
  });

  const episodes = latestEpisodes.slice(0, 4);

  res.json({ episodes, seasonNum: latestSeason.season });
});

// EDIT EPISODE
// ROUTE - /api/episodes/:id/edit
const editEpisode = asyncHandler(async (req, res) => {
  const epId = req.params.id;
  const { positionNum, title, description, airDate, thumbnail } = req.body;

  const episode = await prisma.episode.findUnique({
    where: {
      id: epId,
    },
  });

  const updatedEpisode = await prisma.episode.update({
    where: {
      id: epId,
    },
    data: {
      positionNum: +positionNum || episode.positionNum,
      title: title || episode.title,
      description: description || episode.description,
      airDate: airDate || episode.airDate,
      thumbnail: thumbnail || episode.thumbnail,
    },
  });

  if (!updatedEpisode) throw new Error("Update Request has Failed!");

  res.send("success");
});

// DELETE EPISODE
// ROUTE - /api/episodes/:id/delete
const deleteEpisode = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedEpisode = await prisma.episode.delete({
    where: {
      id,
    },
  });

  if (!deletedEpisode) throw new Error("Delete Request has Failed!");

  res.send("success");
});

const getEpisodes = asyncHandler(async (req, res) => {
  const { seasonId } = req.query;

  const episodes = await prisma.episode.findMany({
    where: { seasonId },
    orderBy: { positionNum: "asc" },
    include: {
      _count: {
        select: { ratings: true },
      },
    },
  });

  if (!episodes) throw new Error("Get Episodes request has Failed!");

  res.json(episodes);
});

module.exports = {
  addNewEpisode,
  getEpisode,
  editEpisode,
  deleteEpisode,
  getEpisodes,
  getHighestRatedEpisodes,
  getEpisodesFromLatestSeason,
};
