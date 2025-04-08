import { Router } from 'express';
const workflowRouter = Router();
import { sendReminders } from '../controllers/workflow.controller.js';

workflowRouter.get('/', sendReminders);

export default workflowRouter;
