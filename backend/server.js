const express = require("express");
require("colors");
const prisma = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errors");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  prisma;
  next();
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/seasons", require("./routes/seasonRoutes"));
app.use("/api/episodes", require("./routes/episodeRoutes"));
app.use("/api/videos", require("./routes/videoRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/ratings", require("./routes/ratingRoutes"));
app.use("/api/favorites", require("./routes/favoriteRoutes"));
app.use("/api/news", require("./routes/newsRoues"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is up and running on port ${PORT}`.brightMagenta.bold)
);
