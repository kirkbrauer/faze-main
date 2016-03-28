module.exports = function(app) {
  //Router Code Goes Here
  app.get('/api/test', function(req, res) {
    res.json({test: "test"});
  });
};
