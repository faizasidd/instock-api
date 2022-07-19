const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require('fs');
const warehouses = require('../data/warehouses.json')
// const inventories = require('../data/inventories.json')
const { v4: uuidv4 } = require('uuid');
const { json } = require('express');

router.use(cors());
router.use(bodyParser.json());
router.use(express.json());

// POST/CREATE a New Warehouse

router.post('/warehouses/add', ((req, res) => {
    const newWarehouseInfo = {
        "id": uuidv4(),
        "name": req.body.name,
        "address": req.body.address,
        "city": req.body.city,
        "country": req.body.country,
        "contact": {
            "name": req.body.contact.name,
            "position": req.body.contact.position,
            "phone": req.body.contact.phone,
            "email": req.body.contact.email
        }
    }
    const newWarehouseDataSet = warehouses
    newWarehouseDataSet.push(newWarehouseInfo)

    fs.writeFile(__dirname + '/../data/warehouses.json', JSON.stringify(newWarehouseDataSet, null, 2), (err) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json("warehouse Added")
        }
    })
}))


module.exports = router;