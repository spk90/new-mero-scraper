const axios= require('axios');
const express= require('express');
const cheerio= require('cheerio');
const cors= require('cors')
const app= express();


app.use(cors());



async function getPriceFeed(){
    try{

        const siteUrl='https://merolagani.com/LatestMarket.aspx';
        const {data}= await axios.get(siteUrl);
        
        const $=cheerio.load(data);
        const elemSelector= "#ctl00_ContentPlaceHolder1_LiveTrading > table > tbody > tr"
        const selectedData= $(elemSelector);
        
        const keys=[
            "symbol", "ltp", "% change", "high", "low", "open", "qty"
        ]

        const nepseData= []
        
        selectedData.each((index,valueElement)=>{
            const nepseObjData= {};
            
                const eachElement= $(valueElement).children();
                eachElement.each((child, childElem)=>{
                    const tdValue= $(childElem).text();
                    if(tdValue){
                        nepseObjData[keys[child]] =tdValue;   
                    }
                })
                
            nepseData.push(nepseObjData)
            

            
        })
        return(nepseData)
    
    }catch(err){
        console.log(err);
    }
}

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.get("/api/price", async (req,res)=>{
    try{
        const price= await getPriceFeed();
        return res.status(200).json({
            result:price,
        })
    }catch(err){
        console.log(err)
    }
})


app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running")
})