import express, { Request, Response, NextFunction } from "express";
import { createPost } from "../controllers/postControllers";
import Post from "../models/Post";
import User from "../models/User";
import app from "../index";
import router from "../routes/router";
import { server } from "../index";
import sequelize from "../config/database";

app.use(express.json());
app.use("/api", router); // Use your image routes
// Mocking User model and methods for isolated testing
jest.mock("../models/User", () => ({
  findOne: jest.fn(),
}));
jest.mock("../models/Post", () => ({
  create: jest.fn(), // Mock 'create' directly here
}));
describe("Post Controller - createPost", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeAll(async () => {
    // Sync the database with the models before tests
    sequelize.sync(); // Use `force: true` to drop tables and recreate them
  });

  beforeEach(() => {
    req = {
      body: {
        userUserId: "b21c85f0-98fe-4c63-be61-f4e0722dc7b9",
        title: "My First Post",
        content: "This is the content of my first post.",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;

    next = jest.fn();
  });

  it("should return the user with status 201 if the post is created successfully", async () => {
    const mockPost = {
      userUserId: "b21c85f0-98fe-4c63-be61-f4e0722dc7b9",
      title: "My First Post",
      content: "This is the content of my first post.",
    };
    (Post.create as jest.Mock).mockResolvedValue(mockPost);

    await createPost(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "post created successfully!",
      body: mockPost,
    });
  });

  it("should return status 400 if the post is not created (No User)", async () => {
    // Mocking User.findOne to return null (i.e., no user found)
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await createPost(req as Request, res as Response, next);

    // Expecting a 400 status code
    expect(res.status).toHaveBeenCalledWith(400);
    // Expecting the success flag to be  *false* and an appropriate message
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "No user with this id found",
    });
  });

  afterAll(() => {
    server.close(); // Close the server after the tests have finished
  });
});
