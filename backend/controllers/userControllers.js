const bcrypt = require("bcrypt");
const cookie = require("cookie");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/utils");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// REGISTER USER
// ROUTE - /api/users
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  if (userExists) throw new Error("User Already Exists!");

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  if (!newUser) throw new Error("Registration Failed!");

  const token = generateToken(newUser.id);

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "none",
      path: "/",
    })
  );

  res.status(200).json({
    username: newUser.username,
    email: newUser.email,
    id: newUser.id,
    isAdmin: newUser.isAdmin,
  });
});

// GET Rated Episodes
// ROUTE - /api/users/rated_episodes
const getRatedEpisodes = asyncHandler(async (req, res) => {
  if (!req.user) throw new Error("Not Authrozied!");

  const ratings = await prisma.rating.findMany({
    where: { authorId: req.user.id },
    select: { belongsId: true },
  });

  const ids = ratings.map((rt) => rt.belongsId);

  const ratedEpisodes = await prisma.episode.findMany({
    where: { id: { in: ids } },
    include: {
      _count: {
        select: {
          ratings: true,
        },
      },
    },
  });

  res.json(ratedEpisodes);
});

// GET FAVORITE EPISODES
// ROUTE - /api/users/favorite_episodes
const getFavoriteEpisodes = asyncHandler(async (req, res) => {
  if (!req.user) throw new Error("Not Authorized!");

  const favs = await prisma.favorite.findMany({
    where: { userId: req.user.id },
    select: { epsodeId: true },
  });

  const ids = favs.map((fv) => fv.epsodeId);

  const favEpisodes = await prisma.episode.findMany({
    where: { id: { in: ids } },
    include: {
      _count: {
        select: {
          ratings: true,
        },
      },
    },
  });

  if (!favEpisodes) throw new Error("Get Favorite Episdes request has Failed!");

  res.json(favEpisodes);
});

// GET USER
// ROUTE - /api/users/user
const getUser = asyncHandler(async (req, res) => {
  if (!req.user) throw new Error("Not Authrozied!");

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      username: true,
      email: true,
      id: true,
      _count: {
        select: {
          ratings: true,
          favorites: true,
        },
      },
    },
  });

  if (!user) throw new Error("Get User request has failed!");

  res.json(user);
});

// LOGOUT
// ROUTE - /api/users/logout
const logout = asyncHandler(async (req, res) => {
  if (req.user) {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: false,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "none",
        path: "/",
      })
    );

    res.send("Logged Out");
  }
});

// LOGIN USER
// ROUTE - /api/users/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new Error("Email's Incorrect!");

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) throw new Error("Password's Incorrect!");

  const token = generateToken(user.id);

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "none",
      path: "/",
    })
  );

  res.json({
    username: user.username,
    id: user.id,
    isAdmin: user.isAdmin,
  });
});

// UPDATE USER
// ROUTE - /api/users/update
const updateUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  let updatedPassword;

  if (password) {
    updatedPassword = await bcrypt.hash(password, 10);
  }

  if (req.user) {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        username: username || user.username,
        email: email || user.email,
        password: updatedPassword || user.password,
      },
    });

    if (!updatedUser) throw new Error("Update Has Failed!");

    res.json({
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  }
});

// DELETE USER ACCOUNT
// ROUTE - /api/users/delete_account
const deleteAccount = asyncHandler(async (req, res) => {
  if (!req.user) throw new Error("Not Authorized!");

  const id = req.user.id;

  const comments = prisma.comment.deleteMany({ where: { authorId: id } });
  const ratings = prisma.rating.deleteMany({ where: { authorId: id } });
  const favs = prisma.favorite.deleteMany({ where: { userId: id } });
  const user = prisma.user.delete({ where: { id } });

  const transaction = await prisma.$transaction([
    comments,
    ratings,
    favs,
    user,
  ]);

  if (!transaction) throw new Error("Delete Account Request has Failed!");

  res.send("success");
});

module.exports = {
  register,
  getRatedEpisodes,
  getFavoriteEpisodes,
  getUser,
  logout,
  login,
  updateUser,
  deleteAccount,
};
