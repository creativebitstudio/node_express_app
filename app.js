// in the following we are declaring and requiring all necessary node modules
const http = require('http')
const express = require('express'); // used to create an express application
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const index = require('./routes/index');

// calling the express function declared previously 
const app = express();

// an application property that assigns a name (port) and a return value 
//(the return value is whatever is in the enviornment port, if known, then return port 3000) 
app.set('port', process.env.PORT || 3000)

// sets the name and value of the template engine
// in this case we are indicating which path to follow on the root folder, and that it is a PUG view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// used to show a favicon of choice on the tab bar
app.use(favicon(path.join(__dirname, 'public', 'node.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Mounts the specified middleware function or functions at the specified path: 
//the middleware function is executed when the base of the requested path matches path.
// Simply put it tells the program where to find the index file from the root folder
app.use('/', index);


// catch 404 and forward to error handler, upgraded to ES6 standards
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// Will also display an error page, which can be customized by adding some simple hmtl and css
// under the views (error.pug) and public (style.css) folder
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// to access the server through available port
const server = http.createServer(app)
server.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
})

// a module that will export the app
module.exports = app;