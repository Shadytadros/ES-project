const router = require('express').Router();
const verify = require('./verifyToken');

router.post('/upload', verify, (req,res) => {
  res.json({
    image: {

    }
  });
});

module.exports = router;
