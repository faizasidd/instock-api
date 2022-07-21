const express = require('express');
const router = express.Router();
const warehouses = require('../data/warehouses.json')
const inventories = require('../data/inventories.json')
const fs= require("fs");

//full details on all warehouses, array of objects
router.get('/', (req, res) => {
    console.log('get a list of warehouses')
    res.status(200).json(warehouses)
})

//editing warehouse details - including warehouse name in inventory
router.put('/warehouses/:warehouseId',((req,res)=>{

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

module.exports = router;
