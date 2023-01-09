const Blog = require("../models/blogModel");

// get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: "404: Resource not found" });
  }
};

// get all blogs by user by user_id
const getBlogsByUserID = async (req, res) => {
  try {
    const userBlogs = await Blog.find({ user_id });
    res.status(200).json(userBlogs);
  } catch (error) {
    res.status(400).json(error);
  }
};

// get a blog by id
const getBlogByID = async (req, res) => {
  const { id } = req.params;
  try {
    const userBlogs = await Blog.findById(id);
    res.status(200).json(userBlogs);
  } catch (error) {
    res.status(400).json(error);
  }
};

// create a new blog
const createBlog = async (req, res) => {
  const { title, article, image, comments } = req.body;
  try {
    const user_id = req.user;
    const newBlogs = await Blog.create({
      title,
      article,
      image,
      comments,
      user_id,
    });
    res.status(200).json(newBlogs);
  } catch (error) {
    res.status(400).json(error);
  }
};

// post a comment to a specific blog
const addComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const comment = await Blog.findOneAndUpdate({ id }, comment);
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json(error);
  }
};

// delete a blog by id
const deleteBlogByID = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.status(200).json(deletedBlog);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllBlogs,
  getBlogsByUserID,
  getBlogByID,
  createBlog,
  addComment,
  deleteBlogByID,
};
