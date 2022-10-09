const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404).json({ message: `Not found - ${req.originalUrl}` });
  next(error);
};
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.json({ message: "An Internal Error Occured ! Try Again!", stack: err.stack }).status(statusCode);
  next();
};

module.exports = { notFound, errorHandler };
