const router = require('express').Router();
const apiRoutes = require('./api');
const homePage = require('./homepage-routes');
const dashboardRoutes = require('./dashboard-routes.js');


router.use('/api', apiRoutes);
router.use('/', homePage);
router.use('/dashboard', dashboardRoutes);

module.exports = router;