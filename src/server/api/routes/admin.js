const express = require('express');

var router = express.Router();

// All test end points and those meant for developers are to be included here.
router.get('/', function(req, res) {
    res.end('Admin router reached.');
});

module.exports = router;