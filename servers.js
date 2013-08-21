exports.findAll = function(req, res) {
  db.collection("servers", function(err, collection) {
    if (!err) {
      collection.find().toArray(function(err, items) {
        if (!err) {
          var json = { servers: items };
          res.send(json);
        }
      });
    }
  });
};


exports.findByID = function(req, res) {
  var serverID = req.params.server_id;
  db.collection("servers", function(err, collection) {
    if (!err) {
      collection.findOne({_id: new ObjectID(serverID)}, function(err, item) {
        if (!err) {
          var json = {server: item};
          res.send(json);
        }
      });
    }
  });
};


exports.insert = function(req, res) {
  var server = req.body.server;
  db.collection("servers", function(err, collection) {
    if (!err) {
      collection.insert(server, {safe:true}, function(err, result) {
        if (!err) {
          var json = {server: result[0]};
          res.send(json);
        }
      });
    }
  });
};


exports.update = function(req, res) {
  var serverID = req.params.server_id;
  var server = req.body.server;
  db.collection("servers", function(err, collection) {
    if (err) {
      console.log(err);      
    } else {
      collection.update({_id: new ObjectID(serverID)}, server, {safe:true}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          server._id = serverID;
          var json = {server: server};
          res.send(json);
        }
      });
    }
  });
}


exports.delete = function(req, res) {
  var serverID = req.params.server_id;
  db.collection("servers", function(err, collection) {
    if (err) {
      console.log(err);      
    } else {
      collection.remove({_id: new ObjectID(serverID)}, {safe:true}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send();
        }
      });
    }
  });
}