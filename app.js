var express = require('express');
var bodyParser = require('body-parser');
var Connectorlist = require('./shared/definition/definition');
var MarkSentence = require('./buildAlg/markSentence');
var StatementBuilder = require('./buildAlg/statementBuilder');
 
var app = express();
var port = process.env.PORT || 1337;

var con = new Connectorlist();

var markSen = new MarkSentence();
var stateBuilder = new StatementBuilder();
var sentence = "i want cake with sugar,pepper, water, butter and without lemon juice and does not contain milk";

markSen.markSentence(sentence);

for (var i=0; i<markSen.ingredientIndexList.length; i++){
    console.log( markSen.ingredientIndexList[i].index + " and length : " + markSen.ingredientIndexList[i].length);
}

var splitedSentence = markSen.splitSentence(sentence);
var nitz_res = stateBuilder.createStatement(splitedSentence, markSen);

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
 
// test route
app.post('/', function (req, res) { 
  console.log("nitz: %j", nitz_res);
  res.status(200).send("hello\n"); 
});
 
app.listen(port, function () {
  console.log('Listening on port ' + port);
});

app.post('/hello', function (req, res, next) {
  var userName = req.body.user_name;
  var botPayload = {
    text : 'Hello ' + userName + ', welcome to Devdactic Slack channel! I\'ll be your guide.'
  };
  // Loop otherwise..
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});
