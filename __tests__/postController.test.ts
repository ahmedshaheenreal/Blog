import app from "../src/index";

import { server } from "../src/index";

const express = require("express");
const { createPost } = require("../src/controllers/postControllers");
type Request = import("express").Request;
type Response = import("express").Response;
type NextFunction = import("express").NextFunction;
const { Post, User } = require("../src/models");

app.use(express.json());
jest.mock("../src/models/User", () => ({
  findOne: jest.fn(),
  hasMany: jest.fn(),
}));

jest.mock("../src/models/Post", () => ({
  findOne: jest.fn(),
  hasMany: jest.fn(),
  belongsTo: jest.fn(),
  belongsToMany: jest.fn(),
  create: jest.fn(),
}));
jest.mock("../src/models/Category", () => ({
  findOne: jest.fn(),
  hasMany: jest.fn(),
  belongsTo: jest.fn(),
  belongsToMany: jest.fn(),
}));

jest.mock("../src/models/Comment", () => ({
  findOne: jest.fn(),
  hasMany: jest.fn(),
  belongsTo: jest.fn(),
}));
describe("Post Controller - createPost", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

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
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await createPost(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "No user with this id found",
    });
  });

  afterAll(() => {
    server.close(); // Close the server after the tests have finished
  });
});
