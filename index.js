const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth-strategy');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const Logger = require('morgan');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const env = require('./config/environment');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

if (env.name == 'development') {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.asset_path, '/scss'),
      dest: path.join(__dirname, env.asset_path, '/css'),
      debug: true,
      outputStyle: 'expanded',
      prefix: '/css',
    })
  );
}

app.use(
  session({
    name: 'codeial',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: 'disabled',
      },
      function (err) {
        console.log(err || 'connect-mongodb ok');
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookieParser());

//use express router
app.use('/', require('./routes'));
app.use(express.static(env.asset_path));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(Logger(env.morgan.mode, env.morgan.options));

app.listen(port, function (err) {
  if (err) {
    console.log('error', err);
    return;
  }
  console.log(`Server up and running on ${port}`);
});
