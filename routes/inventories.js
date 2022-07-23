const express = require("express");
const router = express.Router();
let inventories = require("../data/inventories.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

//deleting inventory items
router.delete("/:inventoryId/delete", (req, res) => {
  const { inventoryId } = req.params;
// GET full details on all inventory, array of objects
router.get('/', (req, res) => {
  console.log('Here is a list of the inventory')

router.get('/', (req, res) => {
  console.log('get inventories')
  res.status(200).json(inventories)
})

//deleting inventory items 
router.delete('/:inventoryId/delete', (req, res) => {
    
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

  const requestInventory = inventories.findIndex(
    (inventory) => inventory.id === inventoryId
  );

  const inventory = inventories[requestInventory];

  inventories.splice(requestInventory, 1);

  const dataObject = JSON.stringify(inventories, null, 2);
  fs.writeFile(__dirname + "/../data/inventories.json", dataObject, (err) => {
    console.log(err);
  });
  res.status(200).json(inventory);
});

// GET a Single Inventory Item

router.get("/:inventoryId", (req, res) => {
  const id = req.params.inventoryId;
  const selectedInventory = inventories.filter(
    (inventory) => inventory.id === id
  );

  if (selectedInventory) {
    res.status(200).send(selectedInventory);
  } else {
    res.status(400).json(`Inventory with id: ${id} does not exist`);
  }
});

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

  const newInventoryJSON = JSON.stringify(inventories, null, 2);
  fs.writeFile("./data/inventories.json", newInventoryJSON, "utf8", (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send(200);
    }
  });
});

// PUT/PATCH/EDIt Inventory Item

router.put("/:inventoryId/edit", (req, res) => {
  const inventories = require("../data/inventories.json");
  const inventoryId = req.params.inventoryId;
  const matchingInventory = inventories.find(
    (inventory) => inventory.id === inventoryId
  );

  if (matchingInventory) {
    matchingInventory.warehouseName = req.body.warehouseName;
    matchingInventory.itemName = req.body.itemName;
    matchingInventory.description = req.body.description;
    matchingInventory.category = req.body.category;
    matchingInventory.status = req.body.status;
    matchingInventory.quantity = req.body.quantity;
  }

  fs.writeFile(
    "./data/inventories.json",
    JSON.stringify(inventories, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send(200);
      }
    }
  );
  console.log(inventories);
});

module.exports = router;
