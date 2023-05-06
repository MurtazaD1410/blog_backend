const express = require("express");
const {
  getBlogs,
  getSpecificBlog,
  postNewBlog,
  updateBlog,
  deleteBlog,
  getSpecificUserBlog,
 
} = require("../controller/blogController");
const routes = express.Router();
// const upload = require("../middleware/upload");
const requireAuth = require("../middleware/requireAuth");

// | GET all blogs
routes.get("/", getBlogs);

// | GET a specific blog
routes.get("/:id", getSpecificBlog);

// | GET a specific user blog
routes.get("/user/:id", getSpecificUserBlog);

// | POST a new blog
routes.post("/", requireAuth, postNewBlog);

// | PUT an existing blog
routes.put("/:id", requireAuth, updateBlog);

// | DELETE a specific blog
routes.delete("/:id", requireAuth, deleteBlog);

module.exports = routes;
