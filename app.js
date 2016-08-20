var express = require('express');
var config = require('./config/config');
var app = express();
var port = process.env.PORT || 5000;
var VALIDATION_TOKEN = config.VALIDATION_TOKEN;

app.get('/ping', function(req, res){
   res.send('Hello world'); 
});
console.log(config);

app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});

app.listen(process.env.PORT, function(){
    console.log(`Server is running on port ${port}`);
})