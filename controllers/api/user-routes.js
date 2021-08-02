const router = require('express').Router();
const { User } = require('../../models');

// get all users 
// ================================================
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// do we need to "findone"?
// ================================================



// posts
// ================================================

// POST to sign up
router.post("/", (req, res) => {
    User.create({
      username: req.body.username,
      password: req.body.password,
    })
      .then((dbUserData) => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
  
          res.json(dbUserData);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

router.post('/login', (req, res) => {
    // expects {username and password}
    console.log("running");
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        // console.log(dbUserData);

        if (!dbUserData) {
            res.status(400).json({ message: 'Incorrect username!' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        
        req.session.save(() => {
            req.session.user_id = dbUserData.isSoftDeleted;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in! '});
        });
    });
});

router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;