const fs = require("fs");
var AdjustmentService = require('../services/adjustment.service');

module.exports = {
    getAllAdjustment: getAllAdjustment
};


async function getAllAdjustment(req, res) { 
    try {      
        var result = await AdjustmentService.getAllAdjustments();
        return res.status(200).json({
            status: 200,
            data: result,
            message: "Success"
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
 }