global.mod = {
  express   : require('express'),
  path      : require('path'),
  bodyParser: require('body-parser'),
  mongo     : require('mongodb'),
  http      : require('http')
}

global.loc = {
  root      : mod.path.dirname(require.main.filename),
  backend   : mod.path.join(mod.path.dirname(require.main.filename), 'Components/Backend'),
  pages     : mod.path.join(mod.path.dirname(require.main.filename), 'Components/Pages'),
  resources : mod.path.join(mod.path.dirname(require.main.filename), 'Components/Resources')
}

global.app = mod.express();
app.use(mod.bodyParser.urlencoded({extended: true}));

// Configure View Folder
var cons = require('consolidate');
app.engine('html', cons.swig);
app.set('views', loc.pages);
app.set('view engine', 'html');

// Configure Public (Static) Folder
app.use(mod.express.static(loc.resources));
console.log(loc.resources);

// Configure Database Client
global.client = mod.mongo.MongoClient;
global.mongo = {
  url      : 'mongodb://localhost:27017/bordr'
}

// DATABASE INITIALIZATION

client.connect(mongo.url, function(err, db) {
  mongo.db = db;
  db.createCollection('users', function(collection_err, collection) {
    collection.createIndex({username: 1}, {unique: true}); 
  });

  require(mod.path.join(loc.backend, 'request.js'))();
});
