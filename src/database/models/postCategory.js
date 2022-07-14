const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define("PostCategory", {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
  }, {
    tableName: "PostCategories",
    timestamps: false,
  }
  );

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: "postId",
      as: "post",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      through: {
        model: models.PostCategory,
        unique: false,
        scope: {
          categoryId: "categoryId",
        },
      },
    });

    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: "categoryId",
      as: "category",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      through: {
        model: models.PostCategory,
        unique: false,
        scope: {
          postId: "postId",
        },
      },
    });
  }

  return PostCategory;
};

module.exports = PostCategory;