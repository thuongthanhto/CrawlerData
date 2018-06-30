var express = require('express');

var router = express.Router();

var RatesController = require('../../controllers/rates.controller');

// Map each API to the Controler functions
router.get('/getalldata/:id', RatesController.getRawDataById);

// Export the Router
module.exports = router;