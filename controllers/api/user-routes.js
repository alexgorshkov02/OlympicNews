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

        // TODO: Implement this when the sessions are ready
        // req.session.save(() => {
        //     req.session.user_id = dbUserData.isSoftDeleted;
        //     req.session.username = dbUserData.username;
        //     req.session.loggedIn = true;

            req.user_id = dbUserData.isSoftDeleted;
            req.username = dbUserData.username;

            res.json({ user: dbUserData, message: 'You are now logged in! '});
        });
    // });
});

module.exports = router;