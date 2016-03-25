var database = function () {
  this.listen = function (app) {
    
   /* app.use(function(req, res) {
      var extension = req.originalUrl;
      if (extension == '' || extension == '/')
        res.sendFile(config.pages + '/index.html');
      else
        res.sendFile(config.pages + '/' + req.originalUrl + '.html');
    });
*/

    //app.listen(3000, function() {});
  }
  return this;
}
module.exports = database;