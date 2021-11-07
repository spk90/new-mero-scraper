const axios= require('axios');
const cherio= require("cheerio");


async function getData(){
    const url="https://merolagani.com/MarketSummary.aspx?type=gainers"

    const data=await axios.get(url);
    const $=cherio.load(data);
    const elemSelector="#ctl00_ContentPlaceHolder1_tblSummary > tbody > tr"
    const selectedData= $(elemSelector)
    console.log(selectedData)

    selectedData.each((index,value)=>{
        console.log(value)
    })
    
}

getData()