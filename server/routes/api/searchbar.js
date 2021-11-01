const express = require('express');
const router = express.Router();

// @route: GET api/searchbar/suggestedlist
// @desc:  Get all names that match the prefix
// @access Pubic
router.get('/suggestedlist', (req,res) => {
    var spawn = require('child_process').spawn;
    const process = spawn('python3', ['../../../algos/SearchBar/Trie.py', req.query.name]);
    process.stdout.on('data', (data) => {
        res.send(data.toString());
    });
});
module.exports = router;