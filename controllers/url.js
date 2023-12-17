const shortid = require('shortid');
const URL = require('../models/url');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL;

async function handleGenerateShortUrl(req, res) {
 
  const body = req.body;
  const shortID = await shortid();
  console.log(shortID);

  if(!body.url) return res.status(400).json({error: 'URL is required'});
  const newurl = new URL ({
    shortID: shortID,
    redirectURL: body.url,
    VisitHistory: [],
  });
  newurl.save();
  return res.json({id:`${BASE_URL}/url/${shortID}`});
}

async function handleRedirectUrl(req, res) {
    const shortID = req.params.shortID;
    const url = await URL.findOne({shortID: shortID});
    if(!url) return res.status(404).json({error: 'URL not found'});
    url.visithistory.push({timestamp: Date.now()});
    url.save();
    return res.redirect(url.redirectURL);
}

async function handleStatsUrl(req, res) {
    const shortID = req.params.shortID;
    const url = await URL.findOne({shortID: shortID});
    if(!url) return res.status(404).json({error: 'URL not found'});
    return res.json({
        history: url.visithistory,
        visits: url.visithistory.length
    });
}


async function handleAdminUrl(req, res) {
    const url = req.body.url;
    const urls = await URL.find({redirectURL: url});
    if(!urls) return res.status(404).json({error: 'URL not found'});
    return res.json({
        urls: urls,
    });
}

async function handleUrlDelete(req,res){
    const shortID = req.params.shortID;
    let url;
    try{
        url = await URL.deleteOne({shortID: shortID});
    }catch(err){
        console.log(err);
        return res.status(404).json({error: 'URL not found'});
    }
    return res.json({
        message: "URL deleted successfully",
    });

}

module.exports = {
    handleGenerateShortUrl,
    handleRedirectUrl,
    handleStatsUrl,
    handleAdminUrl,
    handleUrlDelete
};