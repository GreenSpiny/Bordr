var request = module.exports =  
  function () { 
    // ROUTING

    //mod.http.createServer(function(req, res) {
     // res.writeHead(200, {
      //  'Content-Type': 'text/html'
     // });

     // res.write()

    app.get("/", function(req, res) {
      var extension = req.originalUrl;
      console.log(extension);
      if (extension == '' || extension == '/')
        res.render(mod.path.join(loc.root, 'testing/index.html'));
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
        console.log(record);
      });
    });


    app.listen(3000, function() {});
  }