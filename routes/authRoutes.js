const express = require("express");
const router = express.Router();

// Dummy route (for now)
router.get("/", (req, res) => {
  res.send("Auth route working!");
});

module.exports = router;
