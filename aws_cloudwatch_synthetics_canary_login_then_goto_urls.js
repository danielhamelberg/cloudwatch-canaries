var synthetics = require('Synthetics');
const log = require('SyntheticsLogger');

const githubLogin = async function() {
    let page = await synthetics.getPage();

    const navigationPromise = page.waitForNavigation()

    await synthetics.executeStep('Goto_0', async function() {
        await page.goto("https://github.com/login", { waitUntil: 'domcontentloaded', timeout: 30000 })
    })

    await page.setViewport({ width: 1366, height: 768 })

    await navigationPromise

    await navigationPromise

    await synthetics.executeStep('Type_1', async function() {
        await page.type('#login_field', "username")
    })

    await synthetics.executeStep('Type_2', async function() {
        await page.type('#password', "password")
    })

    await synthetics.executeStep('Click_3', async function() {
        await page.waitForSelector('#login > div.auth-form-body.mt-3 > form > div > input.btn.btn-primary.btn-block')
        await page.click('#login > div.auth-form-body.mt-3 > form > div > input.btn.btn-primary.btn-block')
    })
    
    await synthetics.executeStep('Goto_1', async function() {
        await page.goto("https://github.com/explore", { waitUntil: 'domcontentloaded', timeout: 30000 })
        await new Promise(resolve => setTimeout(resolve, 1000));
    })

    await navigationPromise
    
    await navigationPromise
    
    const urls = ['https://github.com/topics','https://github.com/trending','https://gitlab.com/events'];
    
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
    await synthetics.executeStep('Goto_2', async function() {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
        await page.waitFor(10000);
        await new Promise(resolve => setTimeout(resolve, 1000));    
    })

    await navigationPromise
    
    await navigationPromise   

    }
}

exports.handler = async() => {
    return await githubLogin();
};
