const express = require('express');
const router = express.Router();

const contactController = require('../controller/contactcontroller.js');

router.post('/contact', contactController.submitContactForm);

module.exports = router;
