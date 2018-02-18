export const catchErrors = (fn) => {
  console.log(fn.name);
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

export const notFound = (req, res, next) => {
  const error = new Error('Not found');
  error['status'] = 404;

  next(error);
};

export const devErrors = (error, req, res, next) => {
  error.stack = error.stack || '';
  const errorDetails = {
    message: error.message,
    status: error.status,
    stack: error.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  };
  res.status(error.status || 500);
  res.json({ errorDetails }); // Ajax call, send JSON back
  res.end();
};

export const prodErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.end({
    message: err.message,
    error: {}
  });
};

export default {
  catchErrors,
  notFound,
  devErrors,
  prodErrors
};
