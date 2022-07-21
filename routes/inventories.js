const express = require('express');
const router = express.Router();
let inventories = require('../data/inventories.json')


//deleting inventory items 
router.delete('/inventory/:inventoryId', (req, res) => {
    //taking inventoryId as a param
    const {inventoryId} = req.params
    //finding the specific index of the inventory in the json
    const requestInventory = inventories.findIndex(inventory => inventory.id === inventoryId)

    //applying the above index to the json as 'inventory' to use as a body
    const inventory = inventories[requestInventory];

    inventories.splice(requestInventory, 1)

    const dataObject = JSON.stringify(inventories, null, 2);
    fs.writeFile(__dirname + '/../data/inventories.json', dataObject, (err) => {
        console.log(err)
    })
    res.status(200).json(inventory)
});

module.exports = router;