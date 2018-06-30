var express = require('express');

var router = express.Router();
var rates = require('./api/rates.route');
var adjustments = require('./api/adjustments.route');

router.use('/rates', rates);
router.use('/adjustments', adjustments);

module.exports = router;