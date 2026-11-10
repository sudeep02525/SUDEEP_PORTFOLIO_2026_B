import { Router } from 'express';
import { recordVisitor, getVisitorCount } from '../controllers/visitorController.js';

const router = Router();

// Endpoint to fetch count without incrementing
router.get('/count', getVisitorCount);

// Endpoint to record a visit (supports both GET and POST for maximum frontend compatibility)
router.get('/', recordVisitor);
router.post('/', recordVisitor);

export default router;

