const express = require('express'); // we add express to the file
const router = express.Router(); // we add the router method to create a new router object

/* GET home page.
  Retireves web pages. Example: about.pug, contact.pug, etc...
 */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});


module.exports = router;