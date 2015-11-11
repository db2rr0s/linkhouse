var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/linkhousedb');
var net = require('net');

var index = require('./routes/index');
var partials = require('./routes/partials');
var rest = require('./routes/rest');
var users = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/partials', partials);
app.use('/rest', rest);
app.use('/users', users);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.ioconf = function(io){
  io.on('connection', function(socket){
    console.log('user connected');

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('req', function(msg){
      console.log('req with msg ' + JSON.stringify(msg));
      var client = new net.Socket();
	  client.on('data', function(data){
		  //TODO: tratar retorno
		  var ret = data.toString();
		  console.log(ret);
		  client.destroy();
		  socket.emit('res', {success: true, id: msg.id, data: ret, message: 'Comando executado!'});
	  });
	  client.on('close', function(){
		  //TODO: ver
		  console.log('bufu');
	  });
	  client.on('error', function(err){
	      console.log('BUFU');console.log(err);
          socket.emit('res', {success: false, id: msg.id, data: '', message: JSON.stringify(err)});
	  });
	  client.connect(8082, 'andxor-01.noip.me', function(){
		  client.write(msg.data + '\r');
	  });
	  return;
      if(msg.data === '&'){
        // TODO: teste de comunicação
        socket.emit('res', {success: true, id: msg.id, data: msg.data, message: 'Comando executado!'});
      } else if(msg.data === '*'){
        // TODO: recupera status
        socket.emit('res', {success: true, id: msg.id, data: '*10##', message: 'Comando executado!'});
      } else if(msg.data[0] === '$'){
        // TODO: comandos
        socket.emit('res', {success: true, id: msg.id, data: msg.data, message: 'Comando executado!'});
      } else {
        socket.emit('res', {success: false, id: msg.id, data: msg.data, message: 'Comando inválido!'});
        return;
      }      
    });
  });
}

module.exports = app;
