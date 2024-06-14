const URL = require("../Models/url.models");

// const {nanoid} = require('nanoid');
// (async () => {
//     const { nanoid } = await import('nanoid');
//     // You can now use nanoid here
//   })();

let nanoid;

(async () => {
  const nanoidModule = await import("nanoid");
  nanoid = nanoidModule.nanoid;
})();

async function handleGenerateShortUrl(req, res) {
  const body = req.body;

  if (!body.url) return res.status(404).json({ error: "Url is required" });

  const shortid = nanoid(8);
  await URL.create({
    shortId: shortid,
    redirectURL: body.url,
    visitHistory: [],
  });

  // return res.status(200).json({ Id: shortid });
  return res.render('home',{Id: shortid})
}

async function getShortUrl(req, res) {
  const shortid = req.params.shortId;
    console.log(shortid);
  const entry = await URL.findOneAndUpdate(
    { shortId:shortid },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  console.log(entry);
  res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;

    const result =await URL.findOne({shortId})

    res.json({
        totalClick: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = { handleGenerateShortUrl ,getShortUrl , handleGetAnalytics };
