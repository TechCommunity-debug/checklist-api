import { Router } from 'express';

//Routes
import authRoutes from '@/routes/v1/auth';

const router = Router();

// Root route
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is live.',
    status: 'ok',
    version: '1.0.0',
    docs: 'http://your-docs-url.com',
    timeStamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);

export default router;
