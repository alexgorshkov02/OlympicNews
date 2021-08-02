const router = require('express').Router();

// requires new api folder with comment-routes.js
const apiRoutes = require('./api/');
const dashboardRoutes = require('./dashboard-routes');
const homeRoutes = require('./home-routes');


router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);

module.exports = router;