var express = require('express');

var router = express.Router();

var AdjustmentsController = require('../../controllers/adjustments.controller');

// Map each API to the Controler functions
router.get('/getall', AdjustmentsController.getAllAdjustment);

// Export the Router
module.exports = router;