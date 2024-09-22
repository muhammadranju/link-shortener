const Url = require("../models/url.model");
const short = require("short-uuid");

// create url
exports.createUrl = async (req, res) => {
  // get url from body
  const { bodyUrl } = req.body;

  // check if url is required
  if (!bodyUrl) {
    return res.status(400).json({
      message: "Url is required", // message
    });
  }

  // check if url is valid
  const isUrl = bodyUrl.includes("https://") || bodyUrl.includes("http://");

  // check if url is valid
  if (!isUrl) {
    return res.status(400).json({
      message: "Url is not valid",
    });
  }

  // generate short url
  const shortUrl = short.generate()?.slice(0, 8);

  // create new url
  const url = new Url({
    shortUrl, // short url
    redirectUrl: bodyUrl, // original url
    visitHistory: [], // visit history
  });

  // save url
  await url.save();

  // return url
  return res.status(201).json({
    message: "Url created successfully", // message
    url, // url
  });
};

// get url
exports.getUrl = async (req, res) => {
  const { id } = req.params;
  const url = await Url.findOne({ shortUrl: id });

  // check if url is found
  if (!url) {
    return res.status(404).json({
      message: "Url not found",
    });
  }

  // add visit history
  url.visitHistory.push({
    timestamp: new Date(),
  });

  // save url
  await url.save();

  //   return res.status(200).json({
  // message: "Url fetched successfully",
  // url,
  //   });

  // redirect to original url
  return res.redirect(url.redirectUrl);
};

// get url history
exports.getUrlHistory = async (req, res) => {
  // get short url from params
  const { id } = req.params;

  // get url from database
  const url = await Url.findOne({ shortUrl: id });

  // check if url is found
  if (!url) {
    return res.status(404).json({
      message: "Url not found",
    });
  }

  // get visit history
  const history = url.visitHistory;

  // return visit history
  return res.status(200).json({
    message: "Url fetched successfully",
    click: history.length, // number of times the url has been clicked
    history, // visit history
  });
};
