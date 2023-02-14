import {
  addNewContact,
  getContacts,
  getContactwithID,
  updateContact,
  deleteContact,
} from "../controllers/crmController";

const routes = (app) => {
  app
    .route("/contact")

    // find all contacts
    .get((req, res, next) => {
      //middleware
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getContacts)
    // (req, res, next) => {
    // res.send("Get request successful")})

    //.post((req, res)=> res.send("Post request successful"))

    // post a new contact
    .post(addNewContact);

  app
    .route("/contact/:contactId")

    // find specific contact
    .get(getContactwithID)

    //.put((req, res) => res.send("Put request successful"))

    // update a contact
    .put(updateContact)

    //.delete((req, res) => res.send("Delete request successful"));
    // delete a contact
    .delete(deleteContact);
};

export default routes;
