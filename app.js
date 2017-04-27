 var express = require('express');
 
var user = require('./routes/user');
var http = require('http');
var path = require('path');
 
var app = express();
 
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());//necesario para utilizar sesiones
app.use(express.bodyParser());
app.use(express.session({secret : "contraseña",cookie: {maxAge: 600000}}));//necesario para utilizar sesiones
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router); 
 
 
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
 
require('./routes')(app);
 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
module.exports = app;