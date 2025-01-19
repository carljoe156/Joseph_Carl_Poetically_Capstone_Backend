// CustomError class extends the built-in Error class to add a custom statusCode property.
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent class (Error) constructor with the error message
    this.statusCode = statusCode; // Set a custom statusCode property for the error
  }
}

module.exports = CustomError;
