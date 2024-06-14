const express = require('express');

const route = express.Router();
const urlController = require('../Controllers/url.controller');

route.post('/',urlController.handleGenerateShortUrl);
route.get('/getUrl/:shortId',urlController.getShortUrl);
route.get('/getanalytics/:shortId',urlController.handleGetAnalytics);

module.exports = route;