import { DataTypes } from "sequelize";
import sequelize from "../config/database";

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
