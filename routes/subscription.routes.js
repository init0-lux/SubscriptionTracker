import { Router } from 'express';

import authorize from '../middlewares/auth.middleware.js';
import {createSubscription, getSubscriptions, updateSubscription, deleteSubscription, cancelSubscription, upcomingSubscriptions} from '../controllers/subscription.controller.js';

const subsRouter = Router();

subsRouter.get( "/", authorize, getSubscriptions);
subsRouter.get( "/users/:id", authorize, getSubscriptions);

subsRouter.post( "/", authorize, createSubscription);

subsRouter.put( "/:id", authorize, updateSubscription);
subsRouter.delete( "/:id", authorize, deleteSubscription);

subsRouter.put( "/:id/cancel", authorize, cancelSubscription);
subsRouter.get( "/upcoming", authorize, upcomingSubscriptions);

export default subsRouter;
