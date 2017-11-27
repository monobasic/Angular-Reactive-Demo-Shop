const express = require('express')
const router = express.Router()

/* GET api listing. */
router.get('/', (req, res) => {
	res.send('user works')
})

module.exports = router
