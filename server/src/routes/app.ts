import express from 'express';
import { UserService } from '../services/UserService';
import { authenticate } from '../middleware/auth';
import { body, validationResult } from 'express-validator';
import { responseHandler } from '../utils/response';


const router = express.Router();
const userService = new UserService();

router.post('/signup', [
  body('first_name').notEmpty(),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],

async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseHandler(res, 400, errors.array()[0]['msg'], null, errors.array());
  }

  try {
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };

    const user = await userService.signUp(userData);
    return responseHandler(res, 201, 'Registered', user);
  } catch (error: any) {
    return responseHandler(res, 400, error.message, null, error);
  }
});

router.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],

async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseHandler(res, 400, errors.array()[0]['msg'], null, errors.array());
  }

  try {
    const token = await userService.login(req.body.username, req.body.password);
    return responseHandler(res, 200, `Logged in`, {token: token, username: req.body.username});
  } catch (error: any) {
      return responseHandler(res, 400, error.message, null, error);
  }
});


router.get('/verify', authenticate, async (req, res) => {
  return responseHandler(res, 200, `verified`);
});

export default router;