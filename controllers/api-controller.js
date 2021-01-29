var express = require("express");
const db = require('../models')

var router = express.Router();

// use router.get router.post router.put router.delete

// GET route for retrieving all dialogue from a single user
router.get("/api/userdialogue", (req, res) => {
  let query = {};
  if (req.query.user_id) {
    query.UserId = req.query.user_id;
  }
  db.UserDialogue.findAll(
    {
    where: query
  }
  ).then(dbUserDialogue => {
    res.json(dbUserDialogue);
  }).catch(err => {
    console.log(err.message);
    res.status(500).send(err.message);
  });
});

// POST route for saving new dialogue to the USERDIALOGUE table
router.post("/api/userdialogue", (req, res) => {
  console.log(req.body);
  db.UserDialogue.create(req.body).then(dbUserDialogue => {
    res.json(dbUserDialogue)
  }).catch(err => {
    console.log(err.message);
    res.status(500).send(err.message);
  });
});

// GET route for retrieving all users from USER table
router.get("/api/users", (req, res) => {
  db.User.findAll().then(dbUser => {
    res.json(dbUser);
  }).catch(err => {
    console.log(err.message);
    res.status(500).send(err.message);
  });
});

// POST route for creating a new user
router.post("/api/users", (req, res) => {
  console.log(req.body);
  db.User.create(req.body).then(dbUser => {
    res.json(dbUser);
  }).catch(err => {
    console.log(err.message);
    res.status(500).send(err.message);
  });
});

// PUT route for updating a user
router.put("/api/users", (req,res) => {
  db.User.update(
    req.body,
    {
      where: {
        id:req.body.id
      }
    }).then(dbUser => {
      res.json(dbUser)
    }).catch(err => {
      console.log(err.message);
      res.status(500).send(err.message);
    })
})

// DELETE route for deleting user with a specific id
router.delete("/api/users/:id", (req,res) => {
  db.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbUser => {
    res.json(dbUser)
  }).catch(err => {
    console.log((err.message));
    res.status(500).send(err.message);
  })
})


// Export routes for server.js to use.
module.exports = router;