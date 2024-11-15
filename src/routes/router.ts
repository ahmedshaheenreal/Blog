import express from "express";
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  authUser,
  deleteUser,
} from "../controllers/userControllers";
import {
  deletePost,
  createPost,
  getOnePost,
  updatePost,
  getAllPost,
  authPost,
  authCreatePost_Comment,
} from "../controllers/postControllers";
import { authCreateCategory } from "../controllers/categoryController";
import {
  addCategory,
  getAllCategories,
} from "../controllers/categoryController";
import { loginController } from "../controllers/loginController";

import { addComment, getAllComments } from "../controllers/commentControllers";
import verifyToken from "../utils/verifyToken";
const router = express.Router();

//user routes.----------------------
router.post("/login", loginController);
router.get("/users", verifyToken, getAllUsers);
router.get("/users/:id", authUser, getOneUser);
router.post("/users", createUser);
router.put("/users/:id", authUser, updateUser);
router.delete("/users/:id", authUser, deleteUser);
//posts routes.----------------------
router.get("/posts", getAllPost);

router.post("/posts", authCreatePost_Comment, createPost);

router.get("/posts/:id", authPost, getOnePost);

router.delete("/posts/:id", authPost, deletePost);

router.put("/posts/:id", authPost, updatePost);
//  categories routes-----

router.post("/posts/:postId/category", authCreateCategory, addCategory);
router.get("/posts/:postId/category", verifyToken, getAllCategories);

// comments routesd------
router.post("/posts/:postId/comments", authCreatePost_Comment, addComment);
router.get("/posts/:postId/comments", verifyToken, getAllComments);

//----
export default router;

// /api/posts
// GET: Get all posts with associated users, categories, and comments
// GET /
// : Get post by ID with associated users, categories, and comments
// PUT /
// : Update post by ID
// DELETE /
// : Delete post by ID
// Post Categories:
// POST /
// /categories: Create a new category for a post
// GET /
// /categories: Get categories for a specific post
// Post Comments:
// POST /
// /comments: Create a new comment for a post
// GET /
// /comments: Get comments for a specific post
