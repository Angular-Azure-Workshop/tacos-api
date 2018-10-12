const recipes = require('../shared/recipe.service');
const appInsights = require('applicationinsights');
appInsights.setup();
const context = appInsights.defaultClient.context;
context.tags[context.keys.cloudRole] = 'backend';
appInsights.start();
module.exports = async function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  const SIZE = 10;
  const sort = req.query.sort ? req.query.sort : 'title';
  const order = req.query.order ? req.query.order : 'asc';
  const page = req.query.page ? req.query.page : 1;
  await recipes
    .getRecipes(sort, order, page, SIZE)
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
