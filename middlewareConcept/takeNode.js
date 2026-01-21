/**
 * ==================================================
 * Express.js Middleware (Professional Structure)
 * ==================================================
 * Demonstrates:
 * - Built-in middleware
 * - Third-party middleware
 * - Router-level middleware
 * - Configurable middleware
 * - Application-level middleware
 */

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

/**
 * ==================================================
 * Global Middleware
 * ==================================================
 */

// Built-in middleware → parses JSON request bodies
app.use(express.json());

// Third-party middleware → parses cookies
app.use(cookieParser());

/**
 * ==================================================
 * Admin Router (Router-level Middleware)
 * ==================================================
 */

const adminRouter = express.Router();

/**
 * Simple Router-level Logger
 */
const adminLogger = (req, res, next) => {
    console.log(
        `[ADMIN] ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`
    );
    next(); // MUST call next()
};

adminRouter.use(adminLogger);

/**
 * ==================================================
 * Configurable Middleware (Middleware Factory)
 * ==================================================
 * Used when middleware behavior depends on options
 */

const loggerWrapper = (options = { log: true }) => {
    return (req, res, next) => {
        if (options.log) {
            console.log(
                `[CONFIG] ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`
            );
            next();
        } else {
            // Forward error to error-handling middleware
            next(new Error('Logging is disabled'));
        }
    };
};

// Apply configurable middleware to admin routes
adminRouter.use(loggerWrapper({ log: false }));

/**
 * ==================================================
 * Admin Routes
 * ==================================================
 */
adminRouter.get('/dashboard', (req, res) => {
    res.status(200).send('Admin Dashboard');
});

// Mount admin router
app.use('/admin', adminRouter);

/**
 * ==================================================
 * Application-level Middleware
 * ==================================================
 */

const globalLogger = (req, res, next) => {
    console.log(
        `[GLOBAL] ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`
    );
    next();
};

app.use(globalLogger);

/**
 * ==================================================
 * Public Routes
 * ==================================================
 */
app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
});

/**
 * ==================================================
 * Error-handling Middleware (REQUIRED)
 * ==================================================
 * Must have 4 parameters
 */

app.use((err, req, res, next) => {
    console.error('[ERROR]', err.message);

    res.status(500).json({
        success: false,
        message: err.message
    });
});

/**
 * ==================================================
 * Server Startup
 * ==================================================
 */
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
