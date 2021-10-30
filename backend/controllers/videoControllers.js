const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ADD NEW VIDEO URL
// ROUTE - /api/videos/add
const addVideo = asyncHandler(async (req, res) => {
  const { episodeId } = req.query;
  const { videoUrl } = req.body;

  const newVideo = await prisma.video.create({
    data: {
      videoUrl,
      episode: {
        connect: {
          id: episodeId,
        },
      },
    },
  });

  if (!newVideo) throw new Error("Create New Video Request has Failed!");

  res.send("success");
});

// GET VIDEO BY ID
// ROUTE - /api/videos/:id
const getVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const video = await prisma.video.findUnique({
    where: {
      episodeId: id,
    },
  });

  if (!video) throw new Error("Get Video Request has Failed!");

  res.json(video);
});

// UPDATE VIDEO URL
// ROUTE - /api/videos/:id
const updateVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { videoUrl } = req.body;

  const updatedUrl = await prisma.video.update({
    where: { id },
    data: { videoUrl },
  });

  if (!updatedUrl) throw new Error("Update request has Failed!");

  res.send("success");
});

// DELETE VIDEO URL
// ROUTE - /api/videos/:id
const deleteVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedUrl = await prisma.video.delete({ where: { id } });

  if (!deletedUrl) throw new Error("Delete Request has Failed!");

  res.send("success");
});

module.exports = {
  addVideo,
  getVideo,
  updateVideo,
  deleteVideo,
};
