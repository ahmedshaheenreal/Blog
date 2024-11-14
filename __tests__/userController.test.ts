import express, { Request, Response, NextFunction } from "express";
import { getOneUser } from "../src/controllers/userControllers";
import User from "../src/models/User";
import app from "../src/index";
import { server } from "../src/index";
import router from "../src/routes/router";

app.use(express.json());
app.use("/api", router);

jest.mock("../src/models/User", () => ({
  findOne: jest.fn(),
  hasMany: jest.fn(),
}));

jest.mock("../src/models/Post", () => ({
  findOne: jest.fn(),
  hasMany: jest.fn(),
  belongsTo: jest.fn(),
  belongsToMany: jest.fn(),
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
  const mockUsers: any[] = [
    {
      id: 1,
      username: "testuserrrrrrrrrrrrrrrrr",
      email: "test@example.com",
      password: "testpassword123",
    },
    {
      id: 2,
      username: "test",
      email: "test@examplee.com",
      password: "testpassword0000",
    },
  ];
  it("should return the user with status 200 if the user is found", async () => {
    const mockUser = {
      user_id: "123",
      username: "JohnDoe",
      email: "johndoe@testing.net",
      password: "12345678test",
    };
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
  afterAll(() => {
    server.close(); // Close the server after the tests have finished
  });
});
