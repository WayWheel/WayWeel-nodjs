const express = require('express');
const router = express.Router();

// Define the endpoint for GET /api/goods/types
router.get('/types', (req, res) => {
  const goodsTypes = ["Furniture", "Electronics", "Clothing", "Other"];

  res.status(200).json({ success: true, goodsTypes });
});

module.exports = router;
