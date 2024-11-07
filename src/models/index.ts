import User from "./User";
import Post from "./Post";
import Category from "./Category";
import Comment from "./Comment";
import sequelize from "../config/database";
// import CategoryPost from "./CategoryPost";

//Post category relationship, this would automatically create a join table

Category.belongsToMany(Post, {
  through: "CategoryPost",
  foreignKey: "categoryId",
});
Post.belongsToMany(Category, {
  through: "CategoryPost",
  foreignKey: "postId",
});

//user post relation

User.hasMany(Post);
Post.belongsTo(User);

//user-comment relation
User.hasMany(Comment);
Comment.belongsTo(User);

//post-comment relation
Post.hasMany(Comment);
Comment.belongsTo(Post);

sequelize.sync();
