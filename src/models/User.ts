import sequelize from "../config/database";
import { Sequelize, DataTypes } from "sequelize";
import Post from "./Post";

const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Generate a UUID automatically (UUIDV4 is common)
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Please enter a correct email" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
User.hasMany(Post);
export default User;
