const express = require('express');
const router = express.Router();

const LinkHandler = require('../utils/LinkHandler');

router.ws('/link/:name', function(ws, req) {
  const name = req.params.name;
  LinkHandler.addLink(ws, name);
});

module.exports = router;
