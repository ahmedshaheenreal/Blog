import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const Post = sequelize.define(
  "post",
  {
    post_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Post;
