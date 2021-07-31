const router = require('express').Router();
const dashboardRoutes = require('./dashboard-routes');

// requires new api folder with comment-routes.js
const apiRoutes = require('./api/comment-routes.js');

const homeRoutes = require('./home-routes.js');

router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;