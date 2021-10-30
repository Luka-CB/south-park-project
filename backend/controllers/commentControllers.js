const asyncHandler = require("express-async-handler");

// CREATE COMMENT
// ROUTE - /api/comments
const createComment = asyncHandler(async (req, res) => {
  const { episodeId } = req.query;
  const { text } = req.body;

  if (!req.user) throw new Error("Not Authorized!");

  const newComment = await prisma.comment.create({
    data: {
      text,
      author: {
        connect: {
          id: req.user.id,
        },
      },
      belongs: {
        connect: {
          id: episodeId,
        },
      },
    },
  });

  if (!newComment) throw new Error("Create Comment Request has failed!");

  res.send("success");
});

// GET COMMENTS BY ID
// ROUTE - /api/comments/:id
const getComments = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comments = await prisma.comment.findMany({
    where: {
      belongsId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!comments) throw new Error("Get Comments Request has Failed!");

  res.json(comments);
});

// EDIT COMMENT
// ROUTE - /api/comments/:id
const editComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const editedComment = await prisma.comment.update({
    where: { id },
    data: { text },
  });

  if (!editedComment) throw new Error("Edit Comment request has Failed!");

  res.send("success");
});

// DELETE COMMENT BY ID
// ROUTE - /api/comments/:id
const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedComment = await prisma.comment.delete({ where: { id } });

  if (!deletedComment) throw new Error("Delete Comment Request has Failed!");

  res.send("success");
});

module.exports = {
  createComment,
  getComments,
  editComment,
  deleteComment,
};
