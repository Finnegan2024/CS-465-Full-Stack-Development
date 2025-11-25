const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

router.route('/trips').get(tripsController.tripsList);

// route tripsFindByCode and require paramter
router.route('/trips/:tripCode')
.get(tripsController.tripsFindByCode);

module.exports = router;
