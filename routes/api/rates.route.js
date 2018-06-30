var express = require('express');

var router = express.Router();

var RatesController = require('../../controllers/rates.controller');

// Map each API to the Controler functions
router.get('/getalldata/:id', RatesController.getRawDataById);

router.get('/processrawdata', RatesController.processRawData);

router.get('/processrawdata/:id', RatesController.processRawDataById);

router.get('/updaterate', RatesController.updateRate);

router.get('/updaterate/:id', RatesController.updateRateById);

router.get('/get-timestamp', RatesController.getTimeStamp);

// Export the Router
module.exports = router;