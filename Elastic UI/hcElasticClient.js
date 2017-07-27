//hcElasticClient.js

//var es = require(['./elasticsearch-js/elasticsearch.jquery.js'])

//var client = new $.es.Client({
  //hosts: 'http://elastic-gate.hc.local:80'
//});

var esClient = new elasticsearch.Client({
  host: 'http://elastic-gate.hc.local:80',
  log: 'trace'
});
