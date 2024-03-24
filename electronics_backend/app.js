var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter=require('./routes/category')
var brandRouter=require('./routes/brands')
var productRouter=require('./routes/products')
var app = express();


//swagger import
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express')

//swagger option
const option ={
  definition:{
    openapi:'3.0.0',
    info:{
      title:'Node JS API Project for mongodb',
      version:'1.0.0'
    },
    servers:[
      {
        url:'http://localhost:5000/' // same as server port
      }
    ]
  },
  apis:['./routes/index.js','./routes/brands.js','./routes/category.js','./routes/category.js']//
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category',categoryRouter);
app.use('/brands',brandRouter);
app.use('/products',productRouter);

//swagger routes
const swaggerSpec = swaggerJSDoc(option)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
