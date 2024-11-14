import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database";

const Category = sequelize.define(
  "category",
  {
    category_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Category;
