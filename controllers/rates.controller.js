var RateService = require('../services/rate.service');
const puppeteer = require('puppeteer');

_this = this;

exports.getRawDataById = async function (req, res) {
    var logStatus = [];
    var id = req.params.id;
    console.log(id);
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage()
    try {
        await page.goto('https://epps.elliemae.com/login.aspx');
        await page.waitFor(5 * 1000);
        await page.type('[name="id"]', 'dp');
        await page.type('[name="pw"]', 'Welcome@16');
        await page.click('[onclick="return DoLogin(this);"]')
        await page.waitFor(5 * 1000);
        await page.click('[href="myloans.aspx?Fn=ShowMore&HowMany=100"]')
        await page.waitFor(5 * 1000);
        console.log('show 100');
        if (id === '6215260') {
            console.log('6215260')
            var urlPage = '[href="myloans.aspx?Fn=Select&LoanID=' + id + '&Target=P"]'
            await page.click(urlPage)
            await page.waitFor(5 * 1000);
            await page.click('[name="Qualify"]')
            await page.waitFor(5 * 1000);
            const sessionCookies = await page.cookies();
            console.log(sessionCookies[0].name);
            var cookie = sessionCookies[0].name + '=' + sessionCookies[0].value + '; ' + sessionCookies[2].name + '=' + sessionCookies[2].value + '; ' + sessionCookies[1].name + '=' + sessionCookies[1].value;
            console.log('cookie here ' + cookie);
            logStatus.push("Puppeteer get cookie success.");
        } else {
            console.log('7406183');
            var urlPage = '[href="myloans.aspx?Fn=Select&LoanID=' + id + '&Target=Q"]'
            await page.click(urlPage);
            await page.waitFor(10 * 1000);
            const sessionCookies = await page.cookies();
            console.log(sessionCookies[0].name);
            var cookie = sessionCookies[0].name + '=' + sessionCookies[0].value + '; ' + sessionCookies[2].name + '=' + sessionCookies[2].value + '; ' + sessionCookies[1].name + '=' + sessionCookies[1].value;
            console.log('cookie here ' + cookie);
            logStatus.push("Puppeteer get cookie success.");
        }



        try {
            RateService.getRawDataOfAllLenderById(res, cookie, id, function (value) {
                if (value == 'success') {
                    RateService.processRawDataById(id, function (value) {
                        if (value = "success") {
                            return res.status(200).json({
                                status: 200,
                                data: value,
                                message: "Update success"
                            });
                        } else {
                            return res.status(400).json({
                                status: 400,
                                data: value,
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
            
        } catch (e) {
            
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

