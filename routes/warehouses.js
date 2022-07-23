const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require('fs');
const warehouses = require('../data/warehouses.json')
const inventories = require('../data/inventories.json')
const { v4: uuidv4 } = require('uuid');
const { json } = require('express');

router.use(cors());
router.use(bodyParser.json());
router.use(express.json());

// Full details on all warehouses, array of objects

router.get('/', (req, res) => {
    console.log('get a list of warehouses')
    res.status(200).json(warehouses)
})

// POST/CREATE a New Warehouse

router.post('/', ((req, res) => {
    const newWarehouseInfo = {
        "id": uuidv4(),
        "name": req.body.name,
        "address": req.body.address,
        "city": req.body.city,
        "country": req.body.country,
        "contact": {
            "name": req.body.contact.name,
            "position": req.body.contact.position,
            "phone": req.body.contact.phone,
            "email": req.body.contact.email
        }
    }
    const newWarehouseDataSet = warehouses
    newWarehouseDataSet.push(newWarehouseInfo)

    fs.writeFile(__dirname + '/../data/warehouses.json', JSON.stringify(newWarehouseDataSet, null, 2), (err) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json("Warehouse Added")
        }
    })
}))

// PUT/PATCH/EDIT a Warehouse
router.put('/:warehouseId/edit',((req,res)=>{

        let { warehouseId } = req.params;
    
        const editWarehouse = {
            "id":warehouseId,
            "name": req.body.name,
            "address": req.body.address,
            "city": req.body.city,
            "country": req.body.country,
            "contact": {
                "name": req.body.contact.name,
                "position": req.body.contact.position,
                "phone": req.body.contact.phone,
                "email": req.body.contact.email
            }
        }
        const newWarehouseData = warehouses.map(warehouse => {
            if (warehouse.id === warehouseId){
                return warehouse = editWarehouse
            } else {
                return warehouse = warehouse
            }
        })
    
        const newInventoryData = inventories.map(inventory => {
            if (inventory.warehouseID === warehouseId){
                return {...inventory, warehouseName:req.body.name}
            } else {
                return inventory = inventory
            }
        })
    
        fs.writeFile(__dirname + '/../data/warehouses.json', JSON.stringify(newWarehouseData, null, 2), (err1)=> {
        fs.writeFile(__dirname + '/../data/inventories.json', JSON.stringify(newInventoryData, null, 2), (err2)=> {
                if(err1 || err2){
                    console.log(err1 || err2)
                } else {
                    res.status(200).json("Warehouse Update Received!")
                }
            })
        })
}))

router.delete('/:warehouseId/delete', (req, res) => {

    const { warehouseId } = req.params

    const requestWarehouse = warehouses.findIndex(warehouse => warehouse.id === warehouseId)

    const warehouse = warehouses[requestWarehouse];

    warehouses.splice(requestWarehouse, 1)

    const dataObject = JSON.stringify(warehouses, null, 2);
    fs.writeFile(__dirname + '/../data/warehouses.json', dataObject, (err) => {
        console.log(err)
    })
    res.status(200).json(warehouses)
})
    
module.exports = router;