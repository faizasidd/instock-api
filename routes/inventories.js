const express = require("express");
const router = express.Router();
const { randomUUID } = require("crypto");
const fs = require("fs");
const path = require("path");

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
  const findWarehouse=(newInventoryDataParam)=>{
    Object.keys(newInventoryDataParam).find((element) => element.warehouseName);
  }
  console.log(findWarehouse.warehouseID);

  // console.log(inventories.find(element=>element=warehouseName))
  // const warehouseNameToID = ()=>{
  //   console.log("hello")
  //   console.log(Object.keys(req.body).find(element=>element.warehouseName="Miami"))

  //   // console.log(element)
  //   // return element

  // }

  // console.log(inventories)
  //   const warehouseNameToID = (warehouseNameParam) => {
  // inventories.find((element=>element=warehouseNameParam))
  // console.log(inventories)
  // if (warehouseNameParam === "Manhattan") {
  //   console.log("hello")
  //  return "12345";
  // }
  // console.log(warehouseID)
  // return warehouseID

  // };
  const newInventoryData = {
    id,
    warehouseID: findWarehouse.warehouseID,
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

module.exports = router;
