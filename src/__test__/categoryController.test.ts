import request from "supertest";
import express from "express";
import app from "../index"; // Your Express app
import router from "../routes/router"; // Your routes file
import Post from "../models/Post";
import { server } from "../index";
import Category from "../models/Category";
app.use(express.json());
app.use("/api", router);

describe("GET /posts/:postId/category", () => {
  it("should return 200 and success: true when the post is found", async () => {
    // Mock data to simulate the post with categories
    const mockPost = Post.build({
      post_id: "2a4b8a8e-178d-4091-8587-bbd4773f4a0d",
      title: "Sample Post",
      content: "This is a post content",
      categories: [
        { category_id: "1", name: "Category 1" },
        { category_id: "2", name: "Category 2" },
      ],
    });

    // Mocking the Post model's findByPk method
    const findByPkMock = jest
      .spyOn(Post, "findByPk")
      .mockResolvedValue(mockPost);

    // Sending GET request
    const response = await request(app).get(
      "/api/posts/2a4b8a8e-178d-4091-8587-bbd4773f4a0d/category"
    );
    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);

    // Clean up mocks after test
    findByPkMock.mockRestore();
  });

  it("should return 404 and success: false if the post is not found", async () => {
    // Mocking the Post model's findByPk method to return null
    const findByPkMock = jest.spyOn(Post, "findByPk").mockResolvedValue(null);

    // Sending GET request with a wrong post ID
    const response = await request(app).get("/api/posts/wrong-id/category");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("success", false);

    // Clean up mocks after test
    findByPkMock.mockRestore();
  });
});
afterAll(() => {
  server.close(); // Close the server after the tests have finished
});
