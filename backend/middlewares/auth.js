const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const auth = asyncHandler(async (req, res, next) => {
  if (req.headers.cookie) {
    try {
      const { token } = cookie.parse(req.headers.cookie);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
        select: {
          username: true,
          email: true,
          id: true,
          isAdmin: true,
        },
      });

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized, Token!");
    }
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an Admin!");
  }
};

module.exports = { auth, admin };
