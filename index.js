//Use puppeteer
const puppeteer = require("puppeteer");
let cPage;

console.log("Start");

//Primarily we will use puppeteer.launch() function to launch the browser and it will return the promise in pending state
const browserOpenPromise= puppeteer.launch(
    {
        headless:false,
        slowMo: true,
        defaultViewport:null,
        args:["--start-maximized"]
    });
//after promise is settled and if the outcome is fulfilled
browserOpenPromise.then(function(browser)
{
   //we will use another function for accessing current opened tabs 
   const pagesArrPromise=browser.pages();
   return pagesArrPromise;//again here a promise is returned which will be handled by .then() attached in the next line
}).then(function(browserPages)
{
    cPage=browserPages[0];//the current tab will be in the 0th index of the array of pages bz there is only one open tab 
    let gotoPromise=cPage.goto("https://www.google.com/");
    return gotoPromise;//again here a promise is returned which will be handled by .then() attached in the next line
}).then(function()
{
    //waiting for the element to appear on the page 
    let elementWaitPromise = cPage.waitForSelector("textarea#APjFqb.gLFyf",{visible:true});
    return elementWaitPromise;

}).then(function()
{  //now we will use another function as we want to take some input through Keyboard obv. without actually typing anything
    let keysWillBeSendPromise = cPage.type("textarea#APjFqb.gLFyf","LeetCode");
    return keysWillBeSendPromise;//again here a promise is returned which will be handled by .then() attached in the next line
}).then(function()
{   //Here page.keyboard to press enter key obv. without actually pressing it
    let enterWillBePressedPromise=cPage.keyboard.press("Enter");
    return enterWillBePressedPromise;
}).then(function()
{
    let elementWaitPromise =cPage.waitForSelector("h3.LC20lb.MBeuO.DKV0Md", { visible: true })
    return elementWaitPromise;
}).then(function()
{   //function that will be performed by mouse
    let keysWillBeSendPromise = cPage.click("h3.LC20lb.MBeuO.DKV0Md");
    return keysWillBeSendPromise;
}).catch(function (err) // after promise is settled and if the outcome is rejected
{
   console.log(err);
})
console.log("End");