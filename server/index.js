const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const db = require('./db');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db });
const PORT = process.env.PORT || 8080;
const app = express();

module.exports = app;

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // compression middleware
  app.use(compression());

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // auth and api routes
  //app.use('/auth', require('./auth'))
  app.use('/api', require('./api'));

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  );
};

<<<<<<< HEAD
const syncDb = () => db.sync({ force: true });
=======
const syncDb = () => db.sync({force: false})
>>>>>>> e9dae8d034fee314ed7b0055ffeb4f02449e6c2b

async function bootApp() {
  try {
    sessionStore.sync();
    await syncDb();
    await createApp();
    await startListening();
  } catch (err) {
    console.error(err);
  }
}

bootApp();
