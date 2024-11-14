import sequelize from "../config/database";
import { DataTypes } from "sequelize";
import User from "./User";
import Comment from "./Comment";
import Category from "./Category";
const Post = sequelize.define(
  "post",
  {
    post_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
Category.belongsToMany(Post, {
  through: "CategoryPost",
  foreignKey: "categoryId",
});
Post.belongsToMany(Category, {
  through: "CategoryPost",
  foreignKey: "postId",
});

export default Post;
