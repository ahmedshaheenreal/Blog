import express from "express";
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} from "../controllers/userControllers";
const router = express.Router();

//user routes.----------------------
router.get("/users", getAllUsers);

router.get("/users/:id", getOneUser);
router.post("/users", createUser);
router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);
//posts routes.----------------------
router.get("/posts", (req, res) => {
  console.log("this is users route");
});

router.post("/posts", (req, res) => {
  console.log("this is users route");
});
router.get("/posts/:id", (req, res) => {
  console.log("this is users route");
});

router.delete("/posts/:id", (req, res) => {
  console.log("this is users route");
});

router.put("/posts/:id", (req, res) => {
  console.log("this is users route");
});
//  categories routes-----

router.post("/posts/:postId/category", () => {});
router.get("/posts/:postId/category", () => {});

// comments routesd------
router.post("/posts/:postId/comments", () => {});
router.get("/posts/:postId/comments", () => {});

//----
export default router;

// /api/posts
// POST: Create a new post
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
