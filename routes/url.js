const express = require('express');
const { handleGenerateShortUrl, handleRedirectUrl, handleStatsUrl,handleAdminUrl,handleUrlDelete } = require('../controllers/url');
const router = express.Router();

router.post('/', handleGenerateShortUrl);
router.get('/:shortID', handleRedirectUrl);
router.get('/stats/:shortID', handleStatsUrl);
router.post('/admin',handleAdminUrl);
router.delete('/:shortID',handleUrlDelete);
module.exports = router;