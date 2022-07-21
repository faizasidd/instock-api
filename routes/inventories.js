const express = require('express');
const router = express.Router();
let inventories = require('../data/inventories.json')


//deleting inventory items 
router.delete('/inventory/:inventoryId', (req, res) => {
    
    const {inventoryId} = req.params
    const requestInventory = inventories.findIndex(inventory => inventory.id === inventoryId)

    const inventory = inventories[requestInventory];

    inventories.splice(requestInventory, 1)

    const dataObject = JSON.stringify(inventories, null, 2);
    fs.writeFile(__dirname + '/../data/inventories.json', dataObject, (err) => {
        console.log(err)
    })
    res.status(200).json(inventory)
});

module.exports = router;