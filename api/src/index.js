const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/posts", commentsRouter);

app.get("/", (req, res) => {
  res.json({ message: "Blog API is running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});