const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

//loadInventory is required for pages to load non-static json data. 

function loadInventory() {
  const jsonString = fs.readFileSync("./data/inventories.json");
  return JSON.parse(jsonString);
}

function loadWarehouse() {
  const jsonString = fs.readFileSync("./data/warehouses.json");
  return JSON.parse(jsonString);
}

// GET full details on all inventories, array of objects
router.get('/', (req, res) => {
  const inventories = loadInventory();
  console.log('Here is a list of the inventory')
   
    const requestInventory = inventories.filter(
      (inventory) => inventory.warehouseId === req.params.warehouseId
    );
    res.status(200).json(requestInventory);
  });

// GET a Single Inventory Item
  const inventories = loadInventory();  
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

//DELETE inventory items 

router.delete('/:inventoryId', (req, res) => {
  const inventories = loadInventory();
    const { inventoryId } = req.params

    const requestInventory = inventories.findIndex(inventory => inventory.id === inventoryId)

    const inventory = inventories[requestInventory];

    inventories.splice(requestInventory, 1)

    const dataObjectAsString = JSON.stringify(inventories, null, 2);
    fs.writeFile(__dirname + '/../data/inventories.json', dataObjectAsString, (err) => {
      console.log(err)
    })
    res.status(200).json(inventory)
});



  // POST/CREATE new Inventory Item

  router.post("/", (req, res) => {
    //   res.send("Hello this is a successful post request!");
    const inventories = loadInventory();
    const warehouses = loadWarehouse();

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

  // PUT/PATCH/EDIT Inventory Item

  router.put("/:inventoryId", (req, res) => {
    const inventories = loadInventory();
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