const Blog = require("../model/BlogModel");
const mongoose = require("mongoose");

// ~ get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ updatedAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  ~ get user blogs
const getSpecificUserBlog = async (req, res) => {
  const { id } = req.params;
  console.log("hello", id);
  try {
    const blogs = await Blog.find({user_id:id}).sort({ updatedAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ~ get a specific blog
const getSpecificBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Invalid ID");
  }

  const blog = await Blog.findById({ _id: id });

  if (!blog) {
    return res.status(404).send("No blog with that id");
  }

  return res.status(200).json(blog);
};

// ~ post a new blog
const postNewBlog = async (req, res) => {
  const { title, desc, photo } = req.body;
  let emptyFields = [];

  if (!title) emptyFields.push("title");
  if (!desc) emptyFields.push("desc");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const author = req.user.email;
    const user_id = req.user._id;
    let newBlog = new Blog({
      title,
      desc,
      user_id,
      author,
      photo,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ~ put an existing blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Invalid ID");
  }

  const blog = await Blog.findByIdAndUpdate(id, { ...req.body }, { new: true });

  if (!blog) {
    return res.status(404).send("No blog with that id");
  }

  return res.status(200).json(blog);
};

// ~ delete a specific blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Invalid ID");
  }

  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    return res.status(404).send("No blog with that id");
  }

  return res.status(200).json({ message: "the blog has been deleted" });
};

module.exports = {
  getBlogs,
  getSpecificBlog,
  getSpecificUserBlog,
  postNewBlog,
  updateBlog,
  deleteBlog,
};
