import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 20 * 60 * 1000, //ms
  max: 100,
});