const express = require("express");
const router = express.Router();
const db = require('../models')

router.get("/", (req, res) => {
  db.Review.findAll().then(data => {
    res.json(data)
  }).catach(err => {
    res.status(500).json(err)
  })
})

router.post('/', (req, res) => {
  if (!req.session.user) {
    res.status(401).send("Must login")
  } else {
    db.Review.create({
      title: req.body.title,
      review: req.body.review,
      score: req.body.score,
      UserId: req.session.user.id
    }).then(data => {
      res.json(data)
    }).catch(err => {
      res.status(500).json(err)
    })
  }
})

// use this to generate a profile page
router.get('/myreviews', (req, res) => {
  if (!req.session.user) {
    res.status(401).send("Must login")
  } else {
    db.Review.findAll({
      where: {
        UserId: req.session.user.id
      }
    }).then(data => {
      res.json(data)
    }).catch(err => {
      res.status(500).json(err)
    })
  }
})

module.exports = router;