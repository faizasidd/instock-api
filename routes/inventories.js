const express = require("express");
const router = express.Router();
const { randomUUID } = require("crypto");
const fs = require("fs");
const path = require("path");

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
  id = randomUUID();
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
      console.log(err);
    }
  });
});

router.put("/:id", (req, res) => {
  const inventories = require("../data/inventories.json");
  const id = req.params.id;
  // const data = JSON.parse(inventories);
  console.log(id);
  inventories[id]["warehouseName"] = req.body.warehouseName;
  inventories[id]["itemName"] = req.body.itemName;
  inventories[id]["description"] = req.body.description;

  fs.writeFileSync("./data/inventories.json", JSON.stringify(inventories));
  console.log(inventories);
});

module.exports = router;
