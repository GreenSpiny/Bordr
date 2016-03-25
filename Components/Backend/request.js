var request = module.exports =  
  function () { 
    // ROUTING

    app.get("/", function(req, res) {
      var extension = req.originalUrl;
      if (extension == '' || extension == '/')
        res.render(mod.path.join(loc.root, 'Components/Pages'));
        //res.sendFile(mod.path.join(loc.pages, 'index.html'));
      //else
        //res.sendFile(mod.path.join(loc.pages, req.originalUrl + '.html'));
    });

    // POST REQUESTS
    app.post('/signup', function(req, res) {
      var user = req.body;
      collection = mongo.db.collection('users');    
      collection.insert(user, {w:1}, function(err, result) { 
        if (err != null)
          res.send("System Error: " + err);
        else
          res.send("User created successfully");
      });
    });

    app.post('/login', function(req, res) {
      var user = req.body;
      collection = mongo.db.collection('users');
      collection.findOne({username: user.username, password: user.password}, function(err, record) {
        if (err != null)
          res.send("System Error: " + err);
        else if (record == null)
          res.send("Credentials Invalid");
        else
          res.send("User Found: " + record);
      });
    });


    app.listen(3000, function() {});
  }