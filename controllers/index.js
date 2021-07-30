const router = require('express').Router();

// requires new api folder with comment-routes.js
const apiRoutes = require('./api/');

const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);

module.exports = router;