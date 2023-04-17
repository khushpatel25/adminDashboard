const express = require('express');

const {getAdmins,getPerformance} = require('../controllers/management');

const router = express.Router();

router.get('/admin', getAdmins);
router.get('/performance/:id',getPerformance)

module.exports = router;