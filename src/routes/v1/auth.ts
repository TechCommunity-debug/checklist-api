import { Router } from 'express';
import { body } from 'express-validator';
// Controllers
import register from '@/controllers/v1/auth/register';

// Middleware
import validationError from '@/middleware/validationError';

// Models
import User from '@/models/user';

const router = Router();

router.post(
  '/register',
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isLength({ max: 50 })
    .withMessage('Email must be less than 50 characters')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (value) => {
      const userExists = await User.exists({ email: value });
      if (userExists) {
        throw new Error('Email already in use');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .isLength({ max: 20 })
    .withMessage('Password must be less than 100 characters'),
  body('role')
    .optional()
    .isString()
    .withMessage('Role must be a string')
    .isIn(['user', 'admin'])
    .withMessage('Role must be either user or admin'),
  validationError,
  register,
);

export default router;
