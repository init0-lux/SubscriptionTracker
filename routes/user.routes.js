import { Router } from 'express';
const userRouter = Router();

// GET /users => get all users
// GET /users/:id => dynamic parameters which gets user no. :id


// you can have different routes with same end-point,
// as long as they have different verbs
userRouter.get( '/', (req, res) => {
  res.send({ title: "GET All Users"});
});

userRouter.post( '/', (req, res) => {
  res.send({ title: "CREATE New User"});
});

userRouter.get( '/:id', (req, res) => {
  res.send({ title: "GET User Details"});
});

// put is typically used for updates
userRouter.put( '/:id', (req, res) => {
  res.send({ title: "UPDATE User by Id"});
});

userRouter.delete( '/:id', (req, res) => {
  res.send({ title: "DELETE User by Id"});
});

export default userRouter;
