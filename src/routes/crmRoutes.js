import {
  addNewContact,
  getContacts,
  getContactwithID,
  updateContact,
  deleteContact,
} from "../controllers/crmController";

import { login, register, loginRequired } from "../controllers/userController";

const routes = (app) => {
  app
    .route("/contact")

    // find all contacts
    .get(
      (req, res, next) => {
        //middleware
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
      },
      loginRequired,
      getContacts
    )
    // (req, res, next) => {
    // res.send("Get request successful")})

    //.post((req, res)=> res.send("Post request successful"))

    // post a new contact
    .post(loginRequired, addNewContact);

  app
    .route("/contact/:contactId")

    // find specific contact
    .get(loginRequired, getContactwithID)

    //.put((req, res) => res.send("Put request successful"))

    // update a contact
    .put(loginRequired, updateContact)

    //.delete((req, res) => res.send("Delete request successful"));
    // delete a contact
    .delete(loginRequired, deleteContact);

  //route for register
  app.route("/auth/register").post(register);

  //route for login
  app.route("/login").post(login);
};

export default routes;
