require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const colors = require("colors");
colors.setTheme({
  custom: ['red', 'underline', 'bold', 'inverse', 'bgMagenta'],
  cond: ["green", "bgWhite"]
});
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

// middleware functions
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
  console.log(req.path.cond, req.method.custom);
  next();
})
app.use('/api/user', userRoutes)
app.use('/api/blogs', blogRoutes)

mongoose.connect(process.env.MONGO_URI).then(() => {
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`.custom);
});
});
