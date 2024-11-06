import sequelize from "../config/database";
import { Sequelize, DataTypes } from "sequelize";

const User = sequelize.define("user", {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Generate a UUID automatically (UUIDV4 is common)
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: { msg: "Please enter a correct email" },
    },
  },
});
