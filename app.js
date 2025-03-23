import express from 'express';
import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subsRouter from './routes/subscription.routes.js';

const app = express();

// to specify what routes the app must use
//
// therefore we can get to signup in auth.routes.js
// by going to /api/v1/auth.
// "/" in authRouter is /api/v1/auth, not "/" of the mainurl;
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subsRouter);

// route and callback function
app.get( '/', ( req, res ) => {
	res.send("Hello, World!\nWelcome to the Subscription Tracker API!");
});

app.listen(PORT, () => {
	console.log(`Subscription API running on port http://localhost:${PORT}`);
});

export default app;
