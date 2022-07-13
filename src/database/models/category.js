const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    tableName: "Categories",
    timestamps: false
  }
  );

  return Category;
};

module.exports = Category;