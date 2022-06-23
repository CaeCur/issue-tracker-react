// Overwrite generic express error handler
const errorHandler = (err, req, res, next) => {
  // fetch the status code from the response, otherwise default to 500
  const statusCode = res.statusCode ? res.statusCode : 500;

  // set error the status code
  res.status(statusCode);

  // respond with error message and details
  res.json({
    errorMessage: "OH NO! there was an error: " + err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

module.exports = { errorHandler };
