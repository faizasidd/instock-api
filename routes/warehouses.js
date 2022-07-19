const express = require('express');
const router = express.Router();
let warehouses = require ('../data/warehouses.json');

//full details on all warehouses, array of objects
router.get('/', (req, res) => {
    console.log('get a list of warehouses')
    res.status(200).json(warehouses)
})


module.exports = router;