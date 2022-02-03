const Categories = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categories', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Categories',
    underscored: true,
  });

  return Categorie;
};

module.exports = Categories;
