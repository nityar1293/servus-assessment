
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('file:///C:/satish/index.html');


driver.sleep(1000).then(function () {

    //Test case 1
    driver.findElement(By.id("inputEmail")).isDisplayed().then(function () {
        driver.findElement(By.id("inputPassword")).isDisplayed().then(function () {
            driver.findElement(By.xpath("//*[@id=\"test-1-div\"]/form/button")).isDisplayed().then(function () {
                console.log("Test1 passed")
            }).catch(function () {
                console.log("Test1 failed: Login button is not present")
            })
        }).catch(function () {
            console.log("Test1 failed: Password field is not present")
        })
    }).catch(function () {
        console.log("Test1 failed: Email is not present")
    })

    //Test case 2
    driver.findElements(By.className('list-group-item justify-content-between')).then(function (elements) {
        if (elements.length == 3) {
            console.log("Test 2.1 passed")
        } else {
            console.log("Test 2.1 failed")
        }
    });


    driver.findElement(By.xpath("//*[@id=\"test-2-div\"]/ul/li[2]")).getText().then(function (title) {
        if (title === 'List Item 2 6') {
            console.log('Test 2.2 passed');
        } else {
            console.log('Test 2.2 failed');
        }
    });

    driver.findElement(By.xpath("//*[@id=\"test-2-div\"]/ul/li[2]/span")).getText().then(function (badge) {
        if (badge === '6') {
            console.log('Test 2.3 passed');
        } else {
            console.log('Test 2.3 failed');
        }
    });

    // Test case 3
    driver.findElement(By.xpath('//*[@id="dropdownMenuButton"]')).getText().then(function (selected) {
        if (selected === 'Option 1') {
            console.log('Test 3 passed')
        } else {
            console.log('Test 3 failed')
        }
    });

    //Test case 4
    driver.findElement(By.xpath('//*[@id="test-4-div"]/button[1]')).then(function (firstButton) {
        if (firstButton.isEnabled()) {
            driver.findElement(By.xpath('//*[@id="test-4-div"]/button[2]')).then(function (secondButton) {
                if (secondButton.isEnabled()) {
                    console.log("Test 4 passed")
                } else {
                    console.log("Test 4 failed")
                }
            }).catch(function (error) {
                console.log("Test 4 failed")
            })
        }

    }).catch(function (error) {
        console.log("Test 4 failed")
    });

    //Test case 5
    driver.wait(until.elementLocated(By.id('test5-button')), 10000).then(function (element) {

        driver.findElement(By.xpath('//*[@id="test5-button"]')).click().then(function () {
            driver.findElement(By.xpath('//*[@id="test5-alert"]')).isDisplayed().then(function () {
                if (!element.isEnabled()) {
                    console.log('Test 5 passed')
                }
            })
        });
    });

    //Test case 6
    driver.sleep(1000).then(function () {
        getValueFromGrid(2, 2).then(function (value) {
            if (value === 'Ventosanzap') {
                console.log('Test6 passed')
            }
        })
    })


    function getValueFromGrid(tr, td) {
        return driver.findElement(By.xpath('//*[@id="test-6-div"]/div/table/tbody/tr[' + (++tr) + ']/td[' + (++td) + ']')).getText();
    }
})