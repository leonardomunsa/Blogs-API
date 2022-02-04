module.exports = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define(
    'PostCategories', {}, { timestamps: false },
  );

  PostCategorie.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categories',
      through: PostCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'blogposts',
      through: PostCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategorie;
};
