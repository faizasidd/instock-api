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
    const mappedWarehouses = warehouses.map(warehouse => {
        return { 
            ...warehouse, 
            contactName: warehouse.contact.name,
            contactPosition: warehouse.contact.position,
            contactPhone: warehouse.contact.phone,
            contactEmail: warehouse.contact.email
        }
    })

  
    res.status(200).json(mappedWarehouses)
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
            "name": req.body.contactName,
            "position": req.body.contactPosition,
            "phone": req.body.contactPhone,
            "email": req.body.contactEmail
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
                "name": req.body.contactName,
                "position": req.body.contactPosition,
                "phone": req.body.contactPhone,
                "email": req.body.contactEmail
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