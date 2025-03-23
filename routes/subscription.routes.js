import { Router } from 'express';
const subsRouter = Router();

subsRouter.get( "/", (req, res) => {
  res.send( { title: "GET All Subscriptions" } )
});

subsRouter.post( "/", (req, res) => {
  res.send( { title: "CREATE New Subscriptions" } )
});

subsRouter.put( "/:id", (req, res) => {
  res.send( { title: "UPDATE Subscription By Id" } )
});

subsRouter.delete( "/:id", (req, res) => {
  res.send( { title: "DELETE Subscription By Id" } )
});

subsRouter.get( "/:id", (req, res) => {
  res.send( { title: "GET Subscription By Id" } )
});

subsRouter.get( "/users/:id", (req, res) => {
  res.send( { title: "GET All Subscription By Id" } )
});

subsRouter.put( "/:id/cancel", (req, res) => {
  res.send( { title: "Cancel Subscription By Id" } )
});

subsRouter.get( "/upcoming-renewals/:id", (req, res) => {
  res.send( { title: "GET All upcoming renewals by id" } )
});

export default subsRouter;
