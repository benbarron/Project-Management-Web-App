const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const https = require('https');
const edge = require('express-edge');
const fs = require('fs');

// init express application
const app = express();

// read in env.json and set it to global object
global.envVars = JSON.parse(fs.readFileSync('./Config/env.json', 'utf8'));

// global functions ---------------------------------------------
global.env = (name, alternative) => {
  if (envVars[name]) {
    return envVars[name];
  }

  return alternative;
};

// load models ---------------------------------------------
const models = fs.readdirSync('./App/Models');
global.model = {};

for (let i = 0; i < models.length; i++) {
  let name = models[i].split('.')[0];
  let m = require(`./App/Models/${name}`);
  global.model[name] = m;
}

// load middleware ---------------------------------------------
const mware = fs.readdirSync('./App/Middleware');
global.middleware = {};

for (var i = 0; i < mware.length; i++) {
  let name = mware[i].split('.')[0];
  global.middleware[name] = require(`./App/Middleware/${name}`);
}

// load controllers ---------------------------------------------
const controllers = fs.readdirSync('./App/Controllers');

for (let i = 0; i < controllers.length; i++) {
  let name = controllers[i].split('.')[0];
  let controller = require(`./App/Controllers/${name}`);
  global[name] = new controller();
}

// connect database ------------------------------------------------
const db = env('mongoLocalUri', '');

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// set view engine, storage/assets, and load routes -----------------
app.set('views', path.join(__dirname, '/Resources/Views'));
app.use(edge);

app.use(express.json());

app.use('/storage', express.static('./Storage'));
app.use('/assets', express.static('./Public'));

app.use('/api', require('./Routes/Api'));
app.use(require('./Routes/Web'));

// run application -------------------------------------------------------
if (env('mode', '') == 'PRODUCTION') {
  http
    .createServer(app)
    .listen(80, () => console.log(`Server started on port ${80}`));

  const options = {
    key: fs.readFileSync('./../keys/key.pem', 'utf8'),
    cert: fs.readFileSync('./../keys/cert.pem', 'utf8')
  };

  https
    .createServer(options, app)
    .listen(443, () => console.log(`Server started on port ${443}`));
} else {
  app.listen(env('devPort'), () =>
    console.log(`Server started on port ${env('devPort')}`)
  );
}
