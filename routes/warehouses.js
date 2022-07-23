const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const warehouses = require("../data/warehouses.json");
const inventories = require("../data/inventories.json");
const { v4: uuidv4 } = require("uuid");
const { json } = require("express");

router.use(cors());
router.use(bodyParser.json());
router.use(express.json());

// Full details on all warehouses, array of objects

router.get("/", (req, res) => {
  console.log("get a list of warehouses");
  const mappedWarehouses = warehouses.map((warehouse) => {
    return {
      ...warehouse,
      contactName: warehouse.contact.name,
      contactPosition: warehouse.contact.position,
      contactPhone: warehouse.contact.phone,
      contactEmail: warehouse.contact.email,
    };
  });

  res.status(200).json(mappedWarehouses);
});

// GET a Single Warehouse with its inventory

router.get("/:warehouseId", (req, res) => {
  const id = req.params.warehouseId;
  const selectedWarehouse = warehouses.find((warehouse) => warehouse.id === id);
  const selectedInventory = inventories.filter(
    (inventory) => inventory.warehouseID === id
  );

  if (selectedWarehouse && selectedInventory) {
    const joinedData = {
      warehouse: {
        ...selectedWarehouse,
        contactName: selectedWarehouse.contact.name,
        contactPosition: selectedWarehouse.contact.position,
        contactPhone: selectedWarehouse.contact.phone,
        contactEmail: selectedWarehouse.contact.email,
      },
      inventory: selectedInventory,
    };
    console.log(joinedData.warehouse);
    res.status(200).json(joinedData);
  } else {
    res.status(404).json(`Warehouse with id: ${id} does not exist`);
  }
});

// GET Inventories for a Given Warehouse

router.get("/:warehouseId/inventory", (req, res) => {
  let { warehouseId } = req.params;
  const data = inventories.filter(
    (inventory) => inventory.warehouseID === warehouseId
  );
  if (!data) {
    res.status(400).send(`There is no inventory under the ${warehouseId}`);
  }
  res.status(200).json(data);
});

// POST/CREATE a New Warehouse

router.post("/", (req, res) => {
  const newWarehouseInfo = {
    id: uuidv4(),
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    contact: {
      name: req.body.contactName,
      position: req.body.contactPosition,
      phone: req.body.contactPhone,
      email: req.body.contactEmail,
    },
  };
  const newWarehouseDataSet = warehouses;
  newWarehouseDataSet.push(newWarehouseInfo);

  fs.writeFile(
    __dirname + "/../data/warehouses.json",
    JSON.stringify(newWarehouseDataSet, null, 2),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json("Warehouse Added");
      }
    }
  );
});

// PUT/PATCH/EDIT a Warehouse

router.put("/:warehouseId/edit", (req, res) => {
  let { warehouseId } = req.params;

  const editWarehouse = {
    id: warehouseId,
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    contact: {
      name: req.body.contactName,
      position: req.body.contactPosition,
      phone: req.body.contactPhone,
      email: req.body.contactEmail,
    },
  };
  const newWarehouseData = warehouses.map((warehouse) => {
    if (warehouse.id === warehouseId) {
      return (warehouse = editWarehouse);
    } else {
      return (warehouse = warehouse);
    }
  });

  const newInventoryData = inventories.map((inventory) => {
    if (inventory.warehouseID === warehouseId) {
      return { ...inventory, warehouseName: req.body.name };
    } else {
      return (inventory = inventory);
    }
  });

  fs.writeFile(
    __dirname + "/../data/warehouses.json",
    JSON.stringify(newWarehouseData, null, 2),
    (err1) => {
      fs.writeFile(
        __dirname + "/../data/inventories.json",
        JSON.stringify(newInventoryData, null, 2),
        (err2) => {
          if (err1 || err2) {
            console.log(err1 || err2);
          } else {
            res.status(200).json("Warehouse Update Received!");
          }
        }
      );
    }
  );
});

// Delete Warehouse

router.delete("/:warehouseId/delete", (req, res) => {
  const { warehouseId } = req.params;

  const requestWarehouse = warehouses.findIndex(
    (warehouse) => warehouse.id === warehouseId
  );

  const warehouse = warehouses[requestWarehouse];

  warehouses.splice(requestWarehouse, 1);

  const dataObject = JSON.stringify(warehouses, null, 2);
  fs.writeFile(__dirname + "/../data/warehouses.json", dataObject, (err) => {
    console.log(err);
  });
  res.status(200).json(warehouses);
});

module.exports = router;
