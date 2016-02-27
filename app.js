var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var net = require('net');

var index = require('./routes/index');
var partials = require('./routes/partials');
var areas = require('./routes/areas');
var devices = require('./routes/devices');
var pins = require('./routes/pins');
var dashboard = require('./routes/dashboard');

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
app.use('/api/areas', areas);
app.use('/api/devices', devices);
app.use('/api/pins', pins);
app.use('/api/dashboard', dashboard);

app.all('/*', function(req, res) {
  res.render('index');
});

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

mongoose.connect('mongodb://lhuser:Lhus3r$@93.188.161.195/linkhousedb');

var Pin = require('./models/pin');

app.ioconf = function(io){
  io.on('connection', function(socket){
    console.log('user connected');

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('status', function(msg){
      console.log('status: ' + JSON.stringify(msg));
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
  		  console.log('client close');
  	  });

  	  client.on('error', function(err){
  	    console.log('client error with ' + err);
        socket.emit('res', {success: false, id: msg.id, data: '', message: JSON.stringify(err)});
  	  });

  	  client.connect(8082, 'andxor-01.noip.me', function(){
  		  client.write(msg.data + '\r');
  	  });
    });

    socket.on('change', function(msg){
      console.log('change: ' + JSON.stringify(msg));

      Pin.findById(msg.data._id).populate('device').exec(function(err, pin){
        if(err){
          socket.emit('res', {success: false, id: msg.id, data: '', message: JSON.stringify(err)});
          return;
        }

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
          console.log('client close');
        });

        client.on('error', function(err){
          console.log('client error with ' + err);
          socket.emit('res', {success: false, id: msg.id, data: '', message: JSON.stringify(err)});
        });

        client.connect(pin.device.public_port, pin.device.public_ip, function(){
          client.write('$' + (msg.data.state ? 1 : 0) + '#####\r');
        });
      });      
    });

    socket.on('save', function(msg){
      console.log('socket save with ' + msg);      
      var url = new Settings({'url': msg.url});
      url.save(function(err){
        if(err){
          console.log('erro ' + err);
        }

        Settings.find(function(err, settings){
          socket.emit('res', {id: msg.id, message: settings});
        });        
      });
    });
  });
}

module.exports = app;
