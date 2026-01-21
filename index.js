const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

/* -------------------------
   Built-in Middleware
-------------------------- */
app.use(express.json()); // Parse JSON bodies

/* -------------------------
   Third-party Middleware
-------------------------- */
app.use(cookieParser()); // Parse cookies

/* -------------------------
   Router-level Middleware
-------------------------- */
const adminRouter = express.Router();

// Simple logger middleware
const logger = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.ip}`
  );
  next();
};

adminRouter.use(logger);

// Configurable middleware
const loggerWrapper = (options) => {
  return (req, res, next) => {
    if (options.log) {
      console.log('Logging enabled for admin routes');
      next();
    } else {
    //   next(new Error('Logging is disabled'));
        throw new Error('Logging is disabled');
    }
  };
};

adminRouter.use(loggerWrapper({ log: true }));

/* -------------------------
   Admin Routes
-------------------------- */
adminRouter.get('/dashboard', (req, res) => {
  res.send('Admin Dashboard');
});

app.use('/admin', adminRouter);

/* -------------------------
   Application-level Middleware
-------------------------- */
const appLogger = (req, res, next) => {
  console.log(`APP → ${req.method} ${req.url}`);
  next();
};

app.use(appLogger);

/* -------------------------
   Routes
-------------------------- */
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

/* -------------------------
   Error-handling Middleware
   (MUST be last)
-------------------------- */
const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({
    success: false,
    message: err.message,
  });
};

app.use(errorHandler);

/* -------------------------
   Server
-------------------------- */
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
