import express from "express";

const router = express.Router();

//user routes.----------------------
router.get("/users", (req, res) => {
  console.log("this is users route");
});

router.get("/users/:id", (req, res) => {
  console.log("this is users route");
});
router.post("/users", (req, res) => {
  console.log("this is users route");
});
router.put("/users/:id", (req, res) => {
  console.log("this is users route");
});

router.delete("/users/:id", (req, res) => {
  console.log("this is users route");
});
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
//  categories rotes

router.post("/posts/:postId/category", () => {});
router.get("/posts/:postId/category", () => {});

// comments routesd
router.post("/posts/:postId/comments", () => {});
router.get("/posts/:postId/comments", () => {});

//----
export default router;

// /api/users
// POST: Create a new user
// GET: Get all users
// GET /
// : Get user by ID
// PUT /
// : Update user by ID
// DELETE /
// : Delete user by ID
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
