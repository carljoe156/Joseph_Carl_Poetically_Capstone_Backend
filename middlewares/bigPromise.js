// Our Middleware to handle asynchronous route handlers and catch errors
module.exports = (func) => (req, res, next) =>
  // Executes an async function and catch any unhandled errors
  Promise.resolve(func(req, res, next)) // Calls will be passed to the function (async route handler)
    .catch(next); // If an error occurs, it will be passed to the next middleware (error handler)

// Alternate solution to handle async-await without using try-catch blocks
