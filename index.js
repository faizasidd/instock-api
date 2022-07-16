const express = require('express');
require('dotenv').config();
const cors = require('cors');
const warehousesRoute = require('./routes/warehouses.js');
// const inventoriesRoute = require('./routes/inventories.js');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  console.log('get a list of warehouses');
  res.status(200).json(warehousesRoute)
})

app.use('/warehouses', warehousesRoute);
// app.use('/inventories', inventoriesRoute);


app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});

