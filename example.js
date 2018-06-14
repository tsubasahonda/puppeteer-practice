//const CoinboardScrapper = require('coinboard-scrapper')
const CoinboardScrapper = require('./index.js')

require('dotenv').config()

const cbs = new CoinboardScrapper({
  email: process.env.EMAIL,
  password: process.env.PASSWORD
})


cbs.getTotalAssets('btc').then((result) => {
  console.log(result)
})