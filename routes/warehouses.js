const express = require('express');
const router = express.Router();
let warehouses = require ('../data/warehouses.json');

//full details on all warehouses, array of objects
router.get('/', (req, res) => {
    res.json(warehouses)
})

module.exports = router;