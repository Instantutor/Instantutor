const express = require('express')
const router = express.Router();
var spawn = require('child_process').spawn;

router.get('/data_to_send', (req, res) =>{
  const process = spawn('python3', ['python_test.py', 'dino.benj@gmail.com']);
   // collect data from script
   process.stdout.on('data', (data) => {
       res.send(data.toString());
   });
 });
module.exports = router;
