const { scrape } = require("../headless/index.js");
const router = require("express").Router();
module.exports = router;

// Post request with new url and return scrape results
router.post("/", async (req, res, next) => {
  try {
    const results = await scrape(req.body.url);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

// Error handler
router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
