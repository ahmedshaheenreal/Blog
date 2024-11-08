import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../config/database";
import Post from "./Post";

const Comment = sequelize.define(
  "comment",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Comment;
