var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get method test endpoint
 *     description: Use this endpoint to test if the GET method is working.
 *     responses:
 *       200:
 *         description: Success response indicating the GET method is working.
 *       400:
 *         description: Error
 */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('welcome index' );
});

module.exports = router;
