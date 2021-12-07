const { scrape } = require("../headless/index.js");
const router = require("express").Router();
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const results = await scrape(req.body.url);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
