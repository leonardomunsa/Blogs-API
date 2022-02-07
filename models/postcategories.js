module.exports = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define(
    'PostCategories', {}, { timestamps: false },
  );

  PostCategorie.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categorie.belongsToMany(models.BlogPosts, {
      as: 'blogposts',
      through: PostCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategorie;
};
