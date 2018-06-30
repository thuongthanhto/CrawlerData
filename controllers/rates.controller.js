var RateService = require('../services/rate.service');
const puppeteer = require('puppeteer');

_this = this;

exports.getTimeStamp = async function (req, res) {
    try {
        RateService.getTimeStamp(res, function (value) {
            if (value){
                return res.status(200).json({
                    status: 200,
                    data: value,
                    message: "list timestamp"
                });
            }
        });


    } catch (e) {
        return res.status(400).json({
            status: 400,
            data: e,
            message: e.message
        });
    }
}

exports.getRawDataById = async function (req, res) {
    var logStatus = [];
    var id = req.params.id;
    console.log(id);
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage()
    try {
        await page.goto('https://epps.elliemae.com/login.aspx')
        await page.type('[name="id"]', 'dp');
        await page.type('[name="pw"]', 'Welcome@16');
        await page.click('[onclick="return DoLogin(this);"]')
        await page.waitFor(2 * 1000);
        logStatus.push("Puppeteer login success.");
        await page.click('[href="myloans.aspx?Fn=ShowMore&HowMany=100"]')
        await page.waitFor(7 * 1000);

        if (id === '6215260') {
            var urlPage = '[href="myloans.aspx?Fn=Select&LoanID=' + id + '&Target=P"]'
            await page.click(urlPage)
            await page.waitFor(5 * 1000);
            await page.click('[name="Qualify"]')
            await page.waitFor(5 * 1000)
        } else {
            var urlPage = '[href="myloans.aspx?Fn=Select&LoanID=' + id + '&Target=Q"]'
            await page.click(urlPage)
        }

        const sessionCookies = await page.cookies();
        var cookie = sessionCookies[0].name + '=' + sessionCookies[0].value + '; ' + sessionCookies[2].name + '=' + sessionCookies[2].value + '; ' + sessionCookies[1].name + '=' + sessionCookies[1].value;
        logStatus.push("Puppeteer get cookie success.");

        try {
            RateService.getRawDataOfAllLenderById(res, cookie, id, function (value) {
                if (value == 'success') {
                    RateService.processRawDataById(id, function (value) {
                        if (value = "success") {
                            return res.status(200).json({
                                status: 200,
                                data: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                                message: "Update success"
                            });
                        }
                    });

                    browser.close()
                } else {
                    console.log('error');
                    browser.close()
                }
            });
            //await RateService.updateRateById(id);
            // logStatus.push("Puppeteer get data of all lender success.");
            // browser.close()
            // return res.status(200).json({
            //     status: 200,
            //     data: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            //     message: "Update success"
            // });
        } catch (e) {
            // logStatus.push("Puppeteer get data of all lender failed.");
            // browser.close()
            // return res.status(400).json({
            //     status: 400,
            //     data: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            //     message: e.message
            // });
        }
    } catch (error) {
        logStatus.push("Puppeteer failed.");
        browser.close()
        console.log(error);
        return res.status(400).json({
            status: 400,
            data: logStatus,
            message: "Error puppeteer or network slow. Please try again!"
        });
    }
}

exports.processRawData = async function (req, res) {
    var logStatus = [];
    try {
        var result = await RateService.processRawData();
        logStatus.push("Process raw data success.");
        return res.status(200).json({
            status: 200,
            data: logStatus,
            message: "Success Object Lender Recieved"
        });
    } catch (e) {
        logStatus.push("Process raw data failed.");
        return res.status(400).json({
            status: 400,
            data: logStatus,
            message: e.message
        });
    }
}

exports.processRawDataById = async function (req, res) {
    var logStatus = [];
    var id = req.params.id;
    try {
        var result = await RateService.processRawDataById(id);
        ogStatus.push("Process raw data success.");
        return res.status(200).json({
            status: 200,
            data: logStatus,
            message: "Update Done!"
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            data: logStatus,
            message: e.message
        });
    }
}

exports.updateRate = async function (req, res) {
    var logStatus = [];
    try {
        var result = await RateService.updateRate();
        logStatus.push("Update rate success.");
        return res.status(200).json({
            status: 200,
            data: logStatus,
            message: "Success Update Lender"
        });
    } catch (e) {
        logStatus.push("Update rate failed.");
        return res.status(400).json({
            status: 400,
            data: logStatus,
            message: e.message
        });
    }
}

exports.updateRateById = async function (req, res) {
    var logStatus = [];
    var id = req.params.id;
    try {
        var result = await RateService.updateRateById(id);
        logStatus.push("Update rate success.");
        return res.status(200).json({
            status: 200,
            data: logStatus,
            message: result,
            timestamp: Date.now(),
        });
    } catch (e) {
        logStatus.push("Update rate failed.");
        return res.status(400).json({
            status: 400,
            data: logStatus,
            message: e.message
        });
    }
}
