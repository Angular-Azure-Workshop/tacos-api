const Recipe = require('./recipe.model');
const ReadPreference = require('mongodb').ReadPreference;
require('./mongo').connect();

function getRecipes() {
  var countQuery = Recipe.count();
  const docQuery = Recipe.find({}).read(ReadPreference.NEAREST);
  return new Promise((resolve, reject) => {
    docQuery
      .exec()
      .then(recipes => {
        if (recipes.length === 0)
          resolve('There are no results matching your query.');
        else {
          countQuery.exec().then(count => {
            resolve({ items: recipes, totalItems: count });
          });
        }
      })
      .catch(err => {
        reject(err.status);
      });
  });
}

module.exports = {
  getRecipes
};
