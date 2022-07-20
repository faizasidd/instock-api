const express = require('express');
const router = express.Router();
const warehouses = require('../data/warehouses.json')
const inventories = require('../data/inventories.json')
const fs= require("fs")
const { v4: uuidv4 } = require('uuid');

// GET a Single Inventory Item

router.get('/:inventoryId', ((req, res) => {

    const id = req.params.inventoryId
    const selectedInventory = inventories.filter(inventory => inventory.id === id)

    if (selectedInventory) {
        res.status(200).send(selectedInventory)
    }
    else {
        res.status(400).json(`Inventory with id: ${id} does not exist`)
    }
}))

module.exports = router;