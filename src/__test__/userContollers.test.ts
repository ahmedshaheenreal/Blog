import express, { Request, Response, NextFunction } from "express";
import { getOneUser } from "../controllers/userControllers";
import User from "../models/User";
import app from "../index";
import router from "../routes/router";
import { server } from "../index";

app.use(express.json());
app.use("/api", router); // Use your image routes
// Mocking User model and methods for isolated testing
jest.mock("../models/User", () => ({
  findOne: jest.fn(),
}));

describe("User Controller - getOneUser", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      params: { id: "123" },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;

    next = jest.fn();
  });

  it("should return the user with status 200 if the user is found", async () => {
    const mockUser = { user_id: "123", name: "John Doe" };
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);

    await getOneUser(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it("should return a 400 error if the user is not found", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await getOneUser(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "user name not found, please provide a correct id",
    });
  });

  it("should call next with an error if an exception is thrown", async () => {
    const error = new Error("Database error");
    (User.findOne as jest.Mock).mockRejectedValue(error);

    await getOneUser(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

afterAll(() => {
  server.close(); // Close the server after the tests have finished
});
