import express from "express";
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} from "../controllers/userControllers";
import {
  deletePost,
  createPost,
  getOnePost,
  updatePost,
  getAllPost,
} from "../controllers/postControllers";

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
router.get("/users/:id", getOneUser);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
//posts routes.----------------------
router.get("/posts", getAllPost);

router.post("/posts", createPost);

router.get("/posts/:id", getOnePost);

router.delete("/posts/:id", deletePost);

router.put("/posts/:id", updatePost);
//  categories routes-----

router.post("/posts/:postId/category", addCategory);
router.get("/posts/:postId/category", getAllCategories);

// comments routesd------
router.post("/posts/:postId/comments", addComment);
router.get("/posts/:postId/comments", getAllComments);

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
