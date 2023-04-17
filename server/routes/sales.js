const express = require('express');

const {getOverView} = require('../controllers/sales');

const router = express.Router();

router.get('/overview',getOverView);

module.exports = router;