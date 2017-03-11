/**********************************************************************************************************
 * 
 *  Selenium locator functions...
 * 
 *   webdriver.by.className('.my-class')
 *   webdriver.by.css('#some-id')
 *   webdriver.by.id('element-id')
 *   webdriver.by.linkText('click me')
 *   webdriver.by.js
 *   webdriver.by.name('firstName')
 *   webdriver.by.partialLinkText('click')
 *   webdriver.by.tagName('a')
 *   webdriver.by.xpath()
 * 
 *  Mocha note:
 *    To run a single test... ./node_modules/.bin/mocha -g Search test/guiTest1.js
 * 
 *    -g Pattern matches the 'describe'
 *
 */


'use strict';
require('chai').should();
var expect = require('chai').expect;

let webdriver = require('selenium-webdriver');
let By = webdriver.By;
let until = webdriver.until;

var proxy = require('selenium-webdriver/proxy');
let driver = new webdriver.Builder()
    .withCapabilities({ 'browserName': 'firefox' })
    .setProxy(proxy.manual({
        http: 'proxy.scee.net:3128',
        https: 'proxy.scee.net:3128'
    }))
    .build();

/**
 * Landing page.  Ensure title is correct.
 */
describe('PMDB Landing page', function () {

    /* 10 Seconds works well locally */
    this.timeout(10000);

    /**
     * Before hook to start webdriver
     */
    before(function (done) {
        driver.navigate().to('http://localhost:8081/')
            .then(() => done())
    });

    /**
     * Page title correct?
     */
    it('Ensure page title is correct', function (done) {
        driver.getTitle()
            .then(() => driver.getTitle())
            .then(title => title.should.equal('Partner Management Database'))
            .then(() => done());
    });

    /**
     * Search for our partner.  This was created by the tes tdata 
     * @See pmdb-services
     */
    it('Search for Partner 142', function (done) {
        driver.wait(until.elementLocated(By.id('ps_Search')), 5 * 1000).then(function (element) {
            element.sendKeys('142').then(() => {
                driver.getPageSource().then((source) => {
                    expect(source).to.contain('PARTNER_0142');
                });
            });
        }).then(() => done());
    });

    /**
     * Click our language button
     */
    it('Click language', function (done) {
        driver.findElement(By.id('hdr_languageSelection')).click();
        done();
    });

    /**
     * Click the Japanese language selection
     */
    it('Switch to Japanese', function (done) {
        return driver.findElement(By.id('hdr_languageSelection_ja')).click(() => {
        }).then(done());
    });

    /**
     * Check for Search Partner in Japanese...
     */
    it('Is panel title Japanese', function (done) {
        driver.findElement(By.className('panel-title')).getText()
            .then((text) => {
                expect(text).to.contain('-検索パートナー');
                done()
            });
    })

    /**
     * After hook to quit webdriver
     */
    after(function (done) {
        driver.quit()
            .then(() => done());

    });
});