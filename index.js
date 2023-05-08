// We want to pull out Builder, By, Key, Until from the selenium webdriver
const { assert } = require('console');
const {Builder, By, Key, until} = require ('selenium-webdriver');
// We import should() from chai
const should = require ('chai').should();

async function googleSearch() {
    // Create new instance of firefox
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        // Go to google.com
        await driver.get('https://www.google.com');
        // Find the accept/decline cookies button
        let cookieButton = await driver.findElements(By.css('.QS5gu.sy4vM'));
        // Click the accept cookies button
        await cookieButton[1].click();
        // Wait until the element is located, in this case search bar
        await driver.wait(until.elementLocated(By.name('q')), 10000);
        // Selenium is to fast, better wait 1 second / 1000 ms
        await driver.sleep(1000);
        // Write something in the search bar and push enter
        await driver.findElement(By.name('q')).sendKeys('Selenium', Key.ENTER);
        // Wait until element are located
        await driver.wait(until.elementsLocated(By.css('h3')), 10000);

        // Get the link text
        let firstLink = await driver.findElement(By.css('h3'));
        let linkText = await firstLink.getText();
        console.log(linkText);
        
        // Assert linkText
        linkText.should.equal('Selenium');

        // Should always run if assert above validates correctly
        if(linkText === 'Selenium') {
            await firstLink.click();
        } else {
            console.log('First link is not "Selenium".');
        }

        // Wait until site loads
        await driver.wait(until.titleContains('Selenium'), 10000);
        // Get the title
        let title = await driver.getTitle();
        // Assert the title
        title.should.include('Selenium');

    } catch(e) {
        console.log(e);
    } finally {
        console.log('The test was a success!')
        await driver.quit();
    }
}

googleSearch();