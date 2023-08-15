const { param } = require('express-validator');

const validateIdParam = (paramName) => (req, res, next) => {  
  if (!Number.isInteger(Number(req.params[paramName]))) {
    return res.status(400).json({ message: 'Invalid parameter' });
  }

  next();
};

module.exports = validateIdParam;
