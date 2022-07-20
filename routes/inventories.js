const express = require("express");
const router = express.Router();
const { randomUUID } = require("crypto");
const fs = require("fs");
const path = require("path");
let inventories = require("../data/inventories.json");

router.post("/", (req, res) => {
  //   res.send("Hello this is a successful post request!");
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

  console.log(req.body);
  const newInventoryData = {
    id,
    warehouseID: "", //this has to match the ID of warehouseName
    // tried using if statement(if (warehouseName==="Manhattan"){warehouseID==="something"})
    // but encountered reassignment issues
    warehouseName,
    itemName,
    description,
    category,
    status,
    quantity,
  };
  inventories.push(newInventoryData);

  const newInventoryJSON = JSON.stringify(inventories, null, 4);
  fs.writeFile("./data/inventories.json", newInventoryJSON, "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
});

module.exports = router;
