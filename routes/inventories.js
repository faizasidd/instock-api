const express = require('express');
const router = express.Router();
let inventories = require('../data/inventories.json')
const warehouses = require('../data/warehouses.json')
const fs= require("fs")
const { v4: uuidv4 } = require('uuid');
const path = require("path");

//deleting inventory items 
router.delete('/:inventoryId', (req, res) => {
    
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

// POST/CREATE new Inventory Item 

router.post("/", (req, res) => {
  //   res.send("Hello this is a successful post request!");
  const warehouses = require("../data/warehouses.json");
  const inventories = require("../data/inventories.json");

  const {
    warehouseID,
    warehouseName,
    itemName,
    description,
    category,
    status,
    quantity,
  } = req.body;
  id = uuidv4();
  const findWarehouse = (warehouseToFind) => {
    const matchingWarehouse = warehouses.find(
      (warehouse) => warehouse.name === warehouseToFind
    );
    if (matchingWarehouse) {
      return matchingWarehouse.id;
    }
    console.log("no matching warehouse found");
    return "";
  };

  const newInventoryData = {
    id,
    warehouseID: findWarehouse(warehouseName),
    warehouseName,
    itemName,
    description,
    category,
    status,
    quantity,
  };
  inventories.push(newInventoryData);
  console.log(newInventoryData);

  const newInventoryJSON = JSON.stringify(inventories, null, 4);
  fs.writeFile("./data/inventories.json", newInventoryJSON, "utf8", (err) => {
    if (err) {
      res.status(500).send();
      console.log(err);
    }
  });
});

// PUT/PATCH/EDIt Inventory Item

router.put("/:id", (req, res) => {
  const inventories = require("../data/inventories.json");
  const id = req.params.id;
  // const data = JSON.parse(inventories);
  // console.log(id);
  // inventories[id]["warehouseName"] = req.body.warehouseName;
  // inventories[id]["itemName"] = req.body.itemName;
  // inventories[id]["description"] = req.body.description;
  const findInventoryID = (inventoryToFind) => {
    const matchingInventory = inventories.find(
      (inventory) => inventory.id === inventoryToFind
    );
    if (matchingInventory) {
      return matchingInventory.id;
    }
    console.log("no matching inventory found");
    return "";
  };
  console.log(inventory.id);

  fs.writeFileSync("./data/inventories.json", JSON.stringify(inventories));
  console.log(inventories);
});

module.exports = router;
