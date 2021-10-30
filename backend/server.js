const express = require("express");
const cors = require("cors");
const path = require("path");
require("colors");
const { notFound, errorHandler } = require("./middlewares/errors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/seasons", require("./routes/seasonRoutes"));
app.use("/api/episodes", require("./routes/episodeRoutes"));
app.use("/api/videos", require("./routes/videoRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/ratings", require("./routes/ratingRoutes"));
app.use("/api/favorites", require("./routes/favoriteRoutes"));
app.use("/api/news", require("./routes/newsRoues"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    );
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is up and running on port ${PORT}`.brightMagenta.bold)
);
