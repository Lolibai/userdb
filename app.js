var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 8081;
var { database } = require('./config');
var userRouter = require('./routes/user.routes');
var expressSwagger = require('express-swagger-generator')(app);
var swaggerUi = require('express-swaggerize-ui');

mongoose.connect(
  database,
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/api', userRouter);

let options = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample server',
      title: 'Swagger',
      version: '1.0.0'
    },
    host: 'localhost:8081',
    basePath: '/api',
    produces: ['application/json', 'application/xml'],
    schemes: ['http']
  },
  basedir: __dirname, //app absolute path
  files: ['./routes/*.js'] //Path to the API handle folder
};
expressSwagger(options);

app.use('/api-docs.json', function(req, res) {
  res.json(require('./path/to/swaggerize/docs.json'));
});
app.use('/api-docs', swaggerUi());

app.listen(port, function() {
  console.log(`Server is listenings ${port} port`);
});
