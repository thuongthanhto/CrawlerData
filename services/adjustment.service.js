const fs = require('fs');
const _ = require('lodash');

module.exports = {
    getAllAdjustments: getAllAdjustments
}

function getAllAdjustments(){
    var diamondContent = fs.readFileSync("./public/jsons/gmcc_diamond.json");
    var diamondObject = JSON.parse(diamondContent);

    var goldContent = fs.readFileSync("./public/jsons/gmcc_gold.json");
    var goldObject = JSON.parse(goldContent);

    var bronzeContent = fs.readFileSync("./public/jsons/gmcc_bronze.json");
    var bronzeObject = JSON.parse(bronzeContent);

    var silverContent = fs.readFileSync("./public/jsons/gmcc_silver.json");
    var silverObject = JSON.parse(silverContent);

    var silverPreferredPayment = fs.readFileSync("./public/jsons/gmcc_SilverPreferredPayment.json");
    var silverPreferredPaymentObject = JSON.parse(silverPreferredPayment);

    var ulyssesUSTContent = fs.readFileSync("./public/jsons/gmcc_UlyssesUST.json");
    var ulyssesUSTObject = JSON.parse(ulyssesUSTContent);

    var ulyssesLIBORContent = fs.readFileSync("./public/jsons/gmcc_UlyssesLIBOR.json");
    var ulyssesLIBORObject = JSON.parse(ulyssesLIBORContent);
    
    var arrayAllLender = [diamondObject, goldObject, bronzeObject, silverObject, silverPreferredPaymentObject, ulyssesLIBORObject, ulyssesUSTObject];


    return arrayAllLender;
}


