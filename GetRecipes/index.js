const recipes = require('../shared/recipe.service');
module.exports = async function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  await recipes
    .getRecipes()
    .then(data => {
      context.res = {
        body: data
      };
    })
    .catch(err => {
      context.res = {
        status: 500,
        body: err
      };
    });
};
