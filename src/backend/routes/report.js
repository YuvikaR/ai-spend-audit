const express = require('express');
const router = express.Router();

router.post('/send-report-email', (req, res) => {
  res.json({ success: true });
});

module.exports = router;