
//package.json entry point: 'esServer.js'
//npm install express bodyParser elasticsearch --save

//client requests must be made to https://url:3000, unless reroute :443 to :3000 on server

var express = require('express');
var bodyParser = require('body-parser');
var es = require('elasticsearch');

var client = new es.Client({
  host: "https://elastic-gate.hc.local:443",
  log: 'trace'
});

var server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.get('/health', function (req, res) {

  client.cluster.health({}, function (response) {
    res.status(200).json(response);
  });
});

server.get('/all_index', function (req, res) {

  client.cat.indices({
    format: "json",
  }).then(function (response) {

    res.status(200).json(response)
  });
});

server.listen(3000);
