const puppeteer = require('puppeteer');
require('dotenv').config();

class singleScrapper {
  constructor(args) {
    this.roomID = args.roomID;
  }

  async getSingleStatus() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      await page.goto(process.env.URL + `${this.roomID}`);

      let singleInfo = await page.evaluate(() => {
        let singleInfomationsElement = document.querySelectorAll('.sidebar-single > .info > ul > li');
        let singleInfomations = [];
        let singleInfomationsKey = '';
        let singleInfomationsValue = '';
        let loopCount = 0;
        for (let i=0; i < singleInfomationsElement.length; i++) {
          //singleInfomationsKey.push(singleInfomations[i].innerText);
          singleInfomationsKey = singleInfomationsElement[i].children[0].innerText;
          singleInfomationsValue = singleInfomationsElement[i].getElementsByTagName('p').innerText;
          singleInfomations[`${singleInfomationsKey}`] = singleInfomationsValue;
          loopCount = singleInfomationsKey;
        }
        return loopCount;
      });

      await browser.close();

      return singleInfo;
    } catch (e) {
      console.error(e);
      await browser.close();
      return e;
    }
  }
}

const singleInfo = new singleScrapper({
  roomID: '140806'
});

singleInfo.getSingleStatus().then((result) => {
  console.log(result);
});