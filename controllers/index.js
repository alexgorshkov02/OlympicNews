const router = require('express').Router();

// requires new api folder with comment-routes.js
const apiRoutes = require('./api/comment-routes.js');

const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;