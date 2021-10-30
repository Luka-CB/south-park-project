const asyncHandler = require("express-async-handler");

// ADD NEWS
// ROUTE - /api/news
const addNews = asyncHandler(async (req, res) => {
  const { title, body } = req.body;

  const news = await prisma.news.create({
    data: {
      title,
      body,
    },
  });

  if (!news) throw new Error("Create News Request has Failed!");

  const newsCount = await prisma.news.count();

  if (newsCount > 20) {
    const allNews = await prisma.news.findMany({
      orderBy: { createdAt: "asc" },
    });

    const deleteOldest = await prisma.news.delete({
      where: {
        id: allNews[0].id,
      },
    });

    if (!deleteOldest) console.log("failed");
  }

  res.send("success");
});

// GET ALL NEWS
// ROUTE - /api/news
const getNews = asyncHandler(async (req, res) => {
  const { sort } = req.query;

  const news = await prisma.news.findMany({
    orderBy: {
      createdAt: sort,
    },
  });

  if (!news) throw new Error("Get News Request has Failed!");

  res.json(news);
});

// GET SINGLE NEWS
// ROUTE - /api/news/:id
const getSingleNews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const singleNews = await prisma.news.findUnique({ where: { id } });

  if (!singleNews) throw new Error("Get Single News request has Failed!");

  res.json(singleNews);
});

// EDIT NEWS
// ROUTE - /api/news/:id
const editNews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const updatedNews = await prisma.news.update({
    where: { id },
    data: {
      title,
      body,
    },
  });

  if (!updatedNews) throw new Error("Update News Request has Failed!");

  res.send("success");
});

// DELETE NEWS BY ID
// ROUTER - /api/news/:id
const deleteNews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedNews = await prisma.news.delete({ where: { id } });

  if (!deletedNews) throw new Error("Delete News Request has Failed!");

  res.send("success");
});

module.exports = {
  addNews,
  getNews,
  getSingleNews,
  editNews,
  deleteNews,
};
