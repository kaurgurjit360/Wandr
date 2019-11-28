const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../middlewares/authentication');
const { Brooklyn } = db;

            // This is a simple example for providing basic CRUD routes for
            // a resource/model. It provides the following:
            //    GET    /posts
            //    POST   /posts
            //    GET    /posts/:id
            //    PUT    /posts/:id
            //    DELETE /posts/:id 

            // There are other styles for creating these route handlers, we typically
            // explore other patterns to reduce code duplication.
            // TODO: Can you spot where we have some duplication below?


// MELDINS NOTES::::::
// This file determines how the requests are being handled. Every request ending with 
// '/brooklyn/' will be dealt here. So when something ends in '/brooklyn', the very function 
// below this comment finds all of the entries in the table (the 'Brooklyn.findAll({})' method). 



router.get('/', (req,res) => {
  Brooklyn.findAll({})
    .then(activity => res.json(activity));
});


router.post('/',
  passport.isAuthenticated(),
  (req, res) => {
    let { activity } = req.body;
    
    Brooklyn.create({ activity })
      .then(brooklyn => {
        res.status(201).json(brooklyn);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);


router.get('/:id', (req, res) => {
  const { id } = req.params;
  Brooklyn.findByPk(id)
    .then(activity => {
      if(!activity) {
        return res.sendStatus(404);
      }

      res.json(activity);
    });
});


router.put('/:id',
  passport.isAuthenticated(),
  (req, res) => {
    const { id } = req.params;
    Brooklyn.findByPk(id)
      .then(post => {
        if(!post) {
          return res.sendStatus(404);
        }

        post.content = req.body.content;
        post.save()
          .then(post => {
            res.json(post);
          })
          .catch(err => {
            res.status(400).json(err);
          });
      });
  }
);


router.delete('/:id',
  passport.isAuthenticated(),
  (req, res) => {
    const { id } = req.params;
    Brooklyn.findByPk(id)
      .then(post => {
        if(!post) {
          return res.sendStatus(404);
        }

        post.destroy();
        res.sendStatus(204);
      });
  }
);


module.exports = router;